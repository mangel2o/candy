<script lang="ts">
	export let document;
</script>

<template>
	<div class="container">
		<div class="row">
			<div class="field">
				<span class="tag">Comentario</span>
				<textarea bind:value={document.comment} placeholder="Descripción del documento" />
			</div>
		</div>
		<select required bind:value={document.status}>
			<option disabled selected value> Selecciona una opción </option>
			<option value="Vacio">Vacio</option>
			<option value="Completo">Completo</option>
			<option value="Pendiente">Pendiente</option>
			<option value="Retenido">Retenido</option>
			<option value="Incompleto">Incompleto</option>
		</select>
	</div>
</template>

<style lang="scss">
	div {
		&.container {
			width: 38rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		&.row {
			display: flex;
			width: 100%;
			gap: 1rem;
		}

		&.field {
			display: flex;
			flex-direction: column;
			width: 100%;
			gap: 0.5rem;
		}
	}

	span {
		&.tag {
			color: var(--focus-color);
		}
	}

	textarea {
		color: var(--white-color);
		padding: 1rem;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		width: 100%;
		height: 200px;
		resize: none;

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

	select {
		color: var(--white-color);
		padding: 1rem;
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
</style>
