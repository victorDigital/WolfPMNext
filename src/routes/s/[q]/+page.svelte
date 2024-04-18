<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import ProductCard from '$lib/customComps/ProductCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: products = data.filtered;
	$: query = data.q;
	$: if (products) console.log(products);
</script>

<div class="pb-4">
	<h1 class="text-xl font-bold">Søgeresultater for "{query}"</h1>
	{#if products.length === 0}
		<p>"{query}" gav ingen resultater</p>
	{/if}
</div>

<div class="grid">
	{#each products as product}
		<ProductCard {product} />
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		grid-gap: 1rem;
	}
</style>
