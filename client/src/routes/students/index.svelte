<script>
	import QuantityEntries from '$lib/components/QuantityEntries.svelte';
	import EditFilter from '$lib/modals/EditFilter.svelte';
	import CreateStudent from '$lib/modals/student/CreateStudent.svelte';
	import AddExcel from '$lib/modals/AddExcel.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import StudentsTable from '$lib/components/StudentsTable.svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import { setContext } from 'svelte';
	import { fetcher } from '$lib/fetcher';
	import { get } from 'svelte/store';

	const [[students, categories], loading, error, refetch] = fetcher(
		[`http://localhost:4000/students`, `http://localhost:4000/documents`],
		{
			init: () => {
				const data = {
					original: [],
					filterable: [],
					searchable: [],
					sliceable: [],
					entries: 0,
					limit: 0
				};
				return [data, null];
			},
			edit: ([students, categories]) => {
				const data = {
					original: students,
					filterable: students,
					searchable: students,
					sliceable: students,
					entries: students.length,
					limit: students.length
				};
				return [data, categories];
			}
		}
	);

	setContext('refetchStudents', refetch);
</script>

<svelte:head>
	<title>Alumnos • Tecmilenio</title>
</svelte:head>

<div class="container">
	<div class="tools">
		<QuantityEntries bind:students={$students} />
		<div class="options">
			<CreateStudent bind:categories={$categories} />
			<AddExcel />
			<EditFilter bind:students={$students} />
			<SearchBar bind:students={$students} />
		</div>
	</div>

	{#if $loading}
		<div class="spinner">
			<Spinner />
		</div>
	{:else if $error}
		<span>Something went wrong {$error}</span>
	{:else}
		<StudentsTable bind:students={$students} />
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
