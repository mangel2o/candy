<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Delete from '$lib/icons/delete.svelte';
	import DeleteContent from '$lib/modals/DeleteContent.svelte';
	import { getContext } from 'svelte';

	const refetch: Function = getContext('refetch');
	export let candidate;

	async function handleSubmit() {
		console.log(candidate);
		handleCancel();
		refetch();
	}

	function handleCancel() {
		console.log('Delete candidate canceled');
	}
</script>

<template>
	<Modal>
		<!--Button-->
		<button class="delete" slot="trigger" let:open on:click={open}>
			<Icon src={Delete} />
		</button>

		<!--Header-->
		<span class="header" slot="header"> Eliminar candidato </span>

		<!--Content-->
		<form on:submit|preventDefault={handleSubmit} slot="content">
			<DeleteContent prop={'este candidato'} />
			<div>
				<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
				<button class="submit" type="submit"> Eliminar </button>
			</div>
		</form>
	</Modal>
</template>

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

		&.delete {
			padding: 0.5rem;
			cursor: pointer;
			display: flex;
			align-items: center;
			background-color: var(--input-color);
			border: 2px solid var(--border-color);

			&:hover {
				background-color: var(--area-color);
			}

			&:focus {
				border: 2px solid var(--green-color);
			}
		}

		&.submit {
			width: 100%;
			background-color: var(--red-color);
			border: 2px solid var(--red-color);
			cursor: pointer;

			&:hover {
				background: var(--red-color);
			}

			&:active {
				background-color: var(--red-color);
			}
		}

		&.cancel {
			width: 100%;
			background-color: var(--input-color);
			border: 2px solid var(--border-color);
			cursor: pointer;

			&:hover {
				background: var(--area-color);
			}

			&:active {
				background-color: var(--input-color);
			}
		}
	}
</style>
