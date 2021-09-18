<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Delete from '$lib/icons/delete.svelte';
	import DeleteContent from '$lib/modals/DeleteContent.svelte';
	import { page } from '$app/stores';
	import { getContext } from 'svelte';

	let refetchCategory: Function = getContext('refetchCategory');
	let isOpen = false;
	let isPending = false;
	let warning;

	export let template;

	async function handleSubmit() {
		isPending = true;
		fetch(`http://localhost:4000/documents/${$page.params.category}/templates/${template._id}`, {
			method: 'DELETE'
		})
			.then((res) => res.json())
			.then((data) => {
				isPending = false;
				if (data.warning) {
					warning = data.warning;
				}
				warning = null;
				handleCancel();
				refetchCategory();
			})
			.catch((err) => {
				warning = err;
			});
	}

	function handleCancel() {
		isOpen = false;
	}
</script>

<template>
	<Modal bind:isOpen>
		<!--Button-->
		<button class="delete" slot="trigger" let:open on:click={open}>
			<Icon src={Delete} />
		</button>

		<!--Header-->
		<span class="header" slot="header"> Eliminar documento </span>

		<!--Content-->
		<form on:submit|preventDefault={handleSubmit} slot="content">
			<DeleteContent bind:warning prop={'este documento'} />
			<div>
				<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
				<button class="submit" type="submit">
					{#if isPending}
						Loading...
					{:else}
						Eliminar
					{/if}
				</button>
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
			cursor: pointer;
			display: flex;
			align-items: center;
			background-color: var(--input-color);

			border: 2px solid var(--border-color);
			border-left: none;

			&:hover {
				background-color: var(--area-color);
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
