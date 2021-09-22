<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Plus from '$lib/icons/plus.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { getContext } from 'svelte';
	import TemplateContent from './TemplateContent.svelte';
	import { page } from '$app/stores';
	import { userStore } from '$lib/stores';

	let refetchCategory: Function = getContext('refetchCategory');
	let isOpen = false;
	let isPending = false;
	let warning;

	let template = {
		name: '',
		description: '',
		example: null
	};

	function handleSubmit() {
		isPending = true;
		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(template).forEach((key) => formData.append(key, template[key]));
		fetch(`http://localhost:4000/documents/${$page.params.category}/templates`, {
			method: 'POST',
			body: formData
		})
			.then(() => {
				isPending = false;
				handleCancel();
				refetchCategory();
			})
			.catch((err) => {
				warning = err;
				isPending = false;
			});
	}

	function handleCancel() {
		template = {
			name: '',
			description: '',
			example: null
		};
		isOpen = false;
	}
</script>

<template>
	<Modal bind:isOpen>
		<button class="create" slot="trigger" let:open on:click={open}>
			<Icon src={Plus} />
			<span>Crear documento</span>
		</button>

		<!--Header-->
		<span slot="header"> Crear documento </span>

		<!--Content-->
		<form on:submit|preventDefault={handleSubmit} slot="content">
			<TemplateContent bind:warning bind:template />
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
		padding: 1rem;

		&.create {
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 6px;
			width: 100%;

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
