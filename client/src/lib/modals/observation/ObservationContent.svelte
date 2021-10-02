<script>
	export let observation;
</script>

<div class="container">
	<div class="row">
		<div class="field">
			<span class="tag">Nombre de la observación</span>
			<input type="text" bind:value={observation.name} placeholder="Nombre de la observación" />
		</div>
	</div>
	<div class="row">
		<div class="field">
			<span class="tag">Comentario</span>
			<textarea bind:value={observation.comment} placeholder="Comentario de la observación" />
		</div>
	</div>
</div>

<style lang="scss">
	div.container {
		width: 38rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	div.row {
		display: flex;
		width: 100%;
		gap: 1rem;
	}

	div.field {
		display: flex;
		flex-direction: column;
		width: 100%;
		gap: 0.5rem;
	}

	span.tag {
		color: var(--focus-color);
	}

	textarea {
		color: var(--white-color);
		padding: 1rem;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		width: 100%;
		height: 200px;
		resize: none;
	}
	textarea:hover {
		border: 2px solid var(--blue-color);
	}
	textarea:hover::placeholder {
		color: var(--placeholder-color);
	}

	textarea:focus {
		border: 2px solid var(--green-color);
	}

	textarea::placeholder {
		color: var(--focus-color);
	}

	input {
		padding: 14px;
		width: 100%;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
	}
	input:hover {
		border: 2px solid var(--blue-color);
	}
	input:hover::placeholder {
		color: var(--placeholder-color);
	}

	input:focus {
		border: 2px solid var(--green-color);
	}

	input::placeholder {
		color: var(--focus-color);
	}
</style>
