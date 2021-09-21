<script lang="ts">
	import QuantityEntries from '$lib/components/QuantityEntries.svelte';
	import EditFilter from '$lib/modals/EditFilter.svelte';
	import CreateCandidate from '$lib/modals/candidate/CreateCandidate.svelte';
	import AddExcel from '$lib/modals/AddExcel.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import CandidatesTable from '$lib/components/CandidatesTable.svelte';
	import { onMount, setContext } from 'svelte';

	let isPending = true;
	let error;
	let candidates = [];
	let categories;
	let searchQuery;
	let searchParameter;
	let filters;
	let parameters;
	$: entries = 0;
	$: slicedCandidates = candidates.slice(0, entries);
	$: filteredCandidates = slicedCandidates.filter((candidate) => {
		for (const key of filters) {
			if (
				parameters[key].toString().toLowerCase() !== '' &&
				parameters[key].toString().toLowerCase() !== candidate[key].toString().toLowerCase()
			) {
				return false;
			}
		}
		return true;
	});
	$: searchedCandidates = !searchQuery
		? filteredCandidates
		: filteredCandidates.filter((candidate) =>
				candidate[searchParameter].toString().toLowerCase().includes(searchQuery.toLowerCase())
		  );

	function fetchData() {
		isPending = true;
		Promise.all([
			fetch(`http://localhost:4000/candidates`).then((res) => res.json()),
			fetch(`http://localhost:4000/documents`).then((res) => res.json())
		])
			.then(([dataCandidates, dataCategories]) => {
				candidates = dataCandidates;
				categories = dataCategories;
				entries = candidates.length;
				isPending = false;
			})
			.catch((err) => {
				error = err;
				isPending = false;
			});
	}

	setContext('refetchCandidates', fetchData);
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
				<EditFilter bind:filters bind:parameters />
				<CreateCandidate bind:categories />
				<AddExcel />
				<SearchBar bind:searchQuery bind:searchParameter />
			</div>
		</div>
		{#if isPending}
			<span>Loading...</span>
		{:else if error}
			<span>Something went wrong {error}</span>
		{:else}
			<CandidatesTable bind:candidates={searchedCandidates} />
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
