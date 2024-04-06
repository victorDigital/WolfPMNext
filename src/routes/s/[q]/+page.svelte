<script lang="ts">
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
		<p>No products found</p>
	{/if}
</div>

<div class="grid">
	{#each products as product}
		<ProductCard {product} />
	{:else}
		<p>No products found</p>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		grid-gap: 1rem;
	}
</style>
