<script>
	import ChevronDown from '$lib/icons/chevron-down.svelte';
	import DeleteStudent from '$lib/modals/student/DeleteStudent.svelte';
	import EditStudent from '$lib/modals/student/EditStudent.svelte';
	import { getContext } from 'svelte';
	import Icon from './Icon.svelte';

	let categories = getContext('categories');
	let student = getContext('student');
	export let isCategoriesActive;
</script>

<div class="options">
	<div class="upper">
		<EditStudent categories={$categories} bind:student={$student} />
		<DeleteStudent />
	</div>

	<button class:isCategoriesActive on:click={() => (isCategoriesActive = !isCategoriesActive)}>
		<Icon rotate={isCategoriesActive} src={ChevronDown} />
	</button>
</div>

<style>
	div.options {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	div.upper {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	button {
		display: flex;
		cursor: pointer;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		padding: 0.5rem;
	}
	button:hover {
		background-color: var(--area-color);
		border: 2px solid var(--blue-color);
	}

	button:focus {
		border: 2px solid var(--green-color);
	}
</style>
