<script>
	import { fade, slide } from 'svelte/transition';
</script>

<div in:fade={{ duration: 200 }} class="container">
	<div class="bouncer">
		<div />
		<div />
		<div />
		<div />
	</div>
</div>

<style>
	.bouncer {
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		width: 100px;
		height: 100px;
	}
	.bouncer div {
		width: 20px;
		height: 20px;
		background: var(--placeholder-color);
		border-radius: 50%;
		animation: bouncer 0.5s cubic-bezier(0.19, 0.57, 0.3, 0.98) infinite alternate;
	}
	.bouncer div:nth-child(2) {
		animation-delay: 0.1s;
		opacity: 0.8;
	}
	.bouncer div:nth-child(3) {
		animation-delay: 0.2s;
		opacity: 0.6;
	}
	.bouncer div:nth-child(4) {
		animation-delay: 0.3s;
		opacity: 0.4;
	}

	@keyframes bouncer {
		from {
			transform: translateY(0);
		}
		to {
			transform: translateY(-100px);
		}
	}
</style>
