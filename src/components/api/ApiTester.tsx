import { useState } from 'react';

interface ApiResponse {
	success: boolean;
	data?: unknown;
	error?: string;
	message?: string;
}

export default function ApiTester() {
	const [endpoint, setEndpoint] = useState('/api/stats');
	const [method, setMethod] = useState('GET');
	const [body, setBody] = useState('');
	const [response, setResponse] = useState<ApiResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [responseTime, setResponseTime] = useState<number | null>(null);

	const endpoints = [
		{ value: '/api/stats', label: 'GET /api/stats' },
		{ value: '/api/stats?section=visitors', label: 'GET /api/stats?section=visitors' },
		{ value: '/api/stats?section=performance', label: 'GET /api/stats?section=performance' },
		{ value: '/api/subscribe', label: 'GET /api/subscribe (docs)' },
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setResponse(null);

		const startTime = performance.now();

		try {
			const options: RequestInit = {
				method,
				headers: { 'Content-Type': 'application/json' },
			};

			if (method === 'POST' && body) {
				options.body = body;
			}

			const res = await fetch(endpoint, options);
			const data = await res.json();

			setResponseTime(performance.now() - startTime);
			setResponse(data);
		} catch (error) {
			setResponseTime(performance.now() - startTime);
			setResponse({
				success: false,
				error: error instanceof Error ? error.message : 'Request failed',
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="space-y-4">
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="flex gap-2">
					<select
						value={method}
						onChange={(e) => setMethod(e.target.value)}
						className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
					>
						<option value="GET">GET</option>
						<option value="POST">POST</option>
					</select>
					<select
						value={endpoint}
						onChange={(e) => setEndpoint(e.target.value)}
						className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
					>
						{endpoints.map((ep) => (
							<option key={ep.value} value={ep.value}>
								{ep.label}
							</option>
						))}
					</select>
				</div>

				{method === 'POST' && (
					<div>
						<label className="mb-1 block text-sm text-slate-400">
							Request Body (JSON)
						</label>
						<textarea
							value={body}
							onChange={(e) => setBody(e.target.value)}
							placeholder='{"email": "test@example.com", "name": "Test User"}'
							className="h-24 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 font-mono text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
						/>
					</div>
				)}

				<button
					type="submit"
					disabled={loading}
					className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
				>
					{loading ? 'Sending...' : 'Send Request'}
				</button>
			</form>

			{response && (
				<div className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="text-slate-400">Response:</span>
						<div className="flex items-center gap-2">
							{responseTime && (
								<span className="text-slate-500">{responseTime.toFixed(0)}ms</span>
							)}
							<span
								className={`rounded-full px-2 py-0.5 text-xs font-medium ${
									response.success
										? 'bg-green-500/20 text-green-400'
										: 'bg-red-500/20 text-red-400'
								}`}
							>
								{response.success ? 'Success' : 'Error'}
							</span>
						</div>
					</div>
					<pre className="max-h-64 overflow-auto rounded-lg border border-slate-700 bg-slate-900 p-4 text-sm text-slate-300">
						{JSON.stringify(response, null, 2)}
					</pre>
				</div>
			)}
		</div>
	);
}
