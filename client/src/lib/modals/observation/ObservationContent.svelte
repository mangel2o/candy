<script lang="ts">
	export let observation;
</script>

<template>
	<div class="container">
		<div class="row">
			<div class="field">
				<span class="tag">Nombre de la observación</span>
				<input type="text" bind:value={observation.name} placeholder="Nombre de la observación" />
			</div>
		</div>
		<div class="row">
			<div class="field">
				<span class="tag">Comentario</span>
				<textarea bind:value={observation.comment} placeholder="Comentario de la observación" />
			</div>
		</div>
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

	input {
		padding: 14px;
		width: 100%;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);

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
