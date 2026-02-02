import { atom, computed } from 'nanostores';

export interface CartItem {
	id: string;
	name: string;
	price: number;
	quantity: number;
	framework: 'react' | 'vue' | 'svelte';
}

export const cartItems = atom<CartItem[]>([]);

export const cartTotal = computed(cartItems, (items) => {
	return items.reduce((total, item) => total + item.price * item.quantity, 0);
});

export const cartCount = computed(cartItems, (items) => {
	return items.reduce((count, item) => count + item.quantity, 0);
});

export function addToCart(item: Omit<CartItem, 'quantity'>) {
	const items = cartItems.get();
	const existing = items.find((i) => i.id === item.id);

	if (existing) {
		cartItems.set(
			items.map((i) =>
				i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
			)
		);
	} else {
		cartItems.set([...items, { ...item, quantity: 1 }]);
	}
}

export function removeFromCart(id: string) {
	cartItems.set(cartItems.get().filter((item) => item.id !== id));
}

export function updateQuantity(id: string, quantity: number) {
	if (quantity <= 0) {
		removeFromCart(id);
		return;
	}
	cartItems.set(
		cartItems.get().map((item) =>
			item.id === id ? { ...item, quantity } : item
		)
	);
}

export function clearCart() {
	cartItems.set([]);
}
