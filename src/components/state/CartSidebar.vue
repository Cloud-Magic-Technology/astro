<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { cartItems, cartTotal, cartCount, updateQuantity, removeFromCart } from '../../stores/cart';

const items = useStore(cartItems);
const total = useStore(cartTotal);
const count = useStore(cartCount);

const frameworkColors: Record<string, string> = {
	react: 'text-blue-400 bg-blue-500/20',
	vue: 'text-green-400 bg-green-500/20',
	svelte: 'text-orange-400 bg-orange-500/20',
};
</script>

<template>
	<div class="rounded-lg border border-slate-700 bg-slate-800">
		<div class="flex items-center justify-between border-b border-slate-700 p-4">
			<div class="flex items-center gap-2">
				<h3 class="font-semibold text-white">Shopping Cart</h3>
				<span class="rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
					Vue
				</span>
			</div>
			<span class="rounded-full bg-slate-700 px-2 py-0.5 text-sm text-slate-300">
				{{ count }} items
			</span>
		</div>

		<div v-if="items.length === 0" class="p-6 text-center">
			<p class="text-slate-400">Your cart is empty</p>
			<p class="mt-1 text-sm text-slate-500">Add items using the React cards above</p>
		</div>

		<div v-else class="max-h-64 divide-y divide-slate-700 overflow-y-auto">
			<div
				v-for="item in items"
				:key="item.id"
				class="flex items-center justify-between p-4"
			>
				<div class="flex-1">
					<div class="flex items-center gap-2">
						<span class="font-medium text-white">{{ item.name }}</span>
						<span
							:class="['rounded-full px-1.5 py-0.5 text-xs', frameworkColors[item.framework]]"
						>
							{{ item.framework }}
						</span>
					</div>
					<p class="text-sm text-slate-400">${{ item.price.toFixed(2) }} each</p>
				</div>

				<div class="flex items-center gap-2">
					<button
						@click="updateQuantity(item.id, item.quantity - 1)"
						class="rounded bg-slate-700 px-2 py-1 text-sm text-white hover:bg-slate-600"
					>
						-
					</button>
					<span class="min-w-[2ch] text-center text-white">{{ item.quantity }}</span>
					<button
						@click="updateQuantity(item.id, item.quantity + 1)"
						class="rounded bg-slate-700 px-2 py-1 text-sm text-white hover:bg-slate-600"
					>
						+
					</button>
					<button
						@click="removeFromCart(item.id)"
						class="ml-2 rounded bg-red-500/20 px-2 py-1 text-sm text-red-400 hover:bg-red-500/30"
					>
						X
					</button>
				</div>
			</div>
		</div>

		<div class="border-t border-slate-700 p-4">
			<div class="flex items-center justify-between">
				<span class="text-slate-400">Total:</span>
				<span class="text-xl font-bold text-green-400">${{ total.toFixed(2) }}</span>
			</div>
		</div>
	</div>
</template>
