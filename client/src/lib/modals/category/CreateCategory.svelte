<script>
	import Modal from '$lib/components/Modal.svelte';
	import Plus from '$lib/icons/plus.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import CategoryContent from '$lib/modals/category/CategoryContent.svelte';
	import { createEventDispatcher, getContext } from 'svelte';
	import { userStore } from '$lib/stores';
	import { goto } from '$app/navigation';
	import ErrorToast from '$lib/components/ErrorToast.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { requester } from '$lib/fetcher';

	const dispatch = createEventDispatcher();
	const [request, loading, err] = requester();
	let isOpen = false;
	let category = {
		name: '',
		description: ''
	};

	function handleSubmit() {
		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(category).forEach((key) => formData.append(key, category[key]));

		request(
			{
				url: 'http://localhost:4000/documents',
				method: 'post',
				data: formData
			},
			{
				finalize: (fetchedData) => {
					handleCancel();
					dispatch('request', fetchedData.data);
				}
			}
		);
	}

	function handleCancel() {
		category = {
			name: '',
			description: ''
		};
		$err = null;
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<button class="create" slot="trigger" let:open on:click={open}>
		<div><Icon src={Plus} /></div>
		<span>Crear categoria</span>
	</button>

	<!--Header-->
	<span slot="header"> Crear categoria </span>

	<!--Content-->
	<form on:submit|preventDefault={handleSubmit} slot="content">
		<CategoryContent bind:category />
		{#if $err}
			<ErrorToast bind:error={$err} />
		{/if}
		<div>
			<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
			<button class="submit" type="submit">
				{#if $loading}
					<Loading />
					{$loading}
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

	button.create {
		width: 100%;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 1rem;
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
		padding: 1rem;
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
		padding: 1rem;
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
