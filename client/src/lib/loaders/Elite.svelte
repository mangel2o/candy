<div class="dank-ass-loader">
	<div class="row">
		<div class="arrow up outer outer-18" />
		<div class="arrow down outer outer-17" />
		<div class="arrow up outer outer-16" />
		<div class="arrow down outer outer-15" />
		<div class="arrow up outer outer-14" />
	</div>
	<div class="row">
		<div class="arrow up outer outer-1" />
		<div class="arrow down outer outer-2" />
		<div class="arrow up inner inner-6" />
		<div class="arrow down inner inner-5" />
		<div class="arrow up inner inner-4" />
		<div class="arrow down outer outer-13" />
		<div class="arrow up outer outer-12" />
	</div>
	<div class="row">
		<div class="arrow down outer outer-3" />
		<div class="arrow up outer outer-4" />
		<div class="arrow down inner inner-1" />
		<div class="arrow up inner inner-2" />
		<div class="arrow down inner inner-3" />
		<div class="arrow up outer outer-11" />
		<div class="arrow down outer outer-10" />
	</div>
	<div class="row">
		<div class="arrow down outer outer-5" />
		<div class="arrow up outer outer-6" />
		<div class="arrow down outer outer-7" />
		<div class="arrow up outer outer-8" />
		<div class="arrow down outer outer-9" />
	</div>
</div>

<style>
	.dank-ass-loader {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.dank-ass-loader .row {
		display: flex;
	}
	.arrow {
		width: 0;
		height: 0;
		margin: 0 -6px;
		border-left: 12px solid transparent;
		border-right: 12px solid transparent;
		border-bottom: 21.6px solid var(--white-color);
		animation: blink 1s infinite;
	}
	.arrow.down {
		transform: rotate(180deg);
	}
	.arrow.outer-1 {
		animation-delay: -0.0555555556s;
	}
	.arrow.outer-2 {
		animation-delay: -0.1111111111s;
	}
	.arrow.outer-3 {
		animation-delay: -0.1666666667s;
	}
	.arrow.outer-4 {
		animation-delay: -0.2222222222s;
	}
	.arrow.outer-5 {
		animation-delay: -0.2777777778s;
	}
	.arrow.outer-6 {
		animation-delay: -0.3333333333s;
	}
	.arrow.outer-7 {
		animation-delay: -0.3888888889s;
	}
	.arrow.outer-8 {
		animation-delay: -0.4444444444s;
	}
	.arrow.outer-9 {
		animation-delay: -0.5s;
	}
	.arrow.outer-10 {
		animation-delay: -0.5555555556s;
	}
	.arrow.outer-11 {
		animation-delay: -0.6111111111s;
	}
	.arrow.outer-12 {
		animation-delay: -0.6666666667s;
	}
	.arrow.outer-13 {
		animation-delay: -0.7222222222s;
	}
	.arrow.outer-14 {
		animation-delay: -0.7777777778s;
	}
	.arrow.outer-15 {
		animation-delay: -0.8333333333s;
	}
	.arrow.outer-16 {
		animation-delay: -0.8888888889s;
	}
	.arrow.outer-17 {
		animation-delay: -0.9444444444s;
	}
	.arrow.outer-18 {
		animation-delay: -1s;
	}
	.arrow.inner-1 {
		animation-delay: -0.1666666667s;
	}
	.arrow.inner-2 {
		animation-delay: -0.3333333333s;
	}
	.arrow.inner-3 {
		animation-delay: -0.5s;
	}
	.arrow.inner-4 {
		animation-delay: -0.6666666667s;
	}
	.arrow.inner-5 {
		animation-delay: -0.8333333333s;
	}
	.arrow.inner-6 {
		animation-delay: -1s;
	}
	@keyframes blink {
		0% {
			opacity: 0.1;
		}
		30% {
			opacity: 1;
		}
		100% {
			opacity: 0.1;
		}
	}
</style>
