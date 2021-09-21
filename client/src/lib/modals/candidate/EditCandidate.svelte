<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Pencil from '$lib/icons/pencil.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import CandidateContent from './CandidateContent.svelte';
	import { getContext } from 'svelte';
	import { userStore } from '$lib/stores';
	import { page } from '$app/stores';

	const refetchCandidates: Function = getContext('refetchCandidates');
	export let categories;
	let isPending = false;
	let isOpen = false;
	let isCategoriesEmpty = false;
	let warning;

	export let candidate;
	let editableCandidate = { ...candidate };

	function handleSubmit() {
		if (candidate.categories.length < 1) {
			isCategoriesEmpty = true;
			return;
		} else {
			isCategoriesEmpty = false;
		}

		isPending = true;
		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(editableCandidate).forEach((key) => formData.append(key, editableCandidate[key]));
		fetch(`http://localhost:4000/candidates/${$page.params.candidate}`, {
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
				handleCancel();
				refetchCandidates();
			})
			.catch((err) => {
				warning = err;
				isPending = false;
			});
	}

	function handleCancel() {
		editableCandidate = { ...candidate };
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
			<CandidateContent
				bind:categories
				bind:warning
				bind:isCategoriesEmpty
				bind:candidate={editableCandidate}
			/>
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
