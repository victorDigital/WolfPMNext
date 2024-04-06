<script lang="ts">
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import Menu from 'lucide-svelte/icons/menu';
	import Search from 'lucide-svelte/icons/search';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let searchQuery = '';
	function navigate(event: { preventDefault: () => void }) {
		event.preventDefault();
		console.log(searchQuery);
		goto(`/s/${searchQuery}`, { keepFocus: true });
	}
	//if the url includes pdf then hide the nav
	let hideNav = false;
	onMount(() => {
		hideNav = $page.url.href.includes('pdf');
	});
</script>

{#if !hideNav}
	<header
		class="sticky top-0 mb-4 flex h-16 items-center gap-4 border-b bg-background bg-muted/40 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:px-6"
	>
		<nav
			class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
		>
			<a
				href="/a/home"
				class="flex h-10 w-10 items-center gap-2 text-lg font-semibold md:text-base"
			>
				<img src="/image.png" alt="WOLF LOGO" />
				<span class="sr-only">Wolf Tactical</span>
			</a>

			<a href="/a/home" class="hover:text-foreground">Søg</a>
			<a href="/p" class="hover:text-foreground">Print</a>
		</nav>
		<Sheet.Root>
			<Sheet.Trigger asChild let:builder>
				<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
					<Menu class="h-5 w-5" />
					<span class="sr-only">Toggle navigation menu</span>
				</Button>
			</Sheet.Trigger>
			<Sheet.Content side="left">
				<nav class="grid gap-6 text-lg font-medium">
					<a href="/a/home" class="flex items-center gap-2 text-lg font-semibold">
						<div class="h-10 w-10">
							<img src="/image.png" alt="WOLF LOGO" />
						</div>
						<span class="sr-only">Wolf Tactical</span>
					</a>
					<a href="/a/home" class="hover:text-foreground">Søg</a>
					<a href="/p" class="hover:text-foreground">Print</a>
				</nav>
			</Sheet.Content>
		</Sheet.Root>
		<div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
			<form class="ml-auto flex-1 sm:flex-initial" on:submit={navigate}>
				<div class="relative">
					<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						type="search"
						placeholder="Søg efter produkter"
						class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
						bind:value={searchQuery}
					/>
				</div>
			</form>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild>
					<Button variant="secondary" size="icon" class="rounded-full">
						<CircleUser class="h-5 w-5" />
						<span class="sr-only">Toggle user menu</span>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Label>My Account</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Settings</DropdownMenu.Item>
					<DropdownMenu.Item>Support</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Logout</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</header>
{/if}
