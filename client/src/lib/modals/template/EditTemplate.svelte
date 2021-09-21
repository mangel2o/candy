<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Pencil from '$lib/icons/pencil.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { getContext } from 'svelte';
	import TemplateContent from './TemplateContent.svelte';
	import { page } from '$app/stores';
	import { userStore } from '$lib/stores';

	let refetchCategory: Function = getContext('refetchCategory');
	let isOpen = false;
	let isPending = false;
	let warning;

	export let template;
	let editableTemplate = {
		name: template.name,
		description: template.description,
		example: template.example
	};

	function handleSubmit() {
		isPending = true;
		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(editableTemplate).forEach((key) => formData.append(key, editableTemplate[key]));
		fetch(`http://localhost:4000/documents/${$page.params.category}/templates/${template._id}`, {
			method: 'PUT',
			body: formData
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.warning) {
					warning = data.warning;
					isPending = false;
					return;
				}
				warning = null;
				isPending = false;
				isOpen = false;
				refetchCategory();
			})
			.catch((err) => {
				warning = err;
				isPending = false;
			});
	}

	function handleCancel() {
		editableTemplate = {
			name: template.name,
			description: template.description,
			example: template.example
		};
		isOpen = false;
	}
</script>

<template>
	<Modal bind:isOpen>
		<button class="edit" slot="trigger" let:open on:click={open}>
			<Icon src={Pencil} />
		</button>

		<!--Header-->
		<span slot="header"> Editar documento </span>

		<!--Content-->
		<form on:submit|preventDefault={handleSubmit} slot="content">
			<TemplateContent bind:warning bind:template={editableTemplate} />
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
			border: 2px solid var(--border-color);
			border-left: none;
			border-right: none;

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
