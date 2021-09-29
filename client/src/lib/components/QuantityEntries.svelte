<script lang="ts">
	export let entries;
	export let limit;

	function handleChange() {
		if (entries < 1) {
			entries = 1;
		} else if (entries > limit) {
			entries = limit;
		}
	}
</script>

<template>
	<label for="quantity">
		Mostrar
		<input
			bind:value={entries}
			on:change={handleChange}
			id="quantity"
			type="number"
			min="1"
			max={limit}
		/>
		Entradas
	</label>
</template>

<style lang="scss">
	label {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	input {
		display: flex;
		flex-direction: row;
		align-items: center;
		cursor: pointer;
		border: 2px solid var(--border-color);
		background-color: var(--input-color);
		padding: 1rem;
		width: 7rem;

		&::placeholder {
			color: var(--focus-color);
		}

		&:hover {
			background-color: var(--area-color);
			border: 2px solid var(--blue-color);
		}
		&:focus {
			border: 2px solid var(--green-color);
		}
	}
</style>
