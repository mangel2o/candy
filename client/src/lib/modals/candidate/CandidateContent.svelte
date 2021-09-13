<script lang="ts">
	import { getContext } from 'svelte';
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

	let categories: Array<any> = getContext('categories');
	export let candidate;
	export let isCategoriesEmpty;

	$: if (candidate.categories.length > 0) {
		isCategoriesEmpty = false;
	}
</script>

<template>
	<div class="container">
		<!--Row 1-->
		<div class="row">
			<div class="field width-75">
				<span>Nombre</span>
				<input required type="text" bind:value={candidate.name} placeholder="Escribe un nombre" />
			</div>

			<div class="field width-25">
				<span>Matricula</span>
				<input
					required
					type="text"
					bind:value={candidate.number}
					placeholder="Escribe una matricula"
				/>
			</div>
		</div>

		<!--Row 2-->
		<div class="row">
			<div class="field width-25">
				<span>Nivel</span>
				<select required bind:value={candidate.level} on:change={() => (candidate.career = '')}>
					<option disabled selected value> Selecciona una opción </option>
					{#each levels as level}
						<option value={level}>{level}</option>
					{/each}
				</select>
			</div>

			<div class="field width-25">
				<span>Campus</span>
				<select required bind:value={candidate.campus}>
					<option disabled selected value> Selecciona un campus </option>
					{#each campuses as campus}
						<option value={campus}>{campus}</option>
					{/each}
				</select>
			</div>

			<div class="field width-25">
				<span>Genero</span>
				<select required bind:value={candidate.genre}>
					<option disabled selected value> Selecciona un genero </option>
					<option value="Hombre">Hombre</option>
					<option value="Mujer">Mujer</option>
				</select>
			</div>

			<div class="field width-25">
				<span>Estatus</span>
				<select required bind:value={candidate.active}>
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
				{#if candidate.level === 'Bachillerato'}
					<select bind:value={candidate.career}>
						<option disabled selected value> No aplica </option>
					</select>
				{:else}
					<select required bind:value={candidate.career}>
						{#if candidate.level === '' || candidate.level === undefined}
							<option disabled selected value> Selecciona un nivel </option>
						{:else if candidate.level === 'Profesional'}
							<option disabled selected value> Selecciona una carrera profesional </option>
							{#each careersProfesional as career}
								<option value={career}>{career}</option>
							{/each}
						{:else if candidate.level === 'Ejecutivo'}
							<option disabled selected value> Selecciona una carrera ejecutiva </option>
							{#each careersEjecutive as career}
								<option value={career}>{career}</option>
							{/each}
						{:else if candidate.level === 'Maestria'}
							<option disabled selected value> Selecciona una maestria </option>
							{#each careersMaster as career}
								<option value={career}>{career}</option>
							{/each}
						{:else if candidate.level === 'Especialidad'}
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
				<input
					required
					type="text"
					bind:value={candidate.phone}
					placeholder="Escribe un telefono"
				/>
			</div>

			<div class="field width-75">
				<span>Correo personal</span>
				<input
					required
					type="email"
					placeholder="Escribe un correo personal"
					bind:value={candidate.email}
				/>
			</div>
		</div>

		<!--Row 5-->
		<div class="row">
			<div class="field width-30">
				<span>Modalidad</span>
				<select required bind:value={candidate.modality}>
					<option disabled selected value> Selecciona una modalidad </option>
					{#each modalities as modality}
						<option value={modality}>{modality}</option>
					{/each}
				</select>
			</div>

			<div class="field width-35">
				<span>Periodo de terminación</span>
				<div class="width-100">
					<select required class="width-75" bind:value={candidate.terminationPeriod}>
						<option disabled selected value> Selecciona un periodo </option>
						{#each periods as period}
							<option value={period}>{period}</option>
						{/each}
					</select>
					<select required class="width-25" bind:value={candidate.terminationYear}>
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
					<select required class="width-75" bind:value={candidate.graduationPeriod}>
						<option disabled selected value> Selecciona un periodo </option>
						{#each periods as period}
							<option value={period}>{period}</option>
						{/each}
					</select>
					<select required class="width-25" bind:value={candidate.graduationYear}>
						<option disabled selected value> Año </option>
						{#each years as year}
							<option value={year}>{year}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>

		<!--Row 6-->
		<div class="row">
			<div class="field">
				<span>Categorias de documentos</span>
				<div class="categories">
					{#each categories as category}
						<div class="category">
							<input
								type="checkbox"
								id={category.name}
								bind:group={candidate.categories}
								value={category.name}
							/>
							<label for={category.name}>
								{category.name}
							</label>
						</div>
					{/each}
				</div>
				{#if isCategoriesEmpty}
					<span class="warning">
						Debes seleccionar al menos una categoria para crear al candidato
					</span>
				{/if}
			</div>
		</div>
	</div>
</template>

<style lang="scss">
	span {
		color: var(--focus-color);

		&.warning {
			color: var(--orange-color);
		}
	}

	div {
		&.container {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			width: 62rem;
		}

		&.row {
			display: flex;
			width: 100%;
			gap: 1rem;
		}

		&.field {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		&.categories {
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
	}

	input,
	select {
		color: var(--white-color);
		padding: 0.5rem;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		width: 100%;

		&:hover {
			border: 2px solid var(--blue-color);

			&::placeholder {
				color: var(--placeholder-color);
			}
		}

		&:focus {
			border: 2px solid var(--green-color);
		}

		&::placeholder {
			color: var(--focus-color);
		}
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

		&:hover {
			border: 2px solid var(--blue-color);
		}
	}

	input[type='checkbox'] {
		opacity: 0;
		position: absolute;
	}

	input[type='checkbox']:checked + label {
		border: 2px solid var(--green-color);
	}
</style>
