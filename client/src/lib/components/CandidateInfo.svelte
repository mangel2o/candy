<script lang="ts">
	export let candidate;
</script>

<template>
	<div class="row">
		<div class="field">
			<span>Nombre</span>
			<span class="value name">{candidate.name}</span>
		</div>
		<div class="field ">
			<span>Matricula</span>
			<span class="value">{candidate.number}</span>
		</div>
		<div class="field ">
			<span>Genero</span>
			<span class="value">{candidate.genre}</span>
		</div>
		<div class="field ">
			<span>Estatus</span>
			<span class="value">{candidate.active}</span>
		</div>
		<div class="field ">
			<span>Nivel</span>
			<span class="value">{candidate.level}</span>
		</div>
		<div class="field ">
			<span>Campus</span>
			<span class="value">{candidate.campus}</span>
		</div>
	</div>
	<div class="row">
		<div class="field ">
			<span>Carrera</span>
			<span class="value">
				{candidate.career}
			</span>
		</div>
		<div class="field ">
			<span>Modalidad</span>
			<span class="value">{candidate.modality}</span>
		</div>
	</div>
	<div class="row space-between">
		<div class="group">
			<div class="field ">
				<span>Telefono</span>
				<span class="value">{candidate.phone}</span>
			</div>
			<div class="field ">
				<span>Correo personal</span>
				<span class="value">{candidate.personalEmail}</span>
			</div>
			<div class="field ">
				<span>Terminación</span>
				<span class="value">{candidate.terminationPeriod} {candidate.terminationYear}</span>
			</div>
			<div class="field ">
				<span>Graduación</span>
				<span class="value">{candidate.graduationPeriod} {candidate.graduationYear}</span>
			</div>
		</div>

		<div class="field ">
			<span class={'status ' + candidate.status.toLowerCase()}>{candidate.status}</span>
		</div>
	</div>
</template>

<style lang="scss">
	div {
		&.row {
			display: flex;
			flex-wrap: wrap;
			width: 100%;
			gap: 2rem;
		}

		&.space-between {
			justify-content: space-between;
		}

		&.group {
			display: flex;
			flex-wrap: wrap;
			gap: 2rem;
		}

		&.field {
			display: flex;
			flex-direction: column;
			justify-content: center;
			gap: 0.5rem;
		}
	}

	span {
		color: var(--focus-color);

		&.value {
			color: var(--white-color);
		}

		&.status {
			color: var(--white-color);
			border: 2px dashed var(--green-color);
			padding: 1rem;
			border-radius: 0.5rem;
		}

		&.vacio {
			border: 2px dashed var(--focus-color);
		}
		&.completo {
			border: 2px dashed var(--green-color);
		}
		&.pendiente {
			border: 2px dashed var(--yellow-color);
		}
		&.incompleto {
			border: 2px dashed var(--red-color);
		}
		&.retenido {
			border: 2px dashed var(--blue-color);
		}

		&.name {
			max-width: 16rem;
		}
	}
</style>
