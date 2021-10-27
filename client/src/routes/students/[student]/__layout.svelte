<script>
	import { page } from '$app/stores';
	import ButtonLink from '$lib/components/ButtonLink.svelte';
	import FileDocumentMultiple from '$lib/icons/file-document-multiple.svelte';
	import CommentTextMultiple from '$lib/icons/comment-text-multiple.svelte';
	import Archive from '$lib/icons/archive.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import StudentInfo from '$lib/components/StudentInfo.svelte';
	import { onDestroy, setContext } from 'svelte';
	import { userStore } from '$lib/stores';
	import { fade, slide } from 'svelte/transition';
	import { fetcher } from '$lib/fetcher';
	import StudentOptions from '$lib/components/StudentOptions.svelte';
	import StudentAvatar from '$lib/components/StudentAvatar.svelte';
	import StudentCategories from '$lib/components/StudentCategories.svelte';
	import { writable } from 'svelte/store';
	import Reload from '$lib/icons/reload.svelte';
	import Stairs from '$lib/loaders/Stairs.svelte';
	import { goto } from '$app/navigation';

	const [[student, categories], loading, error, refetch, update, progress, controller] = fetcher(
		[`http://localhost:4000/students/${$page.params.student}`, `http://localhost:4000/documents`],
		{
			edit: ([student, categories]) => {
				categories.data = categories.data.filter(
					(category) => !student.data.categories.find(({ _id }) => category._id === _id)
				);

				return [student, categories];
			},
			alwaysFetch: true
		}
	);
	let isCategoriesActive = false;

	const refetchPage = writable(() => {});
	const refetchDocumentsPage = writable(() => {});

	// * For children components
	setContext('student', student);
	setContext('categories', categories);
	setContext('refetchDocumentsPage', refetchDocumentsPage);

	// * For slot components
	setContext('refetchStudent', refetch);
	setContext('refetchPage', refetchPage);

	onDestroy(() => {
		controller.abort();
	});
</script>

<div class="container">
	{#if $loading}
		<div in:fade={{ duration: 200 }} out:slide={{ duration: 200 }} class="loader">
			<Stairs />
			<h1>Cargando</h1>
			{$progress}%
		</div>
	{:else if $error}
		<span>Something went wrong: {$error}</span>
	{:else}
		<div in:fade={{ duration: 200 }} class="user-container">
			<!--AVATAR-->
			<StudentAvatar />

			<!--INFO-->
			<StudentInfo student={$student} />

			<!--OPTIONS-->
			{#if $userStore.role !== 'user'}
				<StudentOptions bind:isCategoriesActive />
			{/if}
		</div>

		<!--CATEGORIES-->
		{#if isCategoriesActive}
			<StudentCategories />
		{/if}

		<!--NAVEGATION-->
		<div class="navigation">
			<ButtonLink
				name={'Documentos'}
				icon={FileDocumentMultiple}
				path={`/students/${$page.params.student}/documents`}
			/>

			<ButtonLink
				name={'Observaciones'}
				icon={CommentTextMultiple}
				path={`/students/${$page.params.student}/observations`}
			/>

			<ButtonLink
				name={'Archivos'}
				icon={Archive}
				path={`/students/${$page.params.student}/archives`}
			/>

			<span class="bottom-border" />
			<button on:click={$refetchPage}>
				<span class="btn-span"><Icon src={Reload} /></span>
				<span class="btn-span"> Recargar </span>
			</button>
		</div>

		<!--CONTENT-->
	{/if}
</div>
<div class="content">
	<slot />
</div>

<style>
	div.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	div.user-container {
		display: flex;
		gap: 1rem;
	}

	div.navigation {
		display: flex;
	}

	span.bottom-border {
		border-bottom: 2px solid var(--border-color);
		width: 100%;
	}

	button {
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
		padding: 1rem;
		border-bottom: 2px solid var(--border-color);
		background-color: transparent;
	}

	button:hover > * {
		color: var(--placeholder-color);
		fill: var(--placeholder-color);
	}

	.btn-span {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	div.loader {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-top: 2rem;
		margin-bottom: 8rem;
	}
</style>
