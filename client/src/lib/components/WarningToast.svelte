<script>
</script>

<template>
	<div class="container">
		<div class="warning">
			<span class="tag">ADVERTENCIA: </span>
			<span><slot /></span>
		</div>
	</div>
</template>

<style lang="scss">
	div {
		&.container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			gap: 1rem;
			border: 2px solid var(--yellow-color);
		}

		&.warning {
			display: flex;
			width: 100%;
			gap: 0.5rem;
			padding: 1rem;
		}
	}

	span {
		&.tag {
			color: var(--orange-color);
		}
	}
</style>
