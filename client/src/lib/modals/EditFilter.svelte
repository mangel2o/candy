<script lang="ts">
	import { campuses, levels, modalities, statuses, periods, years } from '$lib/data';
	import Check from '$lib/icons/check.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import FilterMenu from '$lib/icons/filter-menu.svelte';

	export let candidates = [];
	export let filteredCandidates = [];
	export let entries;
	let isOpen = false;
	let filters = [];
	let parameters = {
		status: '',
		level: '',
		campus: '',
		modality: '',
		terminationPeriod: '',
		terminationYear: ''
	};

	function handleCheckbox(param) {
		if (!filters.includes(param)) {
			parameters[param] = '';
		}

		if (filters.includes('terminationPeriod')) {
			filters = [...filters, 'terminationYear'];
		} else {
			parameters.terminationYear = '';
		}
	}

	function handleFilter() {
		filteredCandidates = candidates.filter((candidate) => {
			for (const key of filters) {
				if (
					parameters[key].toString() !== '' &&
					parameters[key].toString() !== candidate[key].toString()
				) {
					return false;
				}
			}
			return true;
		});
		entries = filteredCandidates.length;
		isOpen = false;
	}

	function handleCancel() {
		filters = [];
		parameters = {
			status: '',
			level: '',
			campus: '',
			modality: '',
			terminationPeriod: '',
			terminationYear: ''
		};
		filteredCandidates = candidates;
		entries = candidates.length;
		isOpen = false;
	}
</script>

<template>
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
					<span class="tag">Estatus de documentos</span>
					<div class="field">
						<input
							bind:group={filters}
							on:change={() => handleCheckbox('status')}
							value="status"
							type="checkbox"
							id="status"
						/>
						<label for="status">
							<span>
								<Icon src={Check} isCheckbox={true} isChecked={filters.includes('status')} />
							</span>
						</label>
						<select
							class:active={filters.includes('status') && parameters.status}
							disabled={!filters.includes('status')}
							bind:value={parameters.status}
						>
							<option disabled selected value> Selecciona un estatus </option>
							{#each statuses as status}
								<option value={status}>{status}</option>
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
				<div class="row">
					<span class="tag">Nivel</span>
					<div class="field">
						<input
							bind:group={filters}
							on:change={() => handleCheckbox('level')}
							value={'level'}
							type="checkbox"
							id="level"
						/>
						<label for="level">
							<span>
								<Icon src={Check} isCheckbox={true} isChecked={filters.includes('level')} />
							</span>
						</label>
						<select
							class:active={filters.includes('level') && parameters.level}
							disabled={!filters.includes('level')}
							bind:value={parameters.level}
						>
							<option disabled selected value> Selecciona un nivel </option>
							{#each levels as level}
								<option value={level}>{level}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="row">
					<span class="tag">Modalidad</span>
					<div class="field">
						<input
							bind:group={filters}
							on:change={() => handleCheckbox('modality')}
							value={'modality'}
							type="checkbox"
							id="modality"
						/>
						<label for="modality">
							<span>
								<Icon src={Check} isCheckbox={true} isChecked={filters.includes('modality')} />
							</span>
						</label>
						<select
							class:active={filters.includes('modality') && parameters.modality}
							disabled={!filters.includes('modality')}
							bind:value={parameters.modality}
						>
							<option disabled selected value> Selecciona una modalidad </option>
							{#each modalities as modality}
								<option value={modality}>{modality}</option>
							{/each}
						</select>
					</div>
				</div>
				<div class="row">
					<span class="tag">Periodo de terminación</span>
					<div class="field">
						<input
							bind:group={filters}
							on:change={() => handleCheckbox('terminationPeriod')}
							value={'terminationPeriod'}
							type="checkbox"
							id="termination"
						/>
						<label for="termination">
							<span>
								<Icon
									src={Check}
									isCheckbox={true}
									isChecked={filters.includes('terminationPeriod' || 'terminationYear')}
								/>
							</span>
						</label>
						<select
							class:active={filters.includes('terminationPeriod') && parameters.terminationPeriod}
							disabled={!filters.includes('terminationPeriod')}
							bind:value={parameters.terminationPeriod}
						>
							<option disabled selected value> Selecciona un periodo </option>
							{#each periods as period}
								<option value={period}>{period}</option>
							{/each}
						</select>
						<select
							class="smaller-select"
							class:active={filters.includes('terminationYear') && parameters.terminationYear}
							disabled={!filters.includes('terminationYear')}
							bind:value={parameters.terminationYear}
						>
							<option disabled selected value> Año </option>
							{#each years as year}
								<option value={year}>{year}</option>
							{/each}
						</select>
					</div>
				</div>
			</div>
			<div class="buttons">
				<button class="cancel" type="button" on:click={handleCancel}> Cancelar </button>
				<button class="submit" type="button" on:click={handleFilter}> Filtrar </button>
			</div>
		</div>
	</Modal>
</template>

<style lang="scss">
	div {
		&.content {
			display: flex;
			flex-direction: column;
			width: 400px;
			gap: 1rem;
		}
		&.container {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		&.row {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		&.field {
			display: flex;
			gap: 1rem;
		}

		&.buttons {
			display: flex;
			gap: 1rem;
		}
	}

	span {
		&.tag {
			color: var(--focus-color);
		}
	}

	button {
		padding: 1rem;
		&.filter {
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 6px;
			padding: 14px;
			background-color: var(--input-color);
			border: 2px solid var(--border-color);
			&:hover {
				background-color: var(--area-color);
				border: 2px solid var(--blue-color);
			}
			&:focus {
				border: 2px solid var(--green-color);
			}
			&:active {
				border: 2px solid var(--blue-color);
			}
		}
		&.submit {
			width: 100%;

			background-color: var(--green-color);
			border: 2px solid var(--green-color);
			cursor: pointer;

			&:hover {
				background-color: var(--darker-green-color);
			}

			&:active {
				background-color: var(--green-color);
			}
		}

		&.cancel {
			width: 100%;
			background-color: var(--input-color);
			border: 2px solid var(--border-color);
			cursor: pointer;

			&:hover {
				background: var(--area-color);
			}

			&:active {
				background-color: var(--input-color);
			}
		}
	}

	select {
		color: var(--white-color);
		padding: 0.5rem;
		background-color: var(--input-color);
		border: 2px solid var(--border-color);
		border-radius: 0;
		width: 100%;

		&.smaller-select {
			width: 30%;
		}

		&.active {
			border: 2px solid var(--green-color);
			&:hover {
				border: 2px solid var(--green-color);
			}
		}

		&:hover {
			border: 2px solid var(--blue-color);

			&::placeholder {
				color: var(--placeholder-color);
			}
		}

		&:disabled {
			&:hover {
				border: 2px solid var(--border-color);
			}
		}

		&:focus {
			border: 2px solid var(--green-color);
		}

		&::placeholder {
			color: var(--focus-color);
		}
	}

	label {
		display: flex;
		align-items: center;
		cursor: pointer;
		color: var(--placeholder-color);

		span {
			height: 2.6rem;
			width: 2.6rem;
			background-color: var(--input-color);
			border: 2px solid var(--border-color);
			display: flex;
			align-items: center;
			justify-content: center;

			&:hover {
				border: 2px solid var(--blue-color);
			}
		}
	}

	input[type='checkbox']:checked + label {
		span {
			border: 2px solid var(--green-color);
			&:hover {
				color: var(--white-color);
				border: 2px solid var(--green-color);
			}
		}
	}

	input {
		display: none;
	}
</style>
