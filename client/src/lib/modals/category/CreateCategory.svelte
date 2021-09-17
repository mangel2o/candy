<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Plus from '$lib/icons/plus.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import CategoryContent from '$lib/modals/category/CategoryContent.svelte';
	import { getContext } from 'svelte';
	import { userStore } from '$lib/stores';
	import { goto } from '$app/navigation';

	let refetchCategories: Function = getContext('refetchCategories');
	let isOpen = false;
	let isPending = false;
	let warningCategory;

	let category = {
		name: '',
		description: ''
	};

	function handleSubmit() {
		isPending = true;
		const formData = new FormData();
		Object.keys(category).forEach((key) => formData.append(key, category[key]));
		formData.append('authorId', $userStore._id);
		fetch('http://localhost:4000/documents', {
			method: 'POST',
			body: formData
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.warningCategory) {
					warningCategory = data.warningCategory;
					isPending = false;
					return;
				}
				warningCategory = null;
				isPending = false;
				handleCancel();
				refetchCategories();
				goto(`/documents/${data.name}`);
			})
			.catch((err) => {
				console.log(err);
				isPending = false;
			});
	}

	function handleCancel() {
		category = {
			name: '',
			description: ''
		};

		isOpen = false;
	}
</script>

<template>
	<Modal bind:isOpen>
		<button class="create" slot="trigger" let:open on:click={open}>
			<Icon src={Plus} />
			<span>Crear categoria</span>
		</button>

		<!--Header-->
		<span slot="header"> Crear categoria </span>

		<!--Content-->
		<form on:submit|preventDefault={handleSubmit} slot="content">
			<CategoryContent bind:warningCategory bind:category />
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
		&.create {
			width: 100%;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 6px;
			padding: 1rem;
			background-color: var(--input-color);
			border: 2px solid var(--border-color);
			&:hover {
				background-color: var(--area-color);
				border: 2px solid var(--blue-color);
			}
			&:focus {
				border: 2px solid var(--green-color);
			}
			&:active {
				border: 2px solid var(--blue-color);
			}
		}

		&.submit {
			width: 100%;
			padding: 1rem;
			background-color: var(--darker-green-color);
			border: 2px solid var(--green-color);
			cursor: pointer;

			&:hover {
				background: var(--green-color);
			}

			&:active {
				background-color: var(--darker-green-color);
			}
		}

		&.cancel {
			width: 100%;
			padding: 1rem;
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
