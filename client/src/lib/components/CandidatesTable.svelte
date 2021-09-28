<script>
	import { goto } from '$app/navigation';
	import Icon from '$lib/components/Icon.svelte';
	import OpenInNew from '$lib/icons/open-in-new.svelte';

	export let candidates;
</script>

<template>
	<table>
		<tr>
			<th class="id">ID</th>
			<th class="name">Nombre</th>
			<th class="number">Matricula</th>
			<th>Nivel</th>
			<th>Campus</th>
			<th>Terminación</th>
			<th>Estatus</th>
			<th>Ver</th>
		</tr>
		{#each candidates as candidate, i}
			<tr>
				<td class="id">{i + 1}</td>
				<td class="name">{candidate.name}</td>
				<td class="number">{candidate.number}</td>
				<td>{candidate.level}</td>
				<td>{candidate.campus}</td>
				<td>{candidate.terminationPeriod} {candidate.terminationYear}</td>
				<td class="status">
					<div class={candidate.status.toLowerCase()} />
					{candidate.status}
				</td>
				<td>
					<button on:click={() => goto(`/candidates/${candidate._id}/documents`)}>
						<span><Icon src={OpenInNew} /></span>
					</button>
				</td>
			</tr>
		{/each}
	</table>
</template>

<style lang="scss">
	table {
		width: 100%;
		border-color: var(--border-color);
		border-collapse: collapse;
		background-color: var(--input-color);

		tr {
			outline: none;
			border: 2px solid var(--border-color);

			&:hover {
				background-color: var(--area-color);
			}

			th {
				font-weight: bold;
				text-align: center;
				background-color: var(--area-color);
			}

			th,
			td {
				text-align: left;
				vertical-align: middle;
				padding: 0 30px;
				height: 56px;

				&.id {
					max-width: 40px;
				}

				&.name {
					max-width: 300px;
				}

				&.number {
					max-width: 120px;
				}

				&:last-child {
					text-align: center;
				}
			}

			td {
				&.status {
					display: flex;
					align-items: center;
					gap: 0.5rem;
				}
			}
		}

		div {
			width: 0.6rem;
			height: 0.6rem;
			border-radius: 0.5rem;

			&.vacio {
				background-color: var(--focus-color);
			}
			&.completo {
				background-color: var(--green-color);
			}
			&.pendiente {
				background-color: var(--yellow-color);
			}
			&.incompleto {
				background-color: var(--red-color);
			}
			&.retenido {
				background-color: var(--blue-color);
			}
		}

		button {
			cursor: pointer;
			background-color: var(--area-color);
			border: 2px solid var(--border-color);
			padding: 0.5rem;

			&:hover {
				background-color: var(--input-color);
				border: 2px solid var(--blue-color);
			}

			span {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
