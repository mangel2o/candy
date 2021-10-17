<script>
	import QuantityEntries from '$lib/components/QuantityEntries.svelte';
	import EditFilter from '$lib/modals/EditFilter.svelte';
	import CreateStudent from '$lib/modals/student/CreateStudent.svelte';
	import AddExcel from '$lib/modals/AddExcel.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import StudentsTable from '$lib/components/StudentsTable.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { onMount, setContext } from 'svelte';
	import { getData } from '$lib/fetcher';

	// let { d, p, e } = getData([
	// 	`http://localhost:4000/candidates`,
	// 	`http://localhost:4000/documents`
	// ]);
	// $: [d1, d2] = [...$d];
	// $: console.log('second:', d1, d2);

	let isPending = true;
	let error;
	let students = [];
	let filteredStudents = [];
	let categories = [];

	let searchQuery;
	let searchParameter;
	$: searchedStudents = filteredStudents.filter((student) =>
		student[searchParameter].toString().toLowerCase().includes(searchQuery.toLowerCase())
	);

	let entries;
	let limit;
	$: slicedStudents = searchedStudents.slice(0, entries);

	function fetchData() {
		Promise.all([
			fetch(`http://localhost:4000/students`).then((res) => res.json()),
			fetch(`http://localhost:4000/documents`).then((res) => res.json())
		])
			.then(([dataStudents, dataCategories]) => {
				students = dataStudents;
				filteredStudents = dataStudents;
				categories = dataCategories;
				entries = students.length;
				limit = students.length;
				isPending = false;
			})
			.catch((err) => {
				error = err;
				isPending = false;
			});
	}

	setContext('refetchStudents', fetchData);
	onMount(() => {
		fetchData();
	});
</script>

<svelte:head>
	<title>Alumnos • Tecmilenio</title>
</svelte:head>

<div class="container">
	<div class="tools">
		<QuantityEntries bind:entries bind:limit />
		<div class="options">
			<CreateStudent bind:categories />
			<AddExcel />
			<EditFilter bind:entries bind:students bind:filteredStudents />
			<SearchBar bind:searchQuery bind:searchParameter />
		</div>
	</div>

	{#if isPending}
		<div class="spinner">
			<Spinner />
		</div>
	{:else if error}
		<span>Something went wrong {error}</span>
	{:else}
		<StudentsTable bind:students={slicedStudents} />
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
