<script>
	function handleSubmit() {
		console.log('Restore password submitted');
	}
</script>

<svelte:head>
	<title>Reestablecer contraseña • Tecmilenio</title>
</svelte:head>

<div class="container">
	<form on:submit|preventDefault={handleSubmit}>
		<img src="/logo_tecmilenio.svg" width="180" alt="Logo Tecmilenio" />
		<span>Restablece tu contraseña</span>
		<input type="password" placeholder="Nueva contraseña" />
		<input type="password" placeholder="Confirmar contraseña" />
		<button type="submit">Restablecer</button>
	</form>
</div>

<style>
	div.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}

	form {
		display: flex;
		flex-flow: column;
		align-items: center;
		background: var(--area-color);
		color: var(--white-color);
		padding: 40px;
		width: 480px;
		gap: 20px;
	}
	input {
		width: 100%;
		padding: 1rem;
		outline: none;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		color: var(--white-color);
	}
	input::placeholder {
		color: var(--focus-color);
	}

	input:focus {
		border: 2px solid var(--blue-color);
	}

	input:hover::placeholder {
		color: var(--placeholder-color);
	}

	button {
		width: 100%;
		padding: 1rem;
		background-color: var(--darker-green-color);
		border-color: var(--green-color);
		color: var(--white-color);
	}
	button:hover {
		background-color: var(--green-color);
	}

	button:active {
		background-color: var(--darker-green-color);
	}
</style>
