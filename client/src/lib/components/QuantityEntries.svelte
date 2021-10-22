<script>
	export let students;

	$: if (students.entries < 0) {
		students.entries = 0;
	} else if (students.entries > students.limit) {
		students.entries = students.limit;
	}
</script>

<label for="quantity">
	Mostrar
	<input bind:value={students.entries} id="quantity" type="number" min="1" max={students.limit} />
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
		width: 7rem;
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
