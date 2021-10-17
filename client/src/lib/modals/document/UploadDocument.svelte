<script>
	import Modal from '$lib/components/Modal.svelte';
	import Upload from '$lib/icons/upload.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import FileDocument from '$lib/icons/file-document.svelte';
	import ErrorToast from '$lib/components/ErrorToast.svelte';
	import Loading from '$lib/components/Loading.svelte';

	const refetchCandidate = getContext('refetchCandidate');
	const refetchDocuments = getContext('refetchDocuments');
	let isOpen = false;
	let isPending = false;

	export let document;
	let files;
	let error = null;

	function handleSubmit() {
		isPending = true;
		const formData = new FormData();
		formData.append('file', files[0]);
		fetch(
			`http://localhost:4000/students/${$page.params.student}/documents/${document._id}/upload`,
			{
				method: 'PUT',
				body: formData
			}
		)
			.then((res) => res.json())
			.then((data) => {
				error = null;
				isPending = false;
				handleCancel();
				refetchCandidate();
				refetchDocuments();
			})
			.catch((err) => {
				error = err.message;
				isPending = false;
			});
	}

	function handleCancel() {
		files = null;
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<button class="edit" slot="trigger" let:open on:click={open}>
		<Icon src={Upload} />
	</button>

	<!--Header-->
	<span slot="header"> Subir documento </span>

	<!--Content-->
	<form on:submit|preventDefault={handleSubmit} slot="content">
		<label class={files ? 'uploaded' : 'not-uploaded'}>
			<input required type="file" bind:files accept=".pdf" />
			<Icon src={FileDocument} size={'80'} />
			{#if !files}
				<span class="upper-text">Busca un archivo PDF</span>
				<span class="lower-text">o arrastralo aqui</span>
			{:else}
				<span class="upper-text">Archivo seleccionado</span>
				{#each files as file}
					<span class="lower-text">{file.name}</span>
				{/each}
			{/if}
		</label>
		{#if error}
			<ErrorToast bind:error />
		{/if}
		<div>
			<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
			<button disabled={!files} class="submit" type="submit">
				{#if isPending}
					<Loading />
				{:else}
					Subir
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

	label {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		width: 500px;
		height: 250px;
		gap: 0.5rem;

		background-color: var(--input-color);
		border: 2px solid var(--border-color);
	}
	label:hover {
		border: 2px solid var(--blue-color);
		color: var(--placeholder-color);
	}

	label.uploaded {
		border: 2px solid var(--green-color);
	}

	label.not-uploaded {
		border: 2px solid var(--red-color);
	}

	span.upper-text {
		font-size: 20px;
		font-weight: bold;
	}

	span.lower-text {
		font-size: 18px;
	}

	input {
		display: none;
	}
</style>
