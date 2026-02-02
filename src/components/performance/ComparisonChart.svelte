<script lang="ts">
	import { onMount } from 'svelte';

	interface Framework {
		name: string;
		color: string;
		jsSize: number;
		tti: number;
		lighthouse: number;
	}

	const frameworks: Framework[] = [
		{ name: 'Astro', color: '#a855f7', jsSize: 12, tti: 0.8, lighthouse: 98 },
		{ name: 'Next.js', color: '#3b82f6', jsSize: 85, tti: 2.1, lighthouse: 82 },
		{ name: 'Nuxt', color: '#22c55e', jsSize: 95, tti: 2.3, lighthouse: 80 },
		{ name: 'SvelteKit', color: '#f97316', jsSize: 35, tti: 1.2, lighthouse: 92 },
		{ name: 'Gatsby', color: '#8b5cf6', jsSize: 120, tti: 2.8, lighthouse: 75 },
	];

	let metric = $state<'jsSize' | 'tti' | 'lighthouse'>('jsSize');
	let mounted = $state(false);

	const metrics = {
		jsSize: { label: 'JS Bundle Size', unit: 'KB', description: 'Less is better', max: 150 },
		tti: { label: 'Time to Interactive', unit: 's', description: 'Lower is better', max: 3.5 },
		lighthouse: { label: 'Lighthouse Score', unit: '', description: 'Higher is better', max: 100 },
	};

	onMount(() => {
		mounted = true;
	});

	function getBarWidth(value: number): number {
		return (value / metrics[metric].max) * 100;
	}
</script>

<div class="rounded-xl border border-slate-700 bg-slate-800 p-6">
	<div class="mb-6 flex flex-wrap items-center justify-between gap-4">
		<h3 class="text-lg font-bold text-white">Framework Comparison</h3>
		<div class="flex gap-2">
			<button
				onclick={() => metric = 'jsSize'}
				class={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
					metric === 'jsSize'
						? 'bg-purple-600 text-white'
						: 'bg-slate-700 text-slate-300 hover:bg-slate-600'
				}`}
			>
				Bundle Size
			</button>
			<button
				onclick={() => metric = 'tti'}
				class={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
					metric === 'tti'
						? 'bg-purple-600 text-white'
						: 'bg-slate-700 text-slate-300 hover:bg-slate-600'
				}`}
			>
				TTI
			</button>
			<button
				onclick={() => metric = 'lighthouse'}
				class={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
					metric === 'lighthouse'
						? 'bg-purple-600 text-white'
						: 'bg-slate-700 text-slate-300 hover:bg-slate-600'
				}`}
			>
				Lighthouse
			</button>
		</div>
	</div>

	<p class="mb-4 text-sm text-slate-400">
		{metrics[metric].label} - {metrics[metric].description}
	</p>

	<div class="space-y-4">
		{#each frameworks as framework}
			<div class="flex items-center gap-4">
				<div class="w-20 text-sm font-medium text-slate-300">{framework.name}</div>
				<div class="relative h-8 flex-1 overflow-hidden rounded bg-slate-700">
					<div
						class="absolute left-0 top-0 h-full rounded transition-all duration-700"
						style={`width: ${mounted ? getBarWidth(framework[metric]) : 0}%; background-color: ${framework.color}`}
					>
						<div class="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"></div>
					</div>
				</div>
				<div class="w-16 text-right text-sm font-bold" style={`color: ${framework.color}`}>
					{framework[metric]}{metrics[metric].unit}
				</div>
			</div>
		{/each}
	</div>

	<div class="mt-6 rounded-lg border border-purple-500/30 bg-purple-500/10 p-4">
		<p class="text-sm text-purple-200">
			<strong>Note:</strong> These are representative values for typical content sites.
			Actual performance varies based on implementation, content, and optimization.
		</p>
	</div>
</div>
