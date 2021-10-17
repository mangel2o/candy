<script>
	import Modal from '$lib/components/Modal.svelte';
	import Plus from '$lib/icons/plus.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { getContext } from 'svelte';
	import ArchiveContent from '$lib/modals/archive/ArchiveContent.svelte';
	import { page } from '$app/stores';
	import { userStore } from '$lib/stores';
	import ErrorToast from '$lib/components/ErrorToast.svelte';

	const refetchArchives = getContext('refetchArchives');
	let isOpen = false;
	let isPending = false;
	let error = null;
	let archive = {
		name: '',
		description: '',
		file: null
	};

	function handleSubmit() {
		isPending = true;
		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(archive).forEach((key) => formData.append(key, archive[key]));
		fetch(`http://localhost:4000/students/${$page.params.student}/archives`, {
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
				refetchArchives();
			})
			.catch((err) => {
				error = err.message;
				isPending = false;
			});
	}

	function handleCancel() {
		archive = {
			name: '',
			description: '',
			file: null
		};
		error = null;
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<button class="create" slot="trigger" let:open on:click={open}>
		<Icon src={Plus} />
		<span>Crear archivo</span>
	</button>
	<!--Header-->
	<span slot="header"> Crear archivo </span>
	<!--Content-->
	<form on:submit|preventDefault={handleSubmit} slot="content">
		<ArchiveContent bind:archive />
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
