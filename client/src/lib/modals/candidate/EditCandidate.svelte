<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Pencil from '$lib/icons/pencil.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import CandidateContent from './CandidateContent.svelte';
	import { getContext } from 'svelte';
	import { userStore } from '$lib/stores';
	import { page } from '$app/stores';
	import WarningToast from '$lib/components/WarningToast.svelte';
	import ErrorToast from '$lib/components/ErrorToast.svelte';

	const refetchCandidates: Function = getContext('refetchCandidates');
	export let categories = [];
	let availableCategories = [...categories].filter(
		(category) => ![...candidate.categories].includes(category.uri)
	);
	let isPending = false;
	let isOpen = false;
	let error = null;

	export let candidate;
	let editableCandidate = { ...candidate, newCategories: [] };

	$: disableSubmit = Object.keys(candidate).every(
		(key) => editableCandidate.hasOwnProperty(key) && editableCandidate[key] === candidate[key]
	);

	function handleSubmit() {
		isPending = true;
		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(editableCandidate).forEach((key) => formData.append(key, editableCandidate[key]));
		fetch(`http://localhost:4000/candidates/${$page.params.candidate}`, {
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
				handleCancel();
				refetchCandidates();
			})
			.catch((err) => {
				error = err;
				isPending = false;
			});
	}

	function handleCancel() {
		editableCandidate = { ...candidate, newCategories: [] };
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
		<span slot="header"> Editar candidato </span>

		<!--Content-->
		<form on:submit|preventDefault={handleSubmit} slot="content">
			<CandidateContent bind:categories={availableCategories} bind:candidate={editableCandidate} />
			{#if error}
				<ErrorToast bind:error />
			{/if}
			{#if availableCategories.length < 1}
				<WarningToast>Parece que no hay categorias que agregar</WarningToast>
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
