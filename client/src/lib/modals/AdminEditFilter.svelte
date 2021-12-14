<script>
	import { campuses, levels, modalities, statuses, periods, years, roles } from '$lib/data';
	import Check from '$lib/icons/check.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import FilterMenu from '$lib/icons/filter-menu.svelte';
	import Loading from '$lib/components/Loading.svelte';

	export let users;
	let loading = false;
	let isOpen = false;
	let filters = [];
	let parameters = {};

	function handleCheckbox(param) {
		if (!filters.includes(param)) {
			parameters[param] = '';
		}

		if (filters.includes('terminationPeriod')) {
			filters = [...filters, 'terminationYear'];
		} else {
			parameters.terminationYear = '';
		}

		if (filters.includes('graduationPeriod')) {
			filters = [...filters, 'graduationYear'];
		} else {
			parameters.graduationYear = '';
		}
	}

	function handleFilter() {
		loading = true;
		users.filterable = users.original.filter((user) => {
			for (const key of filters) {
				if (
					parameters[key].toString() !== '' &&
					parameters[key].toString() !== user[key].toString()
				) {
					return false;
				}
			}
			return true;
		});

		loading = false;
		isOpen = false;
	}

	function handleCancel() {
		filters = [];
		parameters = {};
		users.filterable = [...users.original];
		isOpen = false;
	}
</script>

<Modal bind:isOpen>
	<!--Button-->
	<button class="filter" slot="trigger" let:open on:click={open}>
		<Icon src={FilterMenu} />
		<span>Filtros</span>
	</button>

	<!--Header-->
	<span slot="header">Editar filtros</span>

	<!--Content-->
	<div class="content" slot="content">
		<div class="container">
			<div class="row">
				<span class="tag">Rol de autoridad</span>
				<div class="field">
					<input
						bind:group={filters}
						on:change={() => handleCheckbox('role')}
						value="role"
						type="checkbox"
						id="role"
					/>
					<label for="role">
						<span>
							<Icon src={Check} isCheckbox={true} isChecked={filters.includes('role')} />
						</span>
					</label>
					<select
						class:active={filters.includes('role') && parameters.role}
						disabled={!filters.includes('role')}
						bind:value={parameters.role}
					>
						<option disabled selected value> Selecciona un rol </option>
						{#each roles as role}
							<option value={role}>{role}</option>
						{/each}
					</select>
				</div>
			</div>
			<div class="row">
				<span class="tag">Campus</span>
				<div class="field">
					<input
						bind:group={filters}
						on:change={() => handleCheckbox('campus')}
						value={'campus'}
						type="checkbox"
						id="campus"
					/>
					<label for="campus">
						<span>
							<Icon src={Check} isCheckbox={true} isChecked={filters.includes('campus')} />
						</span>
					</label>
					<select
						class:active={filters.includes('campus') && parameters.campus}
						disabled={!filters.includes('campus')}
						bind:value={parameters.campus}
					>
						<option disabled selected value> Selecciona un campus </option>
						{#each campuses as campus}
							<option value={campus}>{campus}</option>
						{/each}
					</select>
				</div>
			</div>
		</div>
		<div class="buttons">
			<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
			<button class="submit" type="button" on:click={handleFilter}>
				{#if loading}
					<Loading />
				{:else}
					Filtrar
				{/if}
			</button>
		</div>
	</div>
</Modal>

<style lang="scss">
	div.content {
		display: flex;
		flex-direction: column;
		width: 400px;
		gap: 1rem;
	}
	div.container {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	div.row {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	div.field {
		display: flex;
		gap: 1rem;
	}

	div.buttons {
		display: flex;
		gap: 1rem;
	}

	span.tag {
		color: var(--focus-color);
	}

	button {
		padding: 1rem;
	}
	button.filter {
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		padding: 14px;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
	}
	button.filter:hover {
		border: 2px solid var(--blue-color);
	}
	button.filter:focus {
		border: 2px solid var(--green-color);
	}
	button.filter:active {
		border: 2px solid var(--blue-color);
	}

	button.submit {
		width: 100%;

		background-color: var(--green-color);
		border: 2px solid var(--green-color);
		cursor: pointer;
	}

	button.submit:hover {
		background-color: var(--darker-green-color);
	}

	button.submit:active {
		background-color: var(--green-color);
	}

	button.cancel {
		width: 100%;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		cursor: pointer;
	}
	button.cancel:hover {
		background: var(--area-color);
	}

	button.cancel:active {
		background-color: var(--input-color);
	}

	select {
		color: var(--white-color);
		padding: 0.5rem;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		border-radius: 0;
		width: 100%;
	}
	select.smaller-select {
		width: 30%;
	}

	select.active {
		border: 2px solid var(--green-color);
	}
	select.active:hover {
		border: 2px solid var(--green-color);
	}

	select:hover {
		border: 2px solid var(--blue-color);
	}
	select:hover::placeholder {
		color: var(--placeholder-color);
	}

	select:disabled:hover {
		border: 2px solid var(--border-color);
	}

	select:focus {
		border: 2px solid var(--green-color);
	}

	select::placeholder {
		color: var(--focus-color);
	}

	label {
		display: flex;
		align-items: center;
		cursor: pointer;
		color: var(--placeholder-color);
	}
	label span {
		height: 2.6rem;
		width: 2.6rem;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	label span:hover {
		border: 2px solid var(--blue-color);
	}

	input[type='checkbox']:checked + label span {
		border: 2px solid var(--green-color);
	}
	input[type='checkbox']:checked + label span:hover {
		color: var(--white-color);
		border: 2px solid var(--green-color);
	}

	input {
		display: none;
	}
</style>
