<script>
	export let template;
	let files;

	$: if (files) {
		template.example = files[0];
		files = null;
	}
</script>

<div class="container">
	<div class="row">
		<div class="field">
			<span class="tag">Nombre del documento</span>
			<input required type="text" bind:value={template.name} placeholder="Nombre del documento" />
		</div>
	</div>
	<div class="row">
		<div class="field">
			<span class="tag">Descripción</span>
			<textarea
				required
				bind:value={template.description}
				placeholder="Descripción del documento"
			/>
		</div>
	</div>
	<div class="row">
		<div class="field">
			<span class="tag">Documento de ejemplo</span>
			<label class={template.example ? 'uploaded' : 'not-uploaded'}>
				<input required={template.example ? false : true} name="file" type="file" bind:files />
				{#if template.example}
					<span>{template.example.name}</span>
				{:else}
					<span>Busca un archivo PDF</span>
					<span>o arrastralo aqui</span>
				{/if}
			</label>
		</div>
	</div>
</div>

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

	label {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		text-align: center;
		padding: 1rem;
		width: 100%;
		gap: 0.25rem;

		background-color: var(--input-color);
		border: 2px solid var(--border-color);

		font-size: 20px;
		font-weight: bold;
	}
	label:hover {
		border: 2px solid var(--blue-color);
		color: var(--placeholder-color);
	}
	label.uploaded {
		border: 2px solid var(--green-color);
	}

	label.not-uploaded {
		border: 2px solid var(--red-color);
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

	input[type='file'] {
		display: none;
	}
</style>
