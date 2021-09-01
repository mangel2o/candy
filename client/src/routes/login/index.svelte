<script lang="ts">
	import { goto } from '$app/navigation';

	import Icon from '$lib/components/Icon.svelte';
	import Check from '$lib/icons/check.svelte';
	let checked: boolean = false;

	function handleSubmit() {
		console.log('Login submitted');
		goto('/');
	}
</script>

<svelte:head>
	<title>Iniciar sesión • Tecmilenio</title>
</svelte:head>

<template>
	<div class="container">
		<form on:submit|preventDefault={handleSubmit}>
			<img src="/logo_tecmilenio.svg" width="180" alt="Logo Tecmilenio" />
			<span>Inicia sesión con una cuenta de tecmilenio</span>
			<input type="text" placeholder="Usuario" />
			<input type="password" placeholder="Contraseña" />
			<div class="options-container">
				<label for="check">
					<span><Icon src={Check} isCheckbox={true} isChecked={checked} /></span>
					Recuerdame
					<input bind:checked type="checkbox" id="check" />
				</label>
				<a href="/login/forgot-password">¿Olvidaste tu contraseña?</a>
			</div>

			<button type="submit"> Iniciar sesión </button>
		</form>
	</div>
</template>

<style lang="scss">
	div.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;

		form {
			display: flex;
			flex-direction: column;
			align-items: center;
			background: var(--area-color);
			width: 30rem;
			padding: 2.5rem;
			gap: 1.25rem;

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

				&[type='checkbox'] {
					opacity: 0;
					width: 0;
				}
			}

			div.options-container {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 100%;

				label {
					display: flex;
					align-items: center;
					cursor: pointer;
					color: var(--placeholder-color);

					span {
						height: 2rem;
						width: 2rem;
						border-radius: 0.25rem;
						margin-right: 1rem;
						background-color: var(--input-color);
						border-color: var(--border-color);
						cursor: pointer;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					&:hover {
						color: var(--white-color);

						& > * {
							fill: var(--white-color);
						}
					}
				}

				a {
					color: var(--placeholder-color);
					&:hover {
						color: var(--white-color);
					}
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
	}
</style>
