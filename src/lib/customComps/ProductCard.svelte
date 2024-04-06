<script lang="ts">
	export let product: Item;
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card';
	import { toast } from 'svelte-sonner';

	import { products } from '$lib/js/store';
	import { onMount } from 'svelte';

	export let showDelete = true;

	$: added = false;

	$: if (product) {
		start();
		console.log(product);
	}

	//if products is not iterable, set it to an empty array
	onMount(() => {
		start();
	});

	function start() {
		if (typeof $products === 'undefined' || !Array.isArray($products)) {
			$products = [];
		} else {
			added = !!$products.find((p: Item) => p.value === product.value);
		}
	}

	function add() {
		//check if products is mull
		if (typeof $products === 'undefined' || !Array.isArray($products)) {
			$products = [];
		}

		if (!$products.find((p: Item) => p.value === product.value)) {
			$products = [...$products, product];
			toast.success('Produktet er tilføjet');
			added = true;
		} else {
			toast.error('Produktet er allerede tilføjet');
		}
	}

	function remove() {
		//check if products is mull
		if (typeof $products === 'undefined' || !Array.isArray($products)) {
			$products = [];
		}

		$products = $products.filter((p: Item) => p.value !== product.value);
		toast.success('Produktet er fjernet');
		added = false;
	}
</script>

<Card.Root class="flex h-full max-w-md flex-col justify-between ">
	<Card.Header>
		<Card.Title>{product.value}</Card.Title>
		<Card.Description>{product.desc}</Card.Description>
	</Card.Header>
	<Card.Content></Card.Content>
	<Card.Footer class="gap-2">
		{#if showDelete}
			{#if !added}
				<Button size="sm" on:click={add}>Tilføj</Button>
			{:else}
				<Button variant="destructive" size="sm" on:click={remove}>Fjern</Button>
			{/if}
		{/if}
		<Button variant="outline" href={product.url} target="_blank" size="sm">Se i webshop</Button>
		<div class="size-9 overflow-hidden">
			{@html product.thumb_html}
		</div>
	</Card.Footer>
</Card.Root>
