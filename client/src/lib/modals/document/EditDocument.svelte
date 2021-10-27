<script>
	import Modal from '$lib/components/Modal.svelte';
	import Pencil from '$lib/icons/pencil.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import DocumentContent from './DocumentContent.svelte';
	import { page } from '$app/stores';
	import ErrorToast from '$lib/components/ErrorToast.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { createEventDispatcher } from 'svelte';
	import { requester } from '$lib/fetcher';
	import { convertDataToFile } from '$lib/utils';

	const dispatch = createEventDispatcher();
	const [request, loading, err] = requester();
	let isOpen = false;
	export let document;
	let editableDocument = { ...document };

	$: disableSubmit = Object.keys(document).every(
		(key) => editableDocument.hasOwnProperty(key) && editableDocument[key] === document[key]
	);

	function handleSubmit() {
		const formData = new FormData();
		formData.append('comment', editableDocument.comment);
		formData.append('status', editableDocument.status);

		request(
			{
				url: `http://localhost:4000/students/${$page.params.student}/documents/${document._id}/update`,
				method: 'put',
				data: formData
			},
			{
				finalize: (doc) => {
					doc.data.example = convertDataToFile(doc.data.example, doc.data._id);
					if (doc.data.file) {
						doc.data.file = convertDataToFile(doc.data.file, doc.data._id);
					}
					handleCancel();
					editableDocument = { ...doc.data };
					dispatch('request', doc.data);
				}
			}
		);
	}

	function handleCancel() {
		editableDocument = { ...document };
		$err = null;
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
		{#if $err}
			<ErrorToast bind:error={$err} />
		{/if}
		<div>
			<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
			<button disabled={disableSubmit} class="submit" type="submit">
				{#if $loading}
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
