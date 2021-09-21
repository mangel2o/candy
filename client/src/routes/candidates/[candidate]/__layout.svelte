<script lang="ts">
	import { page } from '$app/stores';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import FileDocumentMultiple from '$lib/icons/file-document-multiple.svelte';
	import CommentTextMultiple from '$lib/icons/comment-text-multiple.svelte';
	import Archive from '$lib/icons/archive.svelte';
	import ChevronDown from '$lib/icons/chevron-down.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import EditCandidate from '$lib/modals/candidate/EditCandidate.svelte';
	import DeleteCandidate from '$lib/modals/candidate/DeleteCandidate.svelte';
	import Account from '$lib/icons/account.svelte';
	import CandidateInfo from '$lib/components/CandidateInfo.svelte';
	import { onMount, setContext } from 'svelte';

	let categories;
	let isCategoriesActive = false;

	let isPending = false;
	let error = null;
	let candidate = {
		id: 1,
		name: 'Miguel Ángel Castro García',
		number: 2865034,
		career: 'Ingeniería en Desarrollo de Software',
		campus: 'Las Torres',
		genre: 'Hombre',
		active: 'Activo',
		level: 'Profesional',
		phone: '8120317210',
		email: 'mangelcg.2o@outlook.com',
		modality: 'Semestre',
		terminationPeriod: 'Ene - May',
		terminationYear: '2021',
		graduationPeriod: 'Ene - May',
		graduationYear: '2021',
		status: 'Completo',
		categories: ['General', 'Extranjero']
	};

	function fetchData() {
		// TODO: fetch request at /candidates/[candidate]/__layout.svelte
		// FETCH /CANDIDATE/id AND /CATEGORIES
		/**
       * fetch('https://jsonplaceholder.typicode.com/todos')
			.then((res) => res.json())
			.then((data) => {
				isPending = false;
				error = null;
				candidates = data;
				entries = data.length;
			})
			.catch((err) => {
				isPending = false;
				error = err;
			});
      */

		console.log('A fetch has been done at /candidates/[candidate]/__layout.svelte');
	}

	setContext('refetch', fetchData);
	onMount(() => {
		fetchData();
	});
</script>

<template>
	<div class="container">
		{#if isPending}
			<span>Loading...</span>
		{:else if error}
			<span>Something went wrong</span>
		{:else}
			<div class="user">
				<!--AVATAR-->
				<div class="avatar">
					<Icon src={Account} size={'96'} />
				</div>

				<!--INFO-->
				<div class="info">
					<CandidateInfo {candidate} />
				</div>

				<!--OPTIONS-->
				<div class="options">
					<div class="upper">
						<EditCandidate bind:categories {candidate} />
						<DeleteCandidate {candidate} />
					</div>

					<button
						class:isCategoriesActive
						on:click={() => (isCategoriesActive = !isCategoriesActive)}
					>
						<Icon src={ChevronDown} />
					</button>
				</div>
			</div>

			<!--CATEGORIES-->
			<div class="categories" class:isCategoriesActive>
				<span class="text">Categorias de documentos</span>
				<span class="divider" />
				<div class="categories-container">
					{#each candidate.categories as category}
						<div class="category">
							{category}
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<!--NAVEGATION-->
		<div class="navigation">
			<ButtonLink
				name={'Documentos'}
				icon={FileDocumentMultiple}
				path={`/candidates/${$page.params.candidate}/documents`}
			/>

			<ButtonLink
				name={'Observaciones'}
				icon={CommentTextMultiple}
				path={`/candidates/${$page.params.candidate}/observations`}
			/>

			<ButtonLink
				name={'Archivos'}
				icon={Archive}
				path={`/candidates/${$page.params.candidate}/archives`}
			/>

			<span class="bottom-border" />
		</div>

		<!--CONTENT-->
		<div class="content">
			<slot />
		</div>
	</div>
</template>

<style lang="scss">
	div {
		&.container {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		&.user {
			display: flex;
			gap: 1rem;
		}

		&.avatar {
			width: 16rem;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&.avatar,
		&.info {
			background-color: var(--area-color);
			border: 2px solid var(--border-color);
		}

		&.info {
			width: 100%;
			padding: 20px;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			overflow-wrap: normal;
		}

		&.options {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}

		&.upper {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		&.categories {
			display: none;
			width: 100%;
			height: 56px;
			border: 2px solid var(--border-color);
			background-color: var(--area-color);
			align-items: center;
			gap: 1rem;

			span.text {
				width: 12%;
				color: var(--focus-color);
				text-align: right;
			}

			span.divider {
				width: 2px;
				height: 2rem;
				background-color: var(--focus-color);
			}
		}

		&.categories-container {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			gap: 0.5rem;
		}

		&.category {
			padding: 10px;
			border: 2px solid var(--green-color);
			border-radius: 0.5rem;
		}

		&.isCategoriesActive {
			display: flex;
		}

		&.navigation {
			display: flex;
			margin-top: 6px;
		}

		span.bottom-border {
			border-bottom: 2px solid var(--border-color);
			width: 100%;
		}
	}

	button {
		display: flex;
		cursor: pointer;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		padding: 0.5rem;

		&:hover {
			background-color: var(--area-color);
			border: 2px solid var(--blue-color);
		}

		&:focus {
			border: 2px solid var(--green-color);
		}
	}
</style>
