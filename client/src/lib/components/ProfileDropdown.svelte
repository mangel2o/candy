<script>
	import { goto } from '$app/navigation';

	import ClickOutside from '$lib/components/ClickOutside.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Account from '$lib/icons/account.svelte';
	import { userStore } from '$lib/stores';
	let isDropdownActive = false;
</script>

<ClickOutside on:clickoutside={() => (isDropdownActive = false)}>
	<!--PROFILE BUTTON-->
	<div class="dropdown">
		<button class="dropbtn" on:click={() => (isDropdownActive = !isDropdownActive)}>
			<span class:active={isDropdownActive}><Icon src={Account} /></span>
			<span class:active={isDropdownActive}>
				{$userStore.name.split(' ')[0]}
			</span>
		</button>

		<!--DROPDOWN CONTENT-->
		{#if isDropdownActive}
			<div class="dropcontent">
				<button
					on:click={() => {
						isDropdownActive = false;
						goto(`/account/`);
					}}
				>
					Ver perfil
				</button>
				<button
					on:click={() => {
						isDropdownActive = false;
						$userStore = null;
					}}
				>
					Cerrar sesión
				</button>
			</div>
		{/if}
	</div>
</ClickOutside>

<style>
	button {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 6px;
		background-color: var(--area-color);
		padding: 1rem;
	}

	button:hover > span {
		color: var(--placeholder-color);
	}

	button:hover > span.active {
		color: var(--white-color);
	}

	span {
		display: flex;
		align-items: center;
	}

	div.dropdown {
		display: inline-block;
		position: relative;
	}

	div.dropcontent {
		z-index: 10;
		position: absolute;
		background-color: var(--area-color);
		right: 0;
		width: 10rem;
	}

	div.dropcontent button {
		width: 100%;
		border: 1px solid var(--border-color);
	}

	div.dropcontent button:hover {
		background-color: var(--input-color);
	}

	button.dropbtn {
		height: 64px;
	}
</style>
