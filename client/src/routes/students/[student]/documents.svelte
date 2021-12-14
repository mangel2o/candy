<script>
	import { page } from '$app/stores';
	import { fetcher } from '$lib/fetcher';
	import Stairs from '$lib/loaders/Stairs.svelte';
	import DeleteDocument from '$lib/modals/document/DeleteDocument.svelte';
	import EditDocument from '$lib/modals/document/EditDocument.svelte';
	import UploadDocument from '$lib/modals/document/UploadDocument.svelte';
	import ViewDocument from '$lib/modals/document/ViewDocument.svelte';
	import { userStore } from '$lib/stores';
	import { convertDataToFile } from '$lib/utils';
	import { getContext, onDestroy } from 'svelte';
	import { fade, slide } from 'svelte/transition';

	const refetchPage = getContext('refetchPage');
	const refetchDocumentsPage = getContext('refetchDocumentsPage');
	const refetchStudent = getContext('refetchStudent');
	const [[documents], loading, error, refetch, update, progress, controller] = fetcher(
		[`http://localhost:4000/students/${$page.params.student}/documents`],
		{
			edit: ([documents]) => {
				// Converts data to files
				documents.data.forEach((document) => {
					document.example = convertDataToFile(document.example, document._id);
					if (document.file) {
						document.file = convertDataToFile(document.file, document._id);
					}
				});
				return [documents];
			}
		}
	);
	$refetchPage = refetch;
	$refetchDocumentsPage = refetch;

	function handleEdit(event) {
		update(
			$documents,
			$documents.map((document) => {
				if (document._id === event.detail._id) return event.detail;
				return document;
			})
		);
		refetchStudent(false);
	}

	function handleDelete(event) {
		update(
			$documents,
			$documents.filter((document) => document._id !== event.detail._id)
		);
		refetchStudent(false);
	}

	onDestroy(() => {
		controller.abort();
	});
</script>

<svelte:head>
	<title>Documentos del alumno • Tecmilenio</title>
</svelte:head>

<div class="container">
	{#if $loading}
		<div in:fade={{ duration: 200 }} out:slide|local={{ duration: 200 }} class="loader">
			<Stairs />
			<h1>Cargando</h1>
			{$progress}%
		</div>
	{:else if $error}
		<span>Something went wrong: {$error}</span>
	{:else}
		<div in:fade={{ duration: 200 }} class="container">
			{#each $documents as document (document._id)}
				<div in:fade={{ duration: 200 }} out:fade|local={{ duration: 200 }} class="button">
					<ViewDocument {document} />
					{#if $userStore.role === 'Usuario' && document.status !== 'Completo'}
						<UploadDocument {document} on:request={handleEdit} />
					{/if}
					{#if $userStore.role !== 'Usuario'}
						{#if document.file}
							<EditDocument {document} on:request={handleEdit} />
						{/if}
						<DeleteDocument {document} on:request={handleDelete} />
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
