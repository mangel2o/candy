<script lang="ts">
	import QuantityEntries from '$lib/components/QuantityEntries.svelte';
	import EditFilter from '$lib/modals/EditFilter.svelte';
	import CreateCandidate from '$lib/modals/candidate/CreateCandidate.svelte';
	import AddExcel from '$lib/modals/AddExcel.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import CandidatesTable from '$lib/components/CandidatesTable.svelte';
	import { onMount, setContext } from 'svelte';

	let isPending = true;
	let error = null;
	let candidates = [];
	let categories = [
		{
			name: 'General'
		},
		{
			name: 'Extranjero'
		},
		{
			name: 'Equivalencia'
		}
	];
	let entries = 0;
	let searchQuery;
	let searchParameter;

	$: filteredCandidates =
		searchQuery === ''
			? candidates.slice(0, entries)
			: candidates
					.slice(0, entries)
					.filter((candidate) => candidate[searchParameter].includes(searchQuery));

	function fetchData() {
		isPending = true;
		fetch('http://localhost:4000/candidates')
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
	}

	setContext('refetch', fetchData);
	setContext('categories', categories);
	onMount(() => {
		fetchData();
	});
</script>

<svelte:head>
	<title>Candidatos • Tecmilenio</title>
</svelte:head>

<template>
	<div class="container">
		<div class="tools">
			<QuantityEntries bind:entries limit={candidates.length} />
			<div class="options">
				<EditFilter />
				<CreateCandidate />
				<AddExcel />
				<SearchBar bind:searchQuery bind:searchParameter />
			</div>
		</div>
		{#if isPending}
			<span>Loading...</span>
		{:else if error}
			<span>Something went wrong {error}</span>
		{:else}
			<CandidatesTable candidates={filteredCandidates} />
		{/if}
	</div>
</template>

<style lang="scss">
	div {
		&.container {
			display: flex;
			flex-direction: column;
			gap: 20px;
		}

		&.tools {
			display: flex;
			justify-content: space-between;
		}

		&.options {
			display: flex;
			gap: 1rem;
		}
	}
</style>
