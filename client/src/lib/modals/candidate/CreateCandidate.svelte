<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import AccountPlus from '$lib/icons/account-plus.svelte';
	import CandidateContent from './CandidateContent.svelte';
	import { getContext } from 'svelte';
	import { userStore } from '$lib/stores';

	const refetchCandidates: Function = getContext('refetchCandidates');
	export let categories = [];
	let isPending = false;
	let isOpen = false;
	let isCategoriesEmpty = false;
	let isTemplatesEmpty = false;
	let warning = null;

	let candidate = {
		name: '',
		number: '',
		level: '',
		campus: '',
		genre: '',
		active: '',
		career: '',
		phone: '',
		email: '',
		modality: '',
		terminationPeriod: '',
		terminationYear: '',
		graduationPeriod: '',
		graduationYear: '',
		categories: []
	};

	function handleSubmit() {
		if (categories.length < 1) {
			return;
		} else if (candidate.categories.length < 1) {
			isCategoriesEmpty = true;
			isTemplatesEmpty = false;
			return;
		} else {
			for (const key of candidate.categories) {
				const categoryFound = categories.find((category) => category.uri === key);
				if (categoryFound.templates < 1) {
					isTemplatesEmpty = true;
					return;
				}
			}
			isCategoriesEmpty = false;
			isTemplatesEmpty = false;
		}
		isPending = true;
		const formData = new FormData();
		formData.append('authorId', $userStore._id);
		Object.keys(candidate).forEach((key) => formData.append(key, candidate[key]));
		fetch('http://localhost:4000/candidates', {
			method: 'POST',
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
		candidate = {
			name: '',
			number: '',
			level: '',
			campus: '',
			genre: '',
			active: '',
			career: '',
			phone: '',
			email: '',
			modality: '',
			terminationPeriod: '',
			terminationYear: '',
			graduationPeriod: '',
			graduationYear: '',
			categories: []
		};
		warning = null;
		isOpen = false;
	}
</script>

<template>
	<Modal bind:isOpen>
		<button class="create" slot="trigger" let:open on:click={open}>
			<Icon src={AccountPlus} />
			<span>Candidato</span>
		</button>

		<!--Header-->
		<span slot="header"> Crear candidato </span>

		<!--Content-->
		<form on:submit|preventDefault={handleSubmit} slot="content">
			<CandidateContent
				bind:categories
				bind:warning
				bind:isCategoriesEmpty
				bind:isTemplatesEmpty
				bind:candidate
			/>
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
