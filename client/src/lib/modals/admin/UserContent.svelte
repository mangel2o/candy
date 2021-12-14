<script>
	import { campuses, roles } from '$lib/data';

	export let user;
</script>

<div class="container">
	<!--Row 1-->
	<div class="row">
		<div class="field width-100">
			<span>Nombre</span>
			<input required type="text" bind:value={user.name} placeholder="Escribe un nombre" />
		</div>
	</div>
	<div class="row">
		<div class="field width-100">
			<span>Matricula</span>
			<input required type="number" bind:value={user.number} placeholder="Escribe una matricula" />
		</div>
		<div class="field width-100">
			<span>Rol de autoridad</span>
			<select required bind:value={user.role}>
				<option disabled selected value> Selecciona un rol </option>
				{#each roles as role}
					<option value={role}>{role}</option>
				{/each}
			</select>
		</div>
	</div>

	<!--Row 2-->
	<div class="row">
		<div class="field width-100">
			<span>Campus</span>
			<select required bind:value={user.campus}>
				<option disabled selected value> Selecciona un campus </option>
				{#each campuses as campus}
					<option value={campus}>{campus}</option>
				{/each}
			</select>
		</div>

		<div class="field width-100">
			<span>Genero</span>
			<select required bind:value={user.genre}>
				<option disabled selected value> Selecciona un genero </option>
				<option value="Hombre">Hombre</option>
				<option value="Mujer">Mujer</option>
			</select>
		</div>
	</div>

	<!--Row 2-->
	<div class="row">
		<div class="field width-100">
			<span>Estatus</span>
			<select required bind:value={user.active}>
				<option disabled selected value> Selecciona un estatus </option>
				<option value="Activo">Activo</option>
				<option value="Inactivo">Inactivo</option>
			</select>
		</div>
		<div class="field width-100">
			<span>Telefono</span>
			<input required type="tel" bind:value={user.phone} placeholder="Escribe un telefono" />
		</div>
	</div>

	<!--Row 4-->
	<div class="row">
		<div class="field width-100">
			<span>Correo personal</span>
			<input
				required
				type="email"
				placeholder="Escribe un correo personal"
				bind:value={user.personalEmail}
			/>
		</div>
	</div>
</div>

<style lang="scss">
	span {
		color: var(--focus-color);
	}

	div.container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 40rem;
	}

	div.row {
		display: flex;
		width: 100%;
		gap: 1rem;
	}

	div.field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.width-100 {
		display: flex;
		width: 100%;
	}

	input,
	select {
		color: var(--white-color);
		padding: 0.5rem;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		width: 100%;
	}

	input:hover,
	select:hover {
		border: 2px solid var(--blue-color);
	}

	input:hover::placeholder,
	select:hover::placeholder {
		color: var(--placeholder-color);
	}

	input:focus,
	select:focus {
		border: 2px solid var(--green-color);
	}

	input::placeholder,
	select::placeholder {
		color: var(--focus-color);
	}

	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
