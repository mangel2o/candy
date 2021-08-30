<script lang="ts">
	import Magnify from '$lib/icons/magnify.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import ClickOutside from '$lib/components/ClickOutside.svelte';

	let isFocused = false;
</script>

<!--CLICKING OUTSIDE LOSES FOCUS-->
<ClickOutside on:clickoutside={() => (isFocused = false)}>
	<label for="searchbar" on:click={() => (isFocused = true)}>
		<div class:focus={isFocused}>
			<input type="text" id="searchbar" placeholder="Buscar alumno..." />
			<span><Icon src={Magnify} /></span>
		</div>
	</label>
</ClickOutside>

<style lang="scss">
	label {
		cursor: pointer;

		div {
			border: 2px solid var(--border-color);
			background-color: var(--input-color);

			display: flex;
			align-items: center;

			&:hover {
				background-color: var(--area-color);
				border: 2px solid var(--blue-color);
			}

			&.focus {
				border: 2px solid var(--green-color);
			}
		}

		span,
		input {
			display: flex;
			align-items: center;
			cursor: pointer;
			height: 100%;
			background-color: transparent;
			padding: 1rem;

			&::placeholder {
				color: var(--focus-color);
			}

			&:hover {
				&::placeholder {
					color: var(--placeholder-color);
				}
			}
		}

		input {
			width: 500px;
		}
	}
</style>
