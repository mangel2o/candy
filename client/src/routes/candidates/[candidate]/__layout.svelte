<script>
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
	import { userStore } from '$lib/stores';

	let isPending = true;
	let error = null;
	let isCategoriesActive = false;
	let categories;
	let candidate;

	function fetchData() {
		Promise.all([
			fetch(`http://localhost:4000/candidates/${$page.params.candidate}`).then((res) => res.json()),
			fetch(`http://localhost:4000/documents`).then((res) => res.json())
		])
			.then(([dataCandidate, dataCategories]) => {
				if (dataCandidate.error) {
					error = dataCandidate.error;
					isPending = false;
					return;
				}
				error = null;
				candidate = dataCandidate;
				categories = dataCategories;
				isPending = false;
			})
			.catch((err) => {
				error = err;
				isPending = false;
			});
	}

	setContext('refetchCandidate', fetchData);
	onMount(() => {
		fetchData();
	});
</script>

<div class="container">
	{#if isPending}
		<span>Loading...</span>
	{:else if error}
		<span>Something went wrong: {error}</span>
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

			{#if $userStore.role !== 'user'}
				<!--OPTIONS-->
				<div class="options">
					<div class="upper">
						<EditCandidate {categories} {candidate} />
						<DeleteCandidate />
					</div>

					<button
						class:isCategoriesActive
						on:click={() => (isCategoriesActive = !isCategoriesActive)}
					>
						<Icon src={ChevronDown} />
					</button>
				</div>
			{/if}
		</div>

		<!--CATEGORIES-->
		<div class="categories" class:isCategoriesActive>
			<span class="text">Categorias de documentos</span>
			<span class="divider" />
			<div class="categories-container">
				{#each candidate.categories as category}
					<div class="category">
						{category.name}
					</div>
				{/each}
			</div>
		</div>

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
	{/if}
</div>

<style>
	div.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	div.user {
		display: flex;
		gap: 1rem;
	}

	div.avatar {
		width: 12rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	div.avatar,
	div.info {
		background-color: var(--area-color);
		border: 2px solid var(--border-color);
	}

	div.info {
		flex-grow: 1;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		overflow-wrap: normal;
	}

	div.options {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	div.upper {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	div.categories {
		display: none;
		width: 100%;
		height: 56px;
		border: 2px solid var(--border-color);
		background-color: var(--area-color);
		align-items: center;
		gap: 1rem;
	}
	div.categories span.text {
		width: 12%;
		color: var(--focus-color);
		text-align: right;
	}

	div.categories span.divider {
		width: 2px;
		height: 2rem;
		background-color: var(--focus-color);
	}

	div.categories-container {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}

	div.category {
		padding: 10px;
		border: 2px dashed var(--green-color);
		border-radius: 0.5rem;
	}

	div.isCategoriesActive {
		display: flex;
	}

	div.navigation {
		display: flex;
		margin-top: 6px;
	}

	span.bottom-border {
		border-bottom: 2px solid var(--border-color);
		width: 100%;
	}

	button {
		display: flex;
		cursor: pointer;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		padding: 0.5rem;
	}
	button:hover {
		background-color: var(--area-color);
		border: 2px solid var(--blue-color);
	}

	button:focus {
		border: 2px solid var(--green-color);
	}
</style>
