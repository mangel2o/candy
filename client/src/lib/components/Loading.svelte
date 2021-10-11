<script>
	import { fade, slide } from 'svelte/transition';
</script>

<span in:fade={{ duration: 200 }} />

<style>
	span {
		/* Spinner size and color */
		width: 1.125rem;
		height: 1.125rem;
		border-top-color: var(--white-color);
		border-left-color: var(--placeholder-color);

		/* Additional spinner styles */
		animation: spinner 0.6s linear infinite;
		border-bottom-color: transparent;
		border-right-color: transparent;
		border-style: solid;
		border-width: 2px;
		border-radius: 50%;
		box-sizing: border-box;
		display: inline-block;
		vertical-align: middle;
	}

	/* Animation styles */
	@keyframes spinner {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
