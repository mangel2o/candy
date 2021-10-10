<script>
	import Modal from '$lib/components/Modal.svelte';
	import Plus from '$lib/icons/plus.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import TemplateContent from './TemplateContent.svelte';
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { userStore } from '$lib/stores';
	import ErrorToast from '$lib/components/ErrorToast.svelte';
	import { fade } from 'svelte/transition';

	const refetchCategory = getContext('refetchCategory');
	let isOpen = false;
	let isPending = false;
	let error = null;
	let template = {
		name: '',
		description: '',
		example: null
	};

	function handleSubmit() {
		isPending = true;
		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(template).forEach((key) => formData.append(key, template[key]));
		fetch(`http://localhost:4000/documents/${$page.params.category}/templates`, {
			method: 'POST',
			body: formData
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error('Parece que algo salio mal');
				}
			})
			.then((data) => {
				if (data.error) {
					error = data.error;
					isPending = false;
					return;
				}
				error = null;
				isPending = false;
				handleCancel();
				refetchCategory();
			})
			.catch((err) => {
				error = err.message;
				isPending = false;
			});
	}

	function handleCancel() {
		template = {
			name: '',
			description: '',
			example: null
		};
		error = null;
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<button
		transition:fade|local={{ duration: 200 }}
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
		{#if error}
			<ErrorToast bind:error />
		{/if}
		<div>
			<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
			<button class="submit" type="submit">
				{#if isPending}
					Loading...
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
