<script>
	import Modal from '$lib/components/Modal.svelte';
	import Plus from '$lib/icons/plus.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import TemplateContent from './TemplateContent.svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	import { page } from '$app/stores';
	import { userStore } from '$lib/stores';
	import ErrorToast from '$lib/components/ErrorToast.svelte';
	import { fade, slide } from 'svelte/transition';
	import Loading from '$lib/components/Loading.svelte';
	import { requester } from '$lib/fetcher';
	import { convertDataToFile } from '$lib/utils';

	const dispatch = createEventDispatcher();
	const [request, loading, err] = requester();
	let isOpen = false;
	let template = {
		name: '',
		description: '',
		example: null
	};

	function handleSubmit() {
		$loading = true;
		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(template).forEach((key) => formData.append(key, template[key]));

		request(
			{
				url: `http://localhost:4000/documents/${$page.params.category}/templates`,
				method: 'post',
				data: formData
			},
			{
				finalize: (fetchedData) => {
					fetchedData.data.example = convertDataToFile(
						fetchedData.data.example,
						fetchedData.data._id
					);
					handleCancel();
					dispatch('request', fetchedData.data);
				}
			}
		);
	}

	function handleCancel() {
		template = {
			name: '',
			description: '',
			example: null
		};
		$err = null;
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<button
		in:fade={{ duration: 200 }}
		out:slide|local={{ duration: 200 }}
		class="create"
		slot="trigger"
		let:open
		on:click={open}
	>
		<div><Icon src={Plus} /></div>
		<span>Crear documento</span>
	</button>

	<!--Header-->
	<span slot="header"> Crear documento </span>

	<!--Content-->
	<form on:submit|preventDefault={handleSubmit} slot="content">
		<TemplateContent bind:template />
		{#if $err}
			<ErrorToast bind:error={$err} />
		{/if}
		<div>
			<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
			<button class="submit" type="submit">
				{#if $loading}
					<Loading />
				{:else}
					Crear
				{/if}
			</button>
		</div>
	</form>
</Modal>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	div {
		display: flex;
		gap: 1rem;
	}

	button {
		padding: 1rem;
	}
	button.create {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		width: 100%;

		background-color: var(--input-color);
		border: 2px solid var(--border-color);
	}
	button.create:hover {
		background-color: var(--area-color);
		border: 2px solid var(--blue-color);
	}
	button.create:focus {
		border: 2px solid var(--green-color);
	}
	button.create:active {
		border: 2px solid var(--blue-color);
	}

	button.submit {
		width: 100%;

		background-color: var(--darker-green-color);
		border: 2px solid var(--green-color);
		cursor: pointer;
	}
	button.submit:hover {
		background: var(--green-color);
	}

	button.submit:active {
		background-color: var(--darker-green-color);
	}

	button.cancel {
		width: 100%;

		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		cursor: pointer;
	}
	button.cancel:hover {
		background: var(--area-color);
	}

	button.cancel:active {
		background-color: var(--input-color);
	}
</style>
