<script>
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import FileExcel from '$lib/icons/file-excel.svelte';
	import Loading from '$lib/components/Loading.svelte';

	let files;
	let isOpen = false;
	let isPending = false;

	function handleSubmit() {
		console.log('Excel subido');
	}

	function handleCancel() {
		files = null;
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<!--Button-->
	<button class="create" slot="trigger" let:open on:click={open}>
		<Icon src={FileExcel} />
		<span>Excel</span>
	</button>

	<!--Header-->
	<span slot="header">Crear candidatos con Excel</span>

	<!--Content-->
	<form on:submit|preventDefault={handleSubmit} slot="content">
		<label class={files ? 'uploaded' : 'not-uploaded'}>
			<input required type="file" bind:files accept=".xlsx" />
			<Icon src={FileExcel} size={'80'} />
			{#if !files}
				<span class="upper-text">Busca un archivo Excel</span>
				<span class="lower-text">o arrastralo aqui</span>
			{:else}
				<span class="upper-text">Archivo seleccionado</span>
				{#each files as file}
					<span class="lower-text">{file.name}</span>
				{/each}
			{/if}
		</label>
		<div>
			<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
			<button class="submit" type="submit">
				{#if isPending}
					<Loading />
				{:else}
					Editar
				{/if}
			</button>
		</div>
	</form>
</Modal>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	span.upper-text {
		font-size: 20px;
		font-weight: bold;
	}

	span.lower-text {
		font-size: 18px;
	}

	div {
		display: flex;
		gap: 1rem;
	}

	button {
		padding: 1rem;
	}
	button.create {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 14px;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
	}
	button.create:hover {
		border: 2px solid var(--blue-color);
	}
	button.create:focus {
		border: 2px solid var(--green-color);
	}
	button.create:active {
		border: 2px solid var(--blue-color);
	}

	button.submit {
		width: 100%;

		background-color: var(--darker-green-color);
		border: 2px solid var(--green-color);
		cursor: pointer;
	}
	button.submit:hover {
		background: var(--green-color);
	}

	button.submit:active {
		background-color: var(--darker-green-color);
	}

	button.cancel {
		width: 100%;

		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		cursor: pointer;
	}
	button.cancel:hover {
		background: var(--area-color);
	}

	button.cancel:active {
		background-color: var(--input-color);
	}

	label {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		width: 500px;
		height: 250px;
		gap: 0.5rem;

		background-color: var(--input-color);
		border: 2px solid var(--border-color);
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
		display: none;
	}
</style>
