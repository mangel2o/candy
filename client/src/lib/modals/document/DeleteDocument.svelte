<script>
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Delete from '$lib/icons/delete.svelte';
	import DeleteContent from '$lib/modals/DeleteContent.svelte';
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import ErrorToast from '$lib/components/ErrorToast.svelte';
	import Loading from '$lib/components/Loading.svelte';

	let refetchDocuments = getContext('refetchDocuments');
	let isOpen = false;
	let isPending = false;
	let error;

	export let document;

	function handleSubmit() {
		isPending = true;
		fetch(`http://localhost:4000/students/${$page.params.students}/documents/${document._id}`, {
			method: 'DELETE'
		})
			.then((res) => res.json())
			.then((data) => {
				error = null;
				isPending = false;
				handleCancel();
				refetchDocuments();
			})
			.catch((err) => {
				error = err.message;
				isPending = false;
			});
	}

	function handleCancel() {
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<!--Button-->
	<button class="delete" slot="trigger" let:open on:click={open}>
		<Icon src={Delete} />
	</button>

	<!--Header-->
	<span class="header" slot="header"> Eliminar documento </span>

	<!--Content-->
	<form on:submit|preventDefault={handleSubmit} slot="content">
		<DeleteContent>
			<span class="delete">¿Deseas eliminar este documento?</span>
			<span class="delete"> Esta acción es irreversible</span>
		</DeleteContent>
		{#if error}
			<ErrorToast bind:error />
		{/if}
		<div>
			<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
			<button class="submit" type="submit">
				{#if isPending}
					<Loading />
				{:else}
					Eliminar
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
	button.delete {
		cursor: pointer;
		display: flex;
		align-items: center;
		background-color: var(--input-color);
	}
	button.delete:hover {
		background-color: var(--area-color);
	}

	button.submit {
		width: 100%;
		background-color: var(--red-color);
		border: 2px solid var(--red-color);
		cursor: pointer;
	}
	button.submit:hover {
		background: var(--red-color);
	}

	button.submit:active {
		background-color: var(--red-color);
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
