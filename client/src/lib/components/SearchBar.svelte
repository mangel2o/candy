<script>
	import Magnify from '$lib/icons/magnify.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ClickOutside from '$lib/components/ClickOutside.svelte';
	import Close from '$lib/icons/close.svelte';

	let isFocused = false;
	export let searchQuery = '';
	export let searchParameter = 'name';

	function handleCancel() {
		searchQuery = '';
	}
</script>

<!--CLICKING OUTSIDE LOSES FOCUS-->
<ClickOutside on:clickoutside={() => (isFocused = false)}>
	<div class:isFocused on:click={() => (isFocused = true)}>
		<select bind:value={searchParameter}>
			<option selected value="name"> Nombre </option>
			<option value="number"> Matricula </option>
			<option value="phone"> Telefono </option>
			<option value="personalEmail"> Correo </option>
		</select>
		<span />

		<label for="searchbar">
			<Icon src={Magnify} />
		</label>

		<input
			id="searchbar"
			type="text"
			autocomplete="off"
			placeholder="Buscar alumno..."
			bind:value={searchQuery}
		/>
		<button on:click={handleCancel} class:inactive={!searchQuery}>
			<Icon src={Close} />
		</button>
	</div>
</ClickOutside>

<style>
	div {
		display: flex;
		align-items: center;
		width: 500px;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
	}

	div:hover {
		border: 2px solid var(--blue-color);
	}

	div.isFocused {
		border: 2px solid var(--green-color);
	}

	button {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
		background-color: transparent;
	}

	button:hover {
		background-color: var(--area-color);
	}

	button:active {
		background-color: var(--input-color);
	}

	button.inactive {
		display: none;
	}

	label {
		cursor: pointer;
		padding: 1rem 0 1rem 1rem;
		display: flex;
		align-items: center;
	}

	span {
		width: 2px;
		height: 2rem;
		background-color: var(--focus-color);
	}

	select,
	input {
		background-color: transparent;
		color: var(--white-color);
	}

	option {
		background-color: var(--area-color);
		height: 4rem;
		padding: 0.5rem;
	}

	select {
		cursor: pointer;
		padding: 1rem;
		-webkit-appearance: none;
		-moz-appearance: none;
	}

	select:hover {
		color: var(--placeholder-color);
	}

	input {
		width: 100%;
		padding: 1rem;
	}

	input::placeholder {
		color: var(--focus-color);
	}
	input:hover::placeholder {
		color: var(--placeholder-color);
	}
</style>
