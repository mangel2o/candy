<script>
	export let student;
</script>

<div class="info">
	<div class="row">
		<div class="field">
			<span>Nombre</span>
			<span class="value name">{student.name}</span>
		</div>
		<div class="field ">
			<span>Matricula</span>
			<span class="value">{student.number}</span>
		</div>
		<div class="field ">
			<span>Genero</span>
			<span class="value">{student.genre}</span>
		</div>
		<div class="field ">
			<span>Estatus</span>
			<span class="value">{student.active}</span>
		</div>
		<div class="field ">
			<span>Nivel</span>
			<span class="value">{student.level}</span>
		</div>
		<div class="field ">
			<span>Campus</span>
			<span class="value">{student.campus}</span>
		</div>
	</div>
	<div class="row">
		<div class="field ">
			<span>Carrera</span>
			<span class="value">
				{student.career}
			</span>
		</div>
		<div class="field ">
			<span>Modalidad</span>
			<span class="value">{student.modality}</span>
		</div>
	</div>
	<div class="row space-between">
		<div class="group">
			<div class="field ">
				<span>Telefono</span>
				<span class="value">{student.phone}</span>
			</div>
			<div class="field ">
				<span>Correo personal</span>
				<span class="value">{student.personalEmail}</span>
			</div>
			<div class="field ">
				<span>Terminación</span>
				<span class="value">{student.terminationPeriod} {student.terminationYear}</span>
			</div>
			<div class="field ">
				<span>Graduación</span>
				<span class="value">{student.graduationPeriod} {student.graduationYear}</span>
			</div>
		</div>

		<div class="field ">
			<span class={'status ' + student.status.toLowerCase()}>{student.status}</span>
		</div>
	</div>
</div>

<style lang="scss">
	div.info {
		background-color: var(--area-color);
		border: 2px solid var(--border-color);
	}

	div.info {
		flex-grow: 1;
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		overflow-wrap: normal;
	}

	div.row {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		gap: 2rem;
	}

	div.space-between {
		justify-content: space-between;
	}

	div.group {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
	}

	div.field {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.5rem;
	}

	span {
		color: var(--focus-color);
	}

	span.value {
		color: var(--white-color);
	}

	span.status {
		color: var(--white-color);
		border: 2px dashed var(--green-color);
		padding: 1rem;
		border-radius: 0.5rem;
	}

	span.vacio {
		border: 2px dashed var(--focus-color);
	}
	span.completo {
		border: 2px dashed var(--green-color);
	}
	span.pendiente {
		border: 2px dashed var(--yellow-color);
	}
	span.incompleto {
		border: 2px dashed var(--red-color);
	}
	span.retenido {
		border: 2px dashed var(--blue-color);
	}

	span.name {
		max-width: 16rem;
	}
</style>
