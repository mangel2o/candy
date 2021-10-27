<script>
	import {
		campuses,
		careersEjecutive,
		careersMaster,
		careersProfesional,
		careersSpecialty,
		levels,
		modalities,
		periods,
		years
	} from '$lib/data';

	export let student;
	export let categories = [];
</script>

<div class="container">
	<!--Row 1-->
	<div class="row">
		<div class="field width-75">
			<span>Nombre</span>
			<input required type="text" bind:value={student.name} placeholder="Escribe un nombre" />
		</div>

		<div class="field width-25">
			<span>Matricula</span>
			<input
				required
				type="number"
				bind:value={student.number}
				placeholder="Escribe una matricula"
			/>
		</div>
	</div>

	<!--Row 2-->
	<div class="row">
		<div class="field width-25">
			<span>Nivel</span>
			<select required bind:value={student.level} on:change={() => (student.career = '')}>
				<option disabled selected value> Selecciona una opción </option>
				{#each levels as level}
					<option value={level}>{level}</option>
				{/each}
			</select>
		</div>

		<div class="field width-25">
			<span>Campus</span>
			<select required bind:value={student.campus}>
				<option disabled selected value> Selecciona un campus </option>
				{#each campuses as campus}
					<option value={campus}>{campus}</option>
				{/each}
			</select>
		</div>

		<div class="field width-25">
			<span>Genero</span>
			<select required bind:value={student.genre}>
				<option disabled selected value> Selecciona un genero </option>
				<option value="Hombre">Hombre</option>
				<option value="Mujer">Mujer</option>
			</select>
		</div>

		<div class="field width-25">
			<span>Estatus</span>
			<select required bind:value={student.active}>
				<option disabled selected value> Selecciona un estatus </option>
				<option value="Activo">Activo</option>
				<option value="Inactivo">Inactivo</option>
			</select>
		</div>
	</div>

	<!--Row 3-->
	<div class="row">
		<div class="field width-100">
			<span>Carrera</span>
			{#if student.level === 'Bachillerato'}
				<select bind:value={student.career}>
					<option disabled selected value> No aplica </option>
				</select>
			{:else}
				<select required bind:value={student.career}>
					{#if student.level === '' || student.level === undefined}
						<option disabled selected value> Selecciona un nivel </option>
					{:else if student.level === 'Profesional'}
						<option disabled selected value> Selecciona una carrera profesional </option>
						{#each careersProfesional as career}
							<option value={career}>{career}</option>
						{/each}
					{:else if student.level === 'Ejecutivo'}
						<option disabled selected value> Selecciona una carrera ejecutiva </option>
						{#each careersEjecutive as career}
							<option value={career}>{career}</option>
						{/each}
					{:else if student.level === 'Maestria'}
						<option disabled selected value> Selecciona una maestria </option>
						{#each careersMaster as career}
							<option value={career}>{career}</option>
						{/each}
					{:else if student.level === 'Especialidad'}
						<option disabled selected value> Selecciona una especialidad </option>
						{#each careersSpecialty as career}
							<option value={career}>{career}</option>
						{/each}
					{/if}
				</select>
			{/if}
		</div>
	</div>

	<!--Row 4-->
	<div class="row">
		<div class="field width-25">
			<span>Telefono</span>
			<input required type="tel" bind:value={student.phone} placeholder="Escribe un telefono" />
		</div>

		<div class="field width-75">
			<span>Correo personal</span>
			<input
				required
				type="email"
				placeholder="Escribe un correo personal"
				bind:value={student.personalEmail}
			/>
		</div>
	</div>

	<!--Row 5-->
	<div class="row">
		<div class="field width-30">
			<span>Modalidad</span>
			<select required bind:value={student.modality}>
				<option disabled selected value> Selecciona una modalidad </option>
				{#each modalities as modality}
					<option value={modality}>{modality}</option>
				{/each}
			</select>
		</div>

		<div class="field width-35">
			<span>Periodo de terminación</span>
			<div class="width-100">
				<select required class="width-75" bind:value={student.terminationPeriod}>
					<option disabled selected value> Selecciona un periodo </option>
					{#each periods as period}
						<option value={period}>{period}</option>
					{/each}
				</select>
				<select required class="width-25" bind:value={student.terminationYear}>
					<option disabled selected value> Año </option>
					{#each years as year}
						<option value={year}>{year}</option>
					{/each}
				</select>
			</div>
		</div>

		<div class="field width-35">
			<span>Periodo de Graduación</span>
			<div class="width-100">
				<select required class="width-75" bind:value={student.graduationPeriod}>
					<option disabled selected value> Selecciona un periodo </option>
					{#each periods as period}
						<option value={period}>{period}</option>
					{/each}
				</select>
				<select required class="width-25" bind:value={student.graduationYear}>
					<option disabled selected value> Año </option>
					{#each years as year}
						<option value={year}>{year}</option>
					{/each}
				</select>
			</div>
		</div>
	</div>

	<!--Row 6-->
	{#if categories.length > 0}
		<div class="row">
			<div class="field">
				<span>Categorias de documentos</span>
				<div class="categories">
					{#if student.newCategories}
						{#each categories as category}
							<div class="category">
								<input
									type="checkbox"
									id={category._id}
									bind:group={student.newCategories}
									value={category._id}
								/>
								<label for={category._id}>
									{category.name}
								</label>
							</div>
						{/each}
					{:else}
						{#each categories as category}
							<div class="category">
								<input
									type="checkbox"
									id={category._id}
									bind:group={student.categories}
									value={category._id}
								/>
								<label for={category._id}>
									{category.name}
								</label>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	span {
		color: var(--focus-color);
	}

	div.container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 62rem;
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

	div.categories {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
	}
	.width-75 {
		width: 75%;
	}

	.width-25 {
		width: 25%;
	}

	.width-30 {
		width: 30%;
	}

	.width-35 {
		width: 35%;
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

	label {
		display: flex;
		flex-direction: row;
		align-items: center;
		cursor: pointer;
		color: var(--placeholder-color);
		background-color: var(--input-color);

		padding: 0.5rem;
		border: 2px solid var(--border-color);
	}

	label:hover {
		border: 2px solid var(--blue-color);
	}

	input[type='checkbox'] {
		opacity: 0;
		position: absolute;
	}

	input[type='checkbox']:focus + label {
		border: 2px solid var(--blue-color);
	}

	input[type='checkbox']:checked + label {
		border: 2px solid var(--green-color);
	}

	input[type='checkbox']:checked + label:focus {
		border: 2px solid var(--green-color);
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
