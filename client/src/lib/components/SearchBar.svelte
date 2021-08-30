<script lang="ts">
	import Magnify from '$lib/icons/magnify.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ClickOutside from '$lib/components/ClickOutside.svelte';

	let isFocused = false;
	export let searchQuery = '';
	export let searchParameter = 'name';
</script>

<!--CLICKING OUTSIDE LOSES FOCUS-->
<template>
	<ClickOutside on:clickoutside={() => (isFocused = false)}>
		<div class:isFocused on:click={() => (isFocused = true)}>
			<label for="searchbar">
				<Icon src={Magnify} />
			</label>
			<select bind:value={searchParameter}>
				<option selected value="name"> Nombre </option>
				<option value="number"> Matricula </option>
				<option value="status"> Estatus </option>
			</select>
			<span />
			<input id="searchbar" type="text" placeholder="Buscar alumno..." bind:value={searchQuery} />
		</div>
	</ClickOutside>
</template>

<style lang="scss">
	div {
		display: flex;
		align-items: center;
		width: 500px;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);

		&:hover {
			border: 2px solid var(--blue-color);
		}

		&.isFocused {
			border: 2px solid var(--green-color);
			background-color: var(--area-color);
		}
	}

	label {
		cursor: pointer;
		padding: 1rem 0.2rem 1rem 1rem;
		display: flex;
		align-items: center;
	}

	span {
		width: 2px;
		height: 2rem;
		margin: 0 0 0 0.5rem;
		background-color: var(--focus-color);
	}

	select,
	input {
		background-color: transparent;
		color: var(--white-color);
	}

	option {
		background-color: var(--area-color);
	}

	select {
		cursor: pointer;
		padding: 1rem 0.2rem;
		-webkit-appearance: none;
		-moz-appearance: none;

		&:hover {
			color: var(--placeholder-color);
		}
	}

	input {
		width: 100%;
		padding: 1rem;
		&:hover::placeholder {
			color: var(--placeholder-color);
		}
	}
</style>
