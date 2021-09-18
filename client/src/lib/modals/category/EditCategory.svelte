<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Pencil from '$lib/icons/pencil.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import CategoryContent from '$lib/modals/category/CategoryContent.svelte';
	import { getContext, onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/stores';

	let refetchCategories: Function = getContext('refetchCategories');
	let isOpen = false;
	let isPending = false;
	let warning;

	export let category;
	let editableCategory = { ...category };

	function handleSubmit() {
		isPending = true;
		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(editableCategory).forEach((key) => formData.append(key, editableCategory[key]));
		fetch(`http://localhost:4000/documents/${$page.params.category}`, {
			method: 'PUT',
			body: formData
		})
			.then((res) => res.json())
			.then((data) => {
				isPending = false;
				if (data.warning) {
					warning = data.warning;
					return;
				}
				warning = null;
				handleCancel();
				refetchCategories();
				goto(`/documents/${data.name}`);
			})
			.catch((err) => {
				isPending = false;
				warning = err;
			});
	}

	function handleCancel() {
		editableCategory = { ...category };
		isOpen = false;
	}
</script>

<template>
	<Modal bind:isOpen>
		<button class="edit" slot="trigger" let:open on:click={open}>
			<Icon src={Pencil} />
		</button>

		<!--Header-->
		<span slot="header"> Editar categoria </span>

		<!--Content-->
		<form on:submit|preventDefault={handleSubmit} slot="content">
			<CategoryContent bind:warning bind:category={editableCategory} />
			<div>
				<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
				<button class="submit" type="submit">
					{#if isPending}
						Loading...
					{:else}
						Editar
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

		&.edit {
			cursor: pointer;
			display: flex;
			align-items: center;
			background-color: var(--input-color);

			&:hover {
				background-color: var(--area-color);
			}
		}

		&.submit {
			width: 100%;
			background-color: var(--blue-color);
			border: 2px solid var(--blue-color);
			cursor: pointer;

			&:hover {
				background: var(--blue-color);
			}

			&:active {
				background-color: var(--blue-color);
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
