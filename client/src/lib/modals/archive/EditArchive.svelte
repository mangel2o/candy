<script>
	import Modal from '$lib/components/Modal.svelte';
	import Pencil from '$lib/icons/pencil.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { createEventDispatcher } from 'svelte';
	import ArchiveContent from './ArchiveContent.svelte';
	import { page } from '$app/stores';
	import { userStore } from '$lib/stores';
	import ErrorToast from '$lib/components/ErrorToast.svelte';
	import { requester } from '$lib/fetcher';
	import { convertDataToFile } from '$lib/utils';

	const dispatch = createEventDispatcher();
	const [request, loading, err] = requester();
	let isOpen = false;
	export let archive;
	let editableArchive = { ...archive };

	$: disableSubmit = Object.keys(archive).every(
		(key) => editableArchive.hasOwnProperty(key) && editableArchive[key] === archive[key]
	);

	function handleSubmit() {
		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(editableArchive).forEach((key) => formData.append(key, editableArchive[key]));

		// If the example file hasn't change, remove it
		if (editableArchive.file === archive.file) {
			formData.delete('file');
		}
		request(
			{
				url: `http://localhost:4000/students/${$page.params.student}/archives/${archive._id}`,
				method: 'put',
				data: formData
			},
			{
				finalize: (archive) => {
					archive.data.file = convertDataToFile(archive.data.file, archive.data._id);
					editableArchive = { ...archive.data };
					$err = null;
					isOpen = false;
					dispatch('request', archive.data);
				}
			}
		);
	}

	function handleCancel() {
		editableArchive = { ...archive };
		$err = null;
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<button class="edit" slot="trigger" let:open on:click={open}>
		<Icon src={Pencil} />
	</button>

	<!--Header-->
	<span slot="header"> Editar archivo </span>

	<!--Content-->
	<form on:submit|preventDefault={handleSubmit} slot="content">
		<ArchiveContent bind:archive={editableArchive} />
		{#if $err}
			<ErrorToast bind:error={$err} />
		{/if}
		<div>
			<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
			<button disabled={disableSubmit} class="submit" type="submit">
				{#if $loading}
					Loading...
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
