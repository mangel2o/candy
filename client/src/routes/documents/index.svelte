<script>
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';
	const categories = getContext('categories');
	$: if ($categories && $categories.length > 0) goto(`/documents/${$categories[0]._id}`);
</script>

<svelte:head>
	<title>Documentos • Tecmilenio</title>
</svelte:head>

<h1>Documentos</h1>
