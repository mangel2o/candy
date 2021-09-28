<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';
	import Check from '$lib/icons/check.svelte';
	import { onMount } from 'svelte';
	import { userStore } from '$lib/stores';
	import ErrorToast from '$lib/components/ErrorToast.svelte';

	let checked = false;
	let isPending = false;
	let error = null;

	let user = {
		identificator: '',
		password: ''
	};

	function handleSubmit() {
		isPending = true;
		const formData = new FormData();
		Object.keys(user).forEach((key) => formData.append(key, user[key]));

		fetch(`http://localhost:4000/login/`, {
			method: 'POST',
			body: formData
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error('Parece que algo salio mal');
				}
			})
			.then((data) => {
				if (data.error) {
					error = data.error;
					isPending = false;
					return;
				}
				const userData = ({ password, ...data }) => data;
				$userStore = userData(data);
				isPending = false;

				setTimeout(() => {
					goto('/');
				}, 1000);
			})
			.catch((err) => {
				error = err.message;
				isPending = false;
			});
	}

	onMount(() => {
		setTimeout(() => {
			if ($userStore) {
				goto('/');
			}
		}, 1000);
	});
</script>

<svelte:head>
	<title>Iniciar sesión • Tecmilenio</title>
</svelte:head>

<template>
	<div class="container">
		{#if $userStore}
			<form>
				<span>Redireccionando...</span>
			</form>
		{:else}
			<form on:submit|preventDefault={handleSubmit}>
				<img src="/logo_tecmilenio.svg" width="180" alt="Logo Tecmilenio" />
				<span>Inicia sesión con una cuenta de tecmilenio</span>

				<div class="input-field">
					<span>Identificador</span>
					<input required bind:value={user.identificator} type="text" placeholder="Identificador" />
				</div>
				<div class="input-field">
					<span>Contraseña</span>
					<input required bind:value={user.password} type="password" placeholder="Contraseña" />
				</div>

				{#if error}
					<ErrorToast bind:error />
				{/if}

				{#if false}
					<div class="options-container">
						<label for="check">
							<span><Icon src={Check} isCheckbox={true} isChecked={checked} /></span>
							Recuerdame
							<input bind:checked type="checkbox" id="check" />
						</label>
						<a href="/login/forgot-password">¿Olvidaste tu contraseña?</a>
					</div>
				{/if}

				<button type="submit">
					{#if isPending}
						Loading...
					{:else}
						Iniciar sesión
					{/if}
				</button>
			</form>
		{/if}
	</div>
</template>

<style lang="scss">
	div.input-field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;

		span {
			color: var(--focus-color);
		}
	}

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
