<script>
	export let user;
</script>

<div class="info">
	<div class="row">
		<div class="field">
			<span>Nombre</span>
			<span class="value name">{user.name}</span>
		</div>
		<div class="field ">
			<span>Matricula</span>
			<span class="value">{user.number}</span>
		</div>
	</div>
	<div class="row">
		<div class="field ">
			<span>Genero</span>
			<span class="value">{user.genre}</span>
		</div>
		<div class="field ">
			<span>Estatus</span>
			<span class="value">{user.active}</span>
		</div>

		<div class="field ">
			<span>Campus</span>
			<span class="value">{user.campus}</span>
		</div>
	</div>
	<div class="row space-between">
		<div class="group">
			<div class="field ">
				<span>Telefono</span>
				<span class="value">{user.phone}</span>
			</div>
			<div class="field ">
				<span>Correo personal</span>
				<span class="value">{user.personalEmail}</span>
			</div>
		</div>

		<div class="field ">
			<span class={'rol ' + user.role.toLowerCase()}>{user.role}</span>
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

	span.rol {
		color: var(--white-color);
		border: 2px dashed var(--focus-color);
		padding: 1rem;
		border-radius: 0.5rem;
	}

	span.moderador {
		border: 2px dashed var(--blue-color);
	}
	span.administrador {
		border: 2px dashed var(--green-color);
	}

	span.name {
		max-width: 16rem;
	}
</style>
