<script>
	let isEmailSent = false;

	function handleSubmit() {
		console.log('Forgot password submitted');
		isEmailSent = true;
	}
</script>

<svelte:head>
	<title>Recuperar contraseña • Tecmilenio</title>
</svelte:head>

<div class="container">
	<form on:submit|preventDefault={handleSubmit}>
		{#if !isEmailSent}
			<img src="/logo_tecmilenio.svg" width="180" alt="Logo Tecmilenio" />
			<span>¿Olvidaste tu contraseña?</span>
			<span class="gray-text">
				Ingresa tu correo institucional. Recibiras un correo electrónico con instrucciones sobre
				cómo restablecer tu contraseña
			</span>
			<input type="text" placeholder="Correo institucional" />
			<button type="submit">Enviar correo</button>
			<span class="gray-text">
				¿Recuerdas tu contraseña?
				<a href="/login">Iniciar sesión</a>
			</span>
		{:else}
			<img src="/logo_tecmilenio.svg" width="180" alt="Logo Tecmilenio" />
			<span>¡Correo electrónico enviado!</span>
			<span class="gray-text">
				Se ha enviado un correo electrónico a tu dirección con instrucciones sobre cómo restablecer
				tu contraseña. Si no lo recibes en unos minutos, verifica que hayas utilizado la dirección
				de correo electrónico de tu cuenta de Tecmilenio y vuelve a intentarlo, o contactanos para
				obtener ayuda.
			</span>
			<button on:click={() => (isEmailSent = false)} type="button">Volver a intentarlo</button>
			<span class="gray-text">
				¿Recuerdas tu contraseña?
				<a href="/login">Iniciar sesión</a>
			</span>
		{/if}
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
		padding: 2.5rem;
		width: 30rem;
		gap: 20px;
	}
	span {
		text-align: center;
	}
	span.gray-text {
		color: var(--focus-color);
	}

	a {
		color: var(--placeholder-color);
	}
	a:hover {
		color: var(--white-color);
	}

	input[type='text'] {
		width: 100%;
		padding: 1rem;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
	}
	input[type='text']::placeholder {
		color: var(--focus-color);
	}
	input[type='text']:focus {
		border: 2px solid var(--blue-color);
	}

	input[type='text']:hover::placeholder {
		color: var(--placeholder-color);
	}

	button {
		width: 100%;
		padding: 1rem;
		background-color: var(--darker-green-color);
		border-color: var(--green-color);
	}
	button:hover {
		background-color: var(--green-color);
	}

	button:active {
		background-color: var(--darker-green-color);
	}
</style>
