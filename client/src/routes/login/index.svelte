<script>
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';
	import Check from '$lib/icons/check.svelte';
	import { onMount } from 'svelte';
	import { userStore } from '$lib/stores';
	import ErrorToast from '$lib/components/ErrorToast.svelte';
	import { requester } from '$lib/fetcher';

	// let checked = false;
	const [request, loading, err, data] = requester();

	let user = {
		identificator: '',
		password: ''
	};

	function handleSubmit() {
		const formData = new FormData();
		Object.keys(user).forEach((key) => formData.append(key, user[key]));

		request(
			{
				url: `http://localhost:4000/login`,
				method: 'post',
				data: formData
			},
			{
				finalize: ({ data }) => {
					const userData = ({ password, ...data }) => data;
					$userStore = userData(data);

					setTimeout(() => {
						goto('/');
					}, 1000);
				}
			}
		);
	}

	$: setTimeout(() => {
		if ($userStore) {
			goto('/');
		}
	}, 1000);
</script>

<svelte:head>
	<title>Iniciar sesión • Tecmilenio</title>
</svelte:head>

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

			{#if $err}
				<ErrorToast bind:error={$err} />
			{/if}

			<!-- <div class="options-container">
					<label for="check">
						<span><Icon src={Check} isCheckbox={true} isChecked={checked} /></span>
						Recuerdame
						<input bind:checked type="checkbox" id="check" />
					</label>
					<a href="/login/forgot-password">¿Olvidaste tu contraseña?</a>
				</div> -->

			<button type="submit">
				{#if $loading}
					Loading...
				{:else}
					Iniciar sesión
				{/if}
			</button>
		</form>
	{/if}
</div>

<style>
	div.input-field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;
	}
	span {
		color: var(--focus-color);
	}
	div.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: var(--area-color);
		width: 30rem;
		padding: 2.5rem;
		gap: 1.25rem;
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

	/* input[type='checkbox'] {
		opacity: 0;
		width: 0;
	}
	div.options-container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	label {
		display: flex;
		align-items: center;
		cursor: pointer;
		color: var(--placeholder-color);
	}
	label span {
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
	label:hover {
		color: var(--white-color);
	}
	label:hover > * {
		fill: var(--white-color);
	}

	a {
		color: var(--placeholder-color);
	}
	a:hover {
		color: var(--white-color);
	} */
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
