<script>
	import QuantityEntries from '$lib/components/QuantityEntries.svelte';
	import EditFilter from '$lib/modals/EditFilter.svelte';
	import CreateCandidate from '$lib/modals/candidate/CreateCandidate.svelte';
	import AddExcel from '$lib/modals/AddExcel.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import CandidatesTable from '$lib/components/CandidatesTable.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { onMount, setContext } from 'svelte';
	import { getData, getMultipleData } from '$lib/fetcher';

	let isPending = true;
	let error;
	let candidates = [];
	let categories = [];
	let filteredCandidates = [];

	let searchQuery;
	let searchParameter;
	$: searchedCandidates = filteredCandidates.filter((candidate) =>
		candidate[searchParameter].toString().toLowerCase().includes(searchQuery.toLowerCase())
	);

	let entries;
	let limit;
	$: slicedCandidates = searchedCandidates.slice(0, entries);

	let { fetchedData, pending, bad } = getMultipleData([
		`http://localhost:4000/candidates`,
		`http://localhost:4000/documents`
	]);

	function fetching() {
		let { fetchedData, pending, bad } = getData(`http://localhost:4000/candidates`);
	}

	function fetchData() {
		Promise.all([
			fetch(`http://localhost:4000/candidates`).then((res) => res.json()),
			fetch(`http://localhost:4000/documents`).then((res) => res.json())
		])
			.then(([dataCandidates, dataCategories]) => {
				candidates = dataCandidates;
				filteredCandidates = candidates;
				categories = dataCategories;
				entries = candidates.length;
				limit = candidates.length;
				isPending = false;
			})
			.catch((err) => {
				error = err;
				isPending = false;
			});
	}

	setContext('refetchCandidates', fetchData);
	onMount(() => {
		isPending = true;
		setTimeout(() => {
			fetchData();
		}, 1000);
		//fetching();
	});
</script>

<svelte:head>
	<title>Candidatos • Tecmilenio</title>
</svelte:head>

<div class="container">
	<div class="tools">
		<QuantityEntries bind:entries bind:limit />
		<div class="options">
			<CreateCandidate bind:categories />
			<AddExcel />
			<EditFilter bind:entries bind:candidates bind:filteredCandidates />
			<SearchBar bind:searchQuery bind:searchParameter />
		</div>
	</div>
	<!--

	{#if $fetchedData}
		{#each $fetchedData[0] as item}
			{JSON.stringify(item.name)}<br />
		{/each}
		{#each $fetchedData[1] as item}
			{JSON.stringify(item.name)}<br />
		{/each}
	{/if}
	-->

	{$fetchedData}<br />
	{$pending}<br />
	{$bad}<br />

	{#if isPending}
		<div class="spinner">
			<Spinner />
		</div>
	{:else if error}
		<span>Something went wrong {error}</span>
	{:else}
		<CandidatesTable bind:candidates={slicedCandidates} />
	{/if}
</div>

<style>
	div.container {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	div.tools {
		display: flex;
		justify-content: space-between;
	}

	div.options {
		display: flex;
		gap: 1rem;
	}

	div.spinner {
		position: absolute;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 30rem;
	}
</style>
