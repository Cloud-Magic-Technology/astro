import { useState, useEffect } from 'react';

interface HydrationDemoProps {
	strategy: string;
	description: string;
}

export default function HydrationDemo({ strategy, description }: HydrationDemoProps) {
	const [count, setCount] = useState(0);
	const [hydrated, setHydrated] = useState(false);
	const [hydratedAt, setHydratedAt] = useState<number | null>(null);

	useEffect(() => {
		setHydrated(true);
		setHydratedAt(performance.now());
	}, []);

	return (
		<div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
			<div className="mb-3 flex items-center justify-between">
				<code className="rounded bg-purple-500/20 px-2 py-1 text-sm text-purple-300">
					{strategy}
				</code>
				<span
					className={`flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
						hydrated
							? 'bg-green-500/20 text-green-400'
							: 'bg-amber-500/20 text-amber-400'
					}`}
				>
					<span
						className={`h-2 w-2 rounded-full ${
							hydrated ? 'bg-green-400 animate-pulse' : 'bg-amber-400'
						}`}
					/>
					{hydrated ? 'Hydrated' : 'Waiting...'}
				</span>
			</div>

			<p className="mb-3 text-sm text-slate-400">{description}</p>

			<div className="flex items-center gap-3">
				<button
					onClick={() => setCount((c) => c - 1)}
					className="rounded bg-slate-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-600 disabled:opacity-50"
					disabled={!hydrated}
				>
					-
				</button>
				<span className="min-w-[3ch] text-center text-lg font-bold text-white">
					{count}
				</span>
				<button
					onClick={() => setCount((c) => c + 1)}
					className="rounded bg-slate-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-600 disabled:opacity-50"
					disabled={!hydrated}
				>
					+
				</button>
			</div>

			{hydratedAt !== null && (
				<p className="mt-3 text-xs text-slate-500">
					Hydrated at {hydratedAt.toFixed(0)}ms
				</p>
			)}
		</div>
	);
}
