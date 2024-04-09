<script>
	import Nav from '$lib/customComps/Nav.svelte';
	import { Toaster } from '$lib/components/ui/sonner';
	import '../app.pcss';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
</script>

<Toaster />
<div class="relative">
	<div class="z-50">
		<Nav />
	</div>
	<div class="z-10">
		<slot />
	</div>
</div>
