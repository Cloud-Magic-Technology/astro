import { useState } from 'react';

interface InteractiveCounterProps {
	initialValue?: number;
	step?: number;
	label?: string;
}

export default function InteractiveCounter({
	initialValue = 0,
	step = 1,
	label = 'Counter',
}: InteractiveCounterProps) {
	const [count, setCount] = useState(initialValue);

	return (
		<div className="my-4 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
			<div className="mb-2 flex items-center justify-between">
				<span className="text-sm font-medium text-blue-300">{label}</span>
				<span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs text-blue-400">
					Interactive Component
				</span>
			</div>
			<div className="flex items-center gap-4">
				<button
					onClick={() => setCount((c) => c - step)}
					className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
				>
					- {step}
				</button>
				<span className="min-w-[4ch] text-center text-2xl font-bold text-white">
					{count}
				</span>
				<button
					onClick={() => setCount((c) => c + step)}
					className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
				>
					+ {step}
				</button>
			</div>
			<p className="mt-2 text-xs text-blue-300/70">
				This interactive React component is embedded directly in MDX content.
			</p>
		</div>
	);
}
