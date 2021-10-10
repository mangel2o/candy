<script>
	import { page } from '$app/stores';
	import Spinner from '$lib/components/Spinner.svelte';
	import DeleteDocument from '$lib/modals/document/DeleteDocument.svelte';
	import EditDocument from '$lib/modals/document/EditDocument.svelte';
	import UploadDocument from '$lib/modals/document/UploadDocument.svelte';
	import ViewDocument from '$lib/modals/document/ViewDocument.svelte';
	import { userStore } from '$lib/stores';
	import { convertDataToFile } from '$lib/utils';
	import { onMount, setContext } from 'svelte';
	import { fade } from 'svelte/transition';

	let isPending = true;
	let error = null;
	let documents = [];

	function fetchData() {
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

<div class="container">
	{#if isPending}
		<div class="spinner">
			<Spinner />
		</div>
	{:else if error}
		<span>Something went wrong</span>
	{:else}
		<div in:fade={{ duration: 200 }} class="container">
			{#each documents as document (document._id)}
				<div in:fade={{ duration: 200 }} out:fade|local={{ duration: 200 }} class="button">
					<ViewDocument {document} />
					{#if $userStore.role === 'user' && document.status !== 'Completo'}
						<UploadDocument {document} />
					{/if}
					{#if $userStore.role !== 'user'}
						{#if document.file}
							<EditDocument {document} />
						{/if}
						<DeleteDocument {document} />
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
