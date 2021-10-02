<script>
	import Modal from '$lib/components/Modal.svelte';
	import Pencil from '$lib/icons/pencil.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import CandidateContent from './CandidateContent.svelte';
	import { getContext } from 'svelte';
	import { userStore } from '$lib/stores';
	import { page } from '$app/stores';
	import ErrorToast from '$lib/components/ErrorToast.svelte';

	const refetchCandidate = getContext('refetchCandidate');
	let isPending = false;
	let isOpen = false;
	let error = null;

	export let candidate;
	export let categories = [];
	let editableCandidate = { ...candidate, newCategories: [] };
	let availableCategories = categories.filter(
		(category) => !candidate.categories.find(({ _id }) => category._id === _id)
	);

	let disableSubmit;
	$: if (editableCandidate.newCategories.length > 0) {
		disableSubmit = false;
	} else {
		disableSubmit = Object.keys(candidate).every(
			(key) => editableCandidate.hasOwnProperty(key) && editableCandidate[key] === candidate[key]
		);
	}

	function handleSubmit() {
		// * Return if any of the categories selected have empty templates
		for (const selectedCategory of editableCandidate.newCategories) {
			const categorySelected = categories.find((category) => category._id === selectedCategory);
			if (categorySelected && categorySelected.templates < 1) {
				error = 'Al menos una de las categorias seleccionadas no tiene documentos.';
				return;
			}
		}

		isPending = true;
		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(editableCandidate).forEach((key) => formData.append(key, editableCandidate[key]));
		fetch(`http://localhost:4000/candidates/${$page.params.candidate}`, {
			method: 'PUT',
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
				refetchCandidate();
			})
			.catch((err) => {
				error = err;
				isPending = false;
			});
	}

	function handleCancel() {
		editableCandidate = { ...candidate, newCategories: [] };
		error = null;
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<button class="edit" slot="trigger" let:open on:click={open}>
		<Icon src={Pencil} />
	</button>

	<!--Header-->
	<span slot="header"> Editar candidato </span>

	<!--Content-->
	<form on:submit|preventDefault={handleSubmit} slot="content">
		<CandidateContent bind:categories={availableCategories} bind:candidate={editableCandidate} />
		{#if error}
			<ErrorToast bind:error />
		{/if}

		<div>
			<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
			<button disabled={disableSubmit} class="submit" type="submit">
				{#if isPending}
					Loading...
				{:else}
					Editar
				{/if}
			</button>
		</div>
	</form>
</Modal>

<style lang="scss">
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
		padding: 0.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
	}
	button.edit:hover {
		background-color: var(--area-color);
	}

	button.edit:focus {
		border: 2px solid var(--green-color);
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
