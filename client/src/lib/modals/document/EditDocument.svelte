<script>
	import Modal from '$lib/components/Modal.svelte';
	import Pencil from '$lib/icons/pencil.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { getContext } from 'svelte';
	import DocumentContent from './DocumentContent.svelte';
	import { page } from '$app/stores';
	import ErrorToast from '$lib/components/ErrorToast.svelte';
	import Loading from '$lib/components/Loading.svelte';

	const refetchCandidate = getContext('refetchCandidate');
	const refetchDocuments = getContext('refetchDocuments');

	let isOpen = false;
	let isPending = false;
	let error = null;

	export let document;
	let editableDocument = { ...document };

	$: disableSubmit = Object.keys(document).every(
		(key) => editableDocument.hasOwnProperty(key) && editableDocument[key] === document[key]
	);

	function handleSubmit() {
		isPending = true;
		const formData = new FormData();
		formData.append('comment', editableDocument.comment);
		formData.append('status', editableDocument.status);
		fetch(
			`http://localhost:4000/candidates/${$page.params.candidate}/documents/${document._id}/update`,
			{
				method: 'PUT',
				body: formData
			}
		)
			.then((res) => res.json())
			.then((data) => {
				error = null;
				isPending = false;
				isOpen = false;
				refetchCandidate();
				refetchDocuments();
			})
			.catch((err) => {
				error = err.message;
				isPending = false;
			});
	}

	function handleCancel() {
		editableDocument = { ...document };
		error = null;
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<button class="edit" slot="trigger" let:open on:click={open}>
		<Icon src={Pencil} />
	</button>

	<!--Header-->
	<span slot="header"> Editar documento </span>

	<!--Content-->
	<form on:submit|preventDefault={handleSubmit} slot="content">
		<DocumentContent bind:document={editableDocument} />
		{#if error}
			<ErrorToast bind:error />
		{/if}
		<div>
			<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
			<button disabled={disableSubmit} class="submit" type="submit">
				{#if isPending}
					<Loading />
				{:else}
					Editar
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
	button.edit {
		cursor: pointer;
		display: flex;
		align-items: center;
		background-color: var(--input-color);
	}
	button.edit:hover {
		background-color: var(--area-color);
	}

	button:disabled {
		background: red;
	}

	button.submit {
		width: 100%;

		background-color: var(--blue-color);
		border: 2px solid var(--blue-color);
		cursor: pointer;
	}
	button.submit:hover {
		background: var(--blue-color);
	}

	button.submit:active {
		background-color: var(--blue-color);
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
