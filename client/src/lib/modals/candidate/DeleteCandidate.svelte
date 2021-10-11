<script>
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Delete from '$lib/icons/delete.svelte';
	import DeleteContent from '$lib/modals/DeleteContent.svelte';
	import { page } from '$app/stores';
	import ErrorToast from '$lib/components/ErrorToast.svelte';
	import { goto } from '$app/navigation';
	import Loading from '$lib/components/Loading.svelte';

	let isOpen = false;
	let isPending = false;
	let error;

	function handleSubmit() {
		fetch(`http://localhost:4000/candidates/${$page.params.candidate}`, {
			method: 'DELETE'
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
				isOpen = false;
				goto('/candidates');
			})
			.catch((err) => {
				error = err.message;
				isPending = false;
			});
	}

	function handleCancel() {
		error = null;
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<!--Button-->
	<button class="delete" slot="trigger" let:open on:click={open}>
		<Icon src={Delete} />
	</button>

	<!--Header-->
	<span class="header" slot="header"> Eliminar candidato </span>

	<!--Content-->
	<form on:submit|preventDefault={handleSubmit} slot="content">
		<DeleteContent>
			<span class="delete">¿Deseas eliminar este candidato?</span>
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
		padding: 0.5rem;
		cursor: pointer;
		display: flex;
		align-items: center;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
	}
	button.delete:hover {
		background-color: var(--area-color);
	}

	button.delete:focus {
		border: 2px solid var(--green-color);
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
