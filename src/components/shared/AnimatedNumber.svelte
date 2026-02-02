<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	interface Props {
		value: number;
		duration?: number;
		suffix?: string;
		prefix?: string;
		decimals?: number;
	}

	let { value, duration = 1000, suffix = '', prefix = '', decimals = 0 }: Props = $props();

	const displayValue = tweened(0, {
		duration,
		easing: cubicOut,
	});

	$effect(() => {
		displayValue.set(value);
	});

	const formatted = $derived(
		prefix + $displayValue.toFixed(decimals) + suffix
	);
</script>

<span class="tabular-nums">{formatted}</span>
