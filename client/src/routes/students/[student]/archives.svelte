<script>
	import { page } from '$app/stores';
	import CreateArchive from '$lib/modals/archive/CreateArchive.svelte';
	import DeleteArchive from '$lib/modals/archive/DeleteArchive.svelte';
	import EditArchive from '$lib/modals/archive/EditArchive.svelte';
	import ViewArchive from '$lib/modals/archive/ViewArchive.svelte';
	import { userStore } from '$lib/stores';
	import { convertDataToFile } from '$lib/utils';
	import { getContext, onDestroy, setContext } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { fetcher } from '$lib/fetcher';
	import * as animateScroll from 'svelte-scrollto';
	import Stairs from '$lib/loaders/Stairs.svelte';

	const refetchPage = getContext('refetchPage');
	const [[archives], loading, error, refetch, update, progress, controller] = fetcher(
		[`http://localhost:4000/students/${$page.params.student}/archives`],
		{
			edit: ([archives]) => {
				archives.data.forEach((archive) => {
					archive.file = convertDataToFile(archive.file, archive._id);
				});

				return [archives];
			}
		}
	);
	$refetchPage = refetch;

	function handleCreate(event) {
		update($archives, [...$archives, event.detail]);
		animateScroll.scrollToBottom({ delay: 200 });
	}

	function handleEdit(event) {
		update(
			$archives,
			$archives.map((archive) => {
				if (archive._id === event.detail._id) return event.detail;
				return archive;
			})
		);
	}

	function handleDelete(event) {
		update(
			$archives,
			$archives.filter((archive) => archive._id !== event.detail._id)
		);
	}

	onDestroy(() => {
		controller.abort();
	});
</script>

<svelte:head>
	<title>Archivos del alumno • Tecmilenio</title>
</svelte:head>

<div class="container">
	{#if $loading}
		<div in:fade={{ duration: 200 }} out:slide|local={{ duration: 200 }} class="loader">
			<Stairs />
			<h1>Cargando</h1>
			{$progress}%
		</div>
	{:else if $error}
		<span>Something went wrong</span>
	{:else}
		<div in:fade={{ duration: 200 }} class="container">
			{#if $userStore.role !== 'Usuario'}
				<CreateArchive on:request={handleCreate} />
			{/if}

			{#each $archives as archive (archive._id)}
				<div in:fade={{ duration: 200 }} out:fade|local={{ duration: 200 }} class="button">
					<ViewArchive {archive} />
					{#if $userStore.role !== 'Usuario'}
						<EditArchive {archive} on:request={handleEdit} />
						<DeleteArchive {archive} on:request={handleDelete} />
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	div.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	div.button {
		display: flex;
		width: 100%;
		border: 2px solid var(--border-color);
	}

	div.loader {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
</style>
