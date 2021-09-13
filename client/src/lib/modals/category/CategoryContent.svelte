<script lang="ts">
	export let category;
	export let errorCategory;
</script>

<template>
	<div class="container">
		<div class="row">
			<div class="field">
				<span class="tag">Nombre de la categoria</span>
				<input type="text" bind:value={category.name} placeholder="Nombre de la categoria" />
				{#if errorCategory}
					<span class="warning">
						{errorCategory}
					</span>
				{/if}
			</div>
		</div>
		<div class="row">
			<div class="field">
				<span class="tag">Descripción</span>
				<textarea bind:value={category.description} placeholder="Descripción de la categoria" />
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

		&.warning {
			color: var(--orange-color);
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
