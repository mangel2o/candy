<script lang="ts">
</script>

<svelte:head>
	<title>Reestablecer contraseña • Tecmilenio</title>
</svelte:head>

<template>
	<div class="container">
		<form>
			<img src="/logo_tecmilenio.svg" width="180" alt="Logo Tecmilenio" />
			<span>Restablece tu contraseña</span>
			<input type="password" placeholder="Nueva contraseña" />
			<input type="password" placeholder="Confirmar contraseña" />
			<button type="submit">Restablecer</button>
		</form>
	</div>
</template>

<style lang="scss">
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

		input {
			width: 100%;
			padding: 1rem;
			outline: none;
			background-color: var(--input-color);
			border: 2px solid var(--border-color);
			color: var(--white-color);
			&::placeholder {
				color: var(--focus-color);
			}

			&:focus {
				border: 2px solid var(--blue-color);
			}

			&:hover::placeholder {
				color: var(--placeholder-color);
			}
		}

		button {
			width: 100%;
			padding: 1rem;
			background-color: var(--darker-green-color);
			border-color: var(--green-color);
			color: var(--white-color);

			&:hover {
				background-color: var(--green-color);
			}

			&:active {
				background-color: var(--darker-green-color);
			}
		}
	}
</style>
