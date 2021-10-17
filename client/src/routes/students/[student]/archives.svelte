<script>
	import { page } from '$app/stores';
	import Spinner from '$lib/components/Spinner.svelte';
	import CreateArchive from '$lib/modals/archive/CreateArchive.svelte';
	import DeleteArchive from '$lib/modals/archive/DeleteArchive.svelte';
	import EditArchive from '$lib/modals/archive/EditArchive.svelte';
	import ViewArchive from '$lib/modals/archive/ViewArchive.svelte';
	import { userStore } from '$lib/stores';
	import { convertDataToFile } from '$lib/utils';
	import { onMount, setContext } from 'svelte';
	import { fade } from 'svelte/transition';

	let isPending = true;
	let error = null;
	let archives;

	function fetchData() {
		isPending = true;
		fetch(`http://localhost:4000/students/${$page.params.student}/archives`)
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					error = data.error;
					isPending = false;
					return;
				}
				error = null;
				archives = data;

				// Converts data to files
				archives.forEach(
					(archive) => (archive.file = convertDataToFile(archive.file, archive._id))
				);
				isPending = false;
			})
			.catch((err) => {
				error = err;
				isPending = false;
			});
	}
	setContext('refetchArchives', fetchData);
	onMount(() => {
		fetchData();
	});
</script>

<svelte:head>
	<title>Archivos del alumno • Tecmilenio</title>
</svelte:head>

<div class="container">
	{#if isPending}
		<div class="spinner">
			<Spinner />
		</div>
	{:else if error}
		<span>Something went wrong</span>
	{:else}
		<div in:fade={{ duration: 200 }} class="container">
			{#if $userStore.role !== 'user'}
				<CreateArchive />
			{/if}

			{#each archives as archive}
				<div out:fade|local={{ duration: 200 }} class="button">
					<ViewArchive {archive} />
					{#if $userStore.role !== 'user'}
						<EditArchive {archive} />
						<DeleteArchive {archive} />
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

	div.spinner {
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 16rem;
	}
</style>
