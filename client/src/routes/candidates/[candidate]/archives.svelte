<script lang="ts">
	import { page } from '$app/stores';
	import CreateArchive from '$lib/modals/archive/CreateArchive.svelte';
	import DeleteArchive from '$lib/modals/archive/DeleteArchive.svelte';
	import EditArchive from '$lib/modals/archive/EditArchive.svelte';
	import ViewArchive from '$lib/modals/archive/ViewArchive.svelte';
	import { userStore } from '$lib/stores';
	import { convertDataToFile } from '$lib/utils';
	import { onMount, setContext } from 'svelte';

	let isPending = true;
	let error = null;
	let archives = [];

	function fetchData() {
		isPending = true;
		fetch(`http://localhost:4000/candidates/${$page.params.candidate}/archives`)
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
	<title>Archivos del candidato • Tecmilenio</title>
</svelte:head>

<template>
	<div class="container">
		{#if isPending}
			<span>Loading...</span>
		{:else if error}
			<span>Something went wrong</span>
		{:else}
			{#if $userStore.role !== 'user'}
				<CreateArchive />
			{/if}

			{#each archives as archive}
				<div class="button">
					<ViewArchive {archive} />
					{#if $userStore.role !== 'user'}
						<EditArchive {archive} />
						<DeleteArchive {archive} />
					{/if}
				</div>
			{/each}
		{/if}
	</div>
</template>

<style lang="scss">
	div {
		&.container {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		&.button {
			display: flex;
			width: 100%;
			border: 2px solid var(--border-color);
		}
	}
</style>
