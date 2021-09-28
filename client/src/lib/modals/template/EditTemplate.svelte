<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Pencil from '$lib/icons/pencil.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import TemplateContent from './TemplateContent.svelte';
	import WarningToast from '$lib/components/ErrorToast.svelte';
	import { getContext } from 'svelte';
	import { page } from '$app/stores';
	import { userStore } from '$lib/stores';
	import ErrorToast from '$lib/components/ErrorToast.svelte';

	let refetchCategory: Function = getContext('refetchCategory');
	let isOpen = false;
	let isPending = false;
	let error = null;

	export let template;
	let editableTemplate = {
		...template
	};

	$: disableSubmit = Object.keys(template).every(
		(key) => editableTemplate.hasOwnProperty(key) && editableTemplate[key] === template[key]
	);

	function handleSubmit() {
		isPending = true;
		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(editableTemplate).forEach((key) => formData.append(key, editableTemplate[key]));
		fetch(`http://localhost:4000/documents/${$page.params.category}/templates/${template._id}`, {
			method: 'PUT',
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
				isOpen = false;
				refetchCategory();
			})
			.catch((err) => {
				error = err.message;
				isPending = false;
			});
	}

	function handleCancel() {
		editableTemplate = { ...template };
		error = null;
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
			<TemplateContent bind:template={editableTemplate} />
			{#if error}
				<ErrorToast bind:error />
			{/if}
			<div>
				<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
				<button disabled={disableSubmit} class="submit" type="submit">
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
