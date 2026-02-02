import { addToCart } from '../../stores/cart';

interface Product {
	id: string;
	name: string;
	price: number;
	emoji: string;
	description: string;
}

interface ProductCardProps {
	product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
	const handleAdd = () => {
		addToCart({
			id: product.id,
			name: product.name,
			price: product.price,
			framework: 'react',
		});
	};

	return (
		<div className="rounded-lg border border-slate-700 bg-slate-800 p-4 transition-all hover:border-blue-500/50">
			<div className="mb-3 flex items-center justify-between">
				<span className="text-3xl">{product.emoji}</span>
				<span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-medium text-blue-400">
					React
				</span>
			</div>
			<h3 className="mb-1 font-semibold text-white">{product.name}</h3>
			<p className="mb-3 text-sm text-slate-400">{product.description}</p>
			<div className="flex items-center justify-between">
				<span className="text-lg font-bold text-green-400">
					${product.price.toFixed(2)}
				</span>
				<button
					onClick={handleAdd}
					className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
}
