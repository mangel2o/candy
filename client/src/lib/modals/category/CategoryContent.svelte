<script>
	export let category;
</script>

<template>
	<div class="container">
		<div class="row">
			<div class="field">
				<span class="tag">Nombre de la categoria</span>
				<input type="text" bind:value={category.name} placeholder="Nombre de la categoria" />
			</div>
		</div>
		<div class="row">
			<div class="field">
				<span class="tag">Descripción</span>
				<textarea bind:value={category.description} placeholder="Descripción de la categoria" />
			</div>
		</div>
	</div>
</template>

<style>
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
