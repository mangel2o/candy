<script>
	export let actionsEntries = 1;

	$: if (actionsEntries < 0) {
		actionsEntries = 0;
	} else if (actionsEntries > 100) {
		actionsEntries = 100;
	}
</script>

<label for="quantity">
	Mostrar
	<input bind:value={actionsEntries} id="quantity" type="number" min={1} max={100} />
	Entradas
</label>

<style>
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
		width: 9rem;
	}

	input::placeholder {
		color: var(--focus-color);
	}

	input:hover {
		border: 2px solid var(--blue-color);
	}
	input:focus {
		border: 2px solid var(--green-color);
	}
</style>
