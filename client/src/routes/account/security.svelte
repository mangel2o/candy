<script>
	import ErrorToast from '$lib/components/ErrorToast.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Loading from '$lib/components/Loading.svelte';
	import SuccessToast from '$lib/components/SuccessToast.svelte';
	import { requester } from '$lib/fetcher';
	import Lock from '$lib/icons/lock.svelte';
	import { userStore } from '$lib/stores';

	let oldPassword;
	let newPassword;
	let confirmPassword;
	const [request, loading, err, data] = requester();

	function handleCancel() {
		oldPassword = '';
		newPassword = '';
		confirmPassword = '';
		$err = null;
		$data = null;
	}

	function handleSubmit() {
		if (newPassword !== confirmPassword)
			return ($err = 'La contraseña nueva no coincide con la confirmación de contraseña');

		const formData = new FormData();
		formData.append('userId', $userStore._id);
		formData.append('oldPassword', oldPassword);
		formData.append('newPassword', newPassword);
		formData.append('confirmPassword', confirmPassword);

		request(
			{
				url: `http://localhost:4000/account/security/password`,
				method: 'put',
				data: formData
			},
			{
				finalize: () => {
					oldPassword = '';
					newPassword = '';
					confirmPassword = '';
					$err = null;
				}
			}
		);
	}
</script>

<div class="container">
	<div class="title">
		<div class="icon"><Icon src={Lock} size={'28'} /></div>
		<div>Cambiar contraseña</div>
	</div>
	<form on:submit|preventDefault={handleSubmit} class="content">
		<div class="field">
			<span>Contraseña antigua</span>
			<input required type="password" bind:value={oldPassword} />
		</div>
		<div class="field">
			<span>Contraseña nueva</span>
			<input required type="password" bind:value={newPassword} />
		</div>
		<div class="field">
			<span>Confirmar contraseña nueva</span>
			<input required type="password" bind:value={confirmPassword} />
		</div>
		{#if $err}
			<ErrorToast bind:error={$err} />
		{/if}
		{#if $data?.success}
			<SuccessToast bind:successMessage={$data.success} />
		{/if}
		<div class="buttons">
			<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
			<button class="submit" type="submit">
				{#if $loading}
					<Loading />
				{:else}
					Cambiar
				{/if}
			</button>
		</div>
	</form>
</div>

<style>
	div.container {
		overflow-wrap: anywhere;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		width: 100%;
		padding: 1rem;
	}

	div.title {
		display: flex;
		gap: 0.5rem;
		font-size: 1.2rem;
	}

	form.content {
		display: flex;
		flex-flow: column;
		gap: 1rem;
	}

	span {
		color: var(--focus-color);
	}
	div.field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	div.buttons {
		display: flex;
		gap: 1rem;
	}

	button.submit {
		width: 100%;
		padding: 1rem;
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
		padding: 1rem;
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

	input {
		color: var(--white-color);
		padding: 0.5rem;
		background-color: var(--background-color);
		border: 2px solid var(--border-color);
		width: 100%;
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
