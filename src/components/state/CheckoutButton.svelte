<script lang="ts">
	import { useStore } from '@nanostores/vue';
	import { cartItems, cartTotal, cartCount, clearCart } from '../../stores/cart';

	let items = $state<typeof cartItems extends { get(): infer T } ? T : never>([]);
	let total = $state(0);
	let count = $state(0);
	let isProcessing = $state(false);
	let showSuccess = $state(false);

	$effect(() => {
		const unsubItems = cartItems.subscribe((value) => {
			items = value;
		});
		const unsubTotal = cartTotal.subscribe((value) => {
			total = value;
		});
		const unsubCount = cartCount.subscribe((value) => {
			count = value;
		});

		return () => {
			unsubItems();
			unsubTotal();
			unsubCount();
		};
	});

	async function handleCheckout() {
		if (count === 0) return;

		isProcessing = true;
		// Simulate checkout process
		await new Promise((resolve) => setTimeout(resolve, 1500));
		clearCart();
		isProcessing = false;
		showSuccess = true;

		setTimeout(() => {
			showSuccess = false;
		}, 3000);
	}
</script>

<div class="rounded-lg border border-slate-700 bg-slate-800 p-4">
	<div class="mb-4 flex items-center justify-between">
		<h3 class="font-semibold text-white">Checkout</h3>
		<span class="rounded-full bg-orange-500/20 px-2 py-0.5 text-xs font-medium text-orange-400">
			Svelte
		</span>
	</div>

	{#if showSuccess}
		<div class="rounded-lg bg-green-500/20 p-4 text-center">
			<p class="font-semibold text-green-400">Order Placed!</p>
			<p class="text-sm text-green-300">Thank you for your purchase.</p>
		</div>
	{:else}
		<div class="mb-4 space-y-2 text-sm">
			<div class="flex justify-between text-slate-400">
				<span>Items:</span>
				<span class="text-white">{count}</span>
			</div>
			<div class="flex justify-between text-slate-400">
				<span>Subtotal:</span>
				<span class="text-white">${total.toFixed(2)}</span>
			</div>
			<div class="flex justify-between text-slate-400">
				<span>Shipping:</span>
				<span class="text-white">Free</span>
			</div>
			<div class="border-t border-slate-700 pt-2">
				<div class="flex justify-between font-semibold">
					<span class="text-slate-300">Total:</span>
					<span class="text-green-400">${total.toFixed(2)}</span>
				</div>
			</div>
		</div>

		<button
			onclick={handleCheckout}
			disabled={count === 0 || isProcessing}
			class="w-full rounded bg-orange-600 px-4 py-2 font-medium text-white transition-colors hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
		>
			{#if isProcessing}
				Processing...
			{:else if count === 0}
				Cart is Empty
			{:else}
				Complete Purchase
			{/if}
		</button>
	{/if}

	<p class="mt-3 text-center text-xs text-slate-500">
		This Svelte component reads cart state set by React and Vue
	</p>
</div>
