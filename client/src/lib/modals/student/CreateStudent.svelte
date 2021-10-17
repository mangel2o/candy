<script>
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import AccountPlus from '$lib/icons/account-plus.svelte';
	import StudentContent from './StudentContent.svelte';
	import { getContext } from 'svelte';
	import { userStore } from '$lib/stores';
	import WarningToast from '$lib/components/WarningToast.svelte';
	import ErrorToast from '$lib/components/ErrorToast.svelte';
	import Loading from '$lib/components/Loading.svelte';

	const refetchStudents = getContext('refetchStudents');
	export let categories = [];
	let isPending = false;
	let isOpen = false;
	let error = null;
	let student = {
		name: '',
		number: '',
		level: '',
		campus: '',
		genre: '',
		active: '',
		career: '',
		phone: '',
		personalEmail: '',
		modality: '',
		terminationPeriod: '',
		terminationYear: '',
		graduationPeriod: '',
		graduationYear: '',
		categories: []
	};

	function handleSubmit() {
		// * Return if any of the categories selected don't have templates
		for (const selectedCategory of student.categories) {
			const categorySelected = categories.find((category) => category._id === selectedCategory);
			if (categorySelected && categorySelected.templates < 1) {
				error = 'Al menos una de las categorias seleccionadas no tiene documentos.';
				return;
			}
		}

		isPending = true;
		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(student).forEach((key) => formData.append(key, student[key]));
		fetch('http://localhost:4000/students', {
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
				refetchStudents();
			})
			.catch((err) => {
				error = err.message;
				isPending = false;
			});
	}

	function handleCancel() {
		student = {
			name: '',
			number: '',
			level: '',
			campus: '',
			genre: '',
			active: '',
			career: '',
			phone: '',
			personalEmail: '',
			modality: '',
			terminationPeriod: '',
			terminationYear: '',
			graduationPeriod: '',
			graduationYear: '',
			categories: []
		};
		error = null;
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<button class="create" slot="trigger" let:open on:click={open}>
		<div><Icon src={AccountPlus} /></div>
		<span>Alumno</span>
	</button>

	<!--Header-->
	<span slot="header"> Crear alumno </span>

	<!--Content-->
	<form on:submit|preventDefault={handleSubmit} slot="content">
		<StudentContent bind:categories bind:student />
		{#if error}
			<ErrorToast bind:error />
		{/if}
		<!--
		{#if categories.length < 1}
			<WarningToast>Parece que no hay categorias, crea una antes de crear alumnos.</WarningToast>
		{/if}
		-->

		<div>
			<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
			<button disabled={categories.length < 1} class="submit" type="submit">
				{#if isPending}
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
