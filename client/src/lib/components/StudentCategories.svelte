<script>
	import { slide } from 'svelte/transition';
	import { getContext } from 'svelte';
	let student = getContext('student');
</script>

<div in:slide={{ duration: 200 }} out:slide|local={{ duration: 200 }} class="categories">
	<span class="text">Categorias de documentos</span>
	<div class="categories-container">
		{#each $student.categories as category}
			<div class="category">
				{category.name}
			</div>
		{/each}
	</div>
</div>

<style>
	div.categories {
		display: flex;
		border: 2px solid var(--border-color);
		background-color: var(--area-color);
		align-items: center;
		gap: 1rem;
	}
	div.categories span.text {
		width: 12%;
		color: var(--focus-color);
		text-align: right;
	}

	div.categories-container {
		width: 100%;
		height: fit-content;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
	}

	div.category {
		padding: 10px;
		border: 2px dashed var(--green-color);
		border-radius: 0.5rem;
	}
</style>
