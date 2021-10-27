<script>
	import Modal from '$lib/components/Modal.svelte';
	import Pencil from '$lib/icons/pencil.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import StudentContent from './StudentContent.svelte';
	import { getContext } from 'svelte';
	import { userStore } from '$lib/stores';
	import { page } from '$app/stores';
	import ErrorToast from '$lib/components/ErrorToast.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import { requester } from '$lib/fetcher';

	const refetchStudent = getContext('refetchStudent');
	const refetchDocumentsPage = getContext('refetchDocumentsPage');
	const [request, loading, err] = requester();
	let isOpen = false;
	export let student;
	export let categories = [];
	let editableStudent = { ...student, newCategories: [] };

	let disableSubmit;
	$: if (editableStudent.newCategories.length > 0) {
		disableSubmit = false;
	} else {
		disableSubmit = Object.keys(student).every(
			(key) => editableStudent.hasOwnProperty(key) && editableStudent[key] === student[key]
		);
	}

	function handleSubmit() {
		// * Return if any of the categories selected have empty templates
		for (const selectedCategory of editableStudent.newCategories) {
			const categorySelected = categories.find((category) => category._id === selectedCategory);
			if (categorySelected && categorySelected.templates < 1) {
				$err = 'Al menos una de las categorias seleccionadas no tiene documentos.';
				return;
			}
		}

		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(editableStudent).forEach((key) => formData.append(key, editableStudent[key]));
		request(
			{
				url: `http://localhost:4000/students/${$page.params.student}`,
				method: 'put',
				data: formData
			},
			{
				finalize: (student) => {
					refetchStudent(false);
					if (editableStudent.newCategories.length > 0) {
						$refetchDocumentsPage();
					}
					editableStudent = { ...student.data, newCategories: [] };
					isOpen = false;
				}
			}
		);
	}

	function handleCancel() {
		editableStudent = { ...student, newCategories: [] };
		$err = null;
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<button class="edit" slot="trigger" let:open on:click={open}>
		<Icon src={Pencil} />
	</button>

	<!--Header-->
	<span slot="header"> Editar alumno </span>

	<!--Content-->
	<form on:submit|preventDefault={handleSubmit} slot="content">
		<StudentContent bind:categories bind:student={editableStudent} />
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
