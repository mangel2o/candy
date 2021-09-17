<script lang="ts">
	import { goto } from '$app/navigation';

	import ClickOutside from '$lib/components/ClickOutside.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Account from '$lib/icons/account.svelte';
	import { userStore } from '$lib/stores';
	let isDropdownActive: boolean = false;
</script>

<template>
	<ClickOutside on:clickoutside={() => (isDropdownActive = false)}>
		<!--PROFILE BUTTON-->
		<button class="dropdown-btn" on:click={() => (isDropdownActive = !isDropdownActive)}>
			<span class:active={isDropdownActive}><Icon src={Account} /></span>
			<span class:active={isDropdownActive}>User</span>
		</button>

		<!--DROPDOWN CONTENT-->
		{#if isDropdownActive}
			<div class="dropdown-container">
				<button> Ver perfil </button>
				<button
					on:click={() => {
						$userStore = null;
					}}
				>
					Cerrar sesión
				</button>
			</div>
		{/if}
	</ClickOutside>
</template>

<style lang="scss">
	button {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 6px;
		background-color: var(--area-color);
		padding: 14px;

		span {
			display: flex;
			align-items: center;
		}

		&:hover > span {
			color: var(--placeholder-color);
		}

		&:hover > span.active {
			color: var(--white-color);
		}
	}

	div.dropdown-container {
		position: absolute;
		top: 60px;
		right: 10px;
		background-color: var(--area-color);
		& > button {
			width: 100%;
			border: 1px solid var(--border-color);
			&:hover {
				background-color: var(--input-color);
			}
		}
	}
</style>
