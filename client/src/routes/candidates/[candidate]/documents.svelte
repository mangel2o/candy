<script lang="ts">
	import { page } from '$app/stores';

	import DeleteDocument from '$lib/modals/document/DeleteDocument.svelte';
	import EditDocument from '$lib/modals/document/EditDocument.svelte';
	import UploadDocument from '$lib/modals/document/UploadDocument.svelte';
	import ViewDocument from '$lib/modals/document/ViewDocument.svelte';
	import { userStore } from '$lib/stores';
	import { convertDataToFile } from '$lib/utils';
	import { onMount, setContext } from 'svelte';

	let isPending = true;
	let error = null;
	let documents = [];

	function fetchData() {
		isPending = true;
		fetch(`http://localhost:4000/candidates/${$page.params.candidate}/documents`)
			.then((res) => res.json())
			.then((data) => {
				documents = data;

				// Converts data to files
				documents.forEach((document) => {
					document.example = convertDataToFile(document.example, document._id);
					if (document.file) {
						document.file = convertDataToFile(document.file, document._id);
					}
				});
				error = null;
				isPending = false;
			})
			.catch((err) => {
				error = err.message;
				isPending = false;
			});
	}
	setContext('refetchDocuments', fetchData);
	onMount(() => {
		fetchData();
	});
</script>

<svelte:head>
	<title>Documentos del candidato • Tecmilenio</title>
</svelte:head>

<template>
	<div class="container">
		{#if isPending}
			<span>Loading...</span>
		{:else if error}
			<span>Something went wrong</span>
		{:else}
			{#each documents as document (document._id)}
				<div class="button">
					<ViewDocument {document} />
					{#if $userStore.role === 'user' && document.status !== 'Completo'}
						<UploadDocument {document} />
					{/if}
					{#if $userStore.role !== 'user' && document.file}
						<EditDocument {document} />
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
