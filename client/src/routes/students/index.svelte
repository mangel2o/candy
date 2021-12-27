<script>
	import QuantityEntries from '$lib/components/QuantityEntries.svelte';
	import EditFilter from '$lib/modals/EditFilter.svelte';
	import CreateStudent from '$lib/modals/student/CreateStudent.svelte';
	import AddExcel from '$lib/modals/AddExcel.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import StudentsTable from '$lib/components/StudentsTable.svelte';
	import { onDestroy, setContext } from 'svelte';
	import { fetcher } from '$lib/fetcher';
	import Icon from '$lib/components/Icon.svelte';
	import Reload from '$lib/icons/reload.svelte';
	import Stairs from '$lib/loaders/Stairs.svelte';
	import { fade } from 'svelte/transition';
	import { studentsStore, updateStudentsStore } from '$lib/stores';
	import * as animateScroll from 'svelte-scrollto';
	import { writable } from 'svelte/store';

	const [[students, categories], loading, error, refetch, update, progress, controller] = fetcher(
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
				const studentsData = students.data;
				students.data = {
					original: studentsData,
					filterable: studentsData,
					searchable: studentsData,
					sliceable: studentsData,
					entries: studentsData.length,
					limit: studentsData.length
				};
				return [students, categories];
			},
			alwaysFetch: true
		}
	);

	function handleCreate(event) {
		update($students, event.detail);
		animateScroll.scrollToBottom({ delay: 200 });
	}

	$studentsStore = students;
	$updateStudentsStore = update;
	//setContext('refetchStudents', refetch);
	setContext('students', students);
	onDestroy(() => {
		controller.abort();
	});
</script>

<svelte:head>
	<title>Alumnos • Tecmilenio</title>
</svelte:head>

<div class="container">
	<div class="tools">
		<QuantityEntries bind:students={$students} />
		<div class="options">
			<CreateStudent bind:categories={$categories} on:request={handleCreate} />
			<!-- <AddExcel /> -->
			<EditFilter bind:students={$students} />
			<SearchBar bind:students={$students} />
			<button on:click={refetch}>
				<Icon src={Reload} />
			</button>
		</div>
	</div>

	{#if $loading}
		<div in:fade={{ duration: 400 }} out:fade|local={{ duration: 200 }} class="loader">
			<Stairs />
			<h1>Cargando</h1>
			{$progress}%
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

	button {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 14px;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
	}
	button:hover {
		border: 2px solid var(--blue-color);
	}

	button:active {
		border: 2px solid var(--green-color);
	}

	div.loader {
		position: absolute;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin-top: 6rem;
	}
</style>
