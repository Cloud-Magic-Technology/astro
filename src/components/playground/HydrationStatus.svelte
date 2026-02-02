<script lang="ts">
	import { onMount } from 'svelte';

	let mounted = $state(false);
	let mountTime = $state(0);

	onMount(() => {
		mounted = true;
		mountTime = performance.now();
	});
</script>

<div class="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-4">
	<h3 class="mb-2 font-semibold text-cyan-400">Svelte Status Monitor</h3>

	<div class="space-y-2 text-sm">
		<div class="flex items-center justify-between">
			<span class="text-slate-400">Component Status:</span>
			<span class={mounted ? 'text-green-400' : 'text-amber-400'}>
				{mounted ? 'Interactive' : 'Static HTML'}
			</span>
		</div>

		{#if mounted}
			<div class="flex items-center justify-between">
				<span class="text-slate-400">Mount Time:</span>
				<span class="font-mono text-white">{mountTime.toFixed(0)}ms</span>
			</div>
		{/if}

		<div class="flex items-center justify-between">
			<span class="text-slate-400">Framework:</span>
			<span class="text-orange-400">Svelte 5</span>
		</div>
	</div>

	<p class="mt-3 text-xs text-slate-500">
		This component uses Svelte 5 runes ($state) and demonstrates cross-framework coexistence.
	</p>
</div>
