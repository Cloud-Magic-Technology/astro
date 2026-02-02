import type { APIRoute } from 'astro';

interface Stats {
	visitors: {
		today: number;
		thisWeek: number;
		thisMonth: number;
		trend: number;
	};
	pages: {
		total: number;
		popular: Array<{ path: string; views: number }>;
	};
	performance: {
		avgLoadTime: number;
		lighthouseScore: number;
		cacheHitRate: number;
	};
	server: {
		uptime: string;
		timestamp: string;
		region: string;
	};
}

function generateStats(): Stats {
	return {
		visitors: {
			today: Math.floor(Math.random() * 500) + 800,
			thisWeek: Math.floor(Math.random() * 3000) + 5000,
			thisMonth: Math.floor(Math.random() * 10000) + 20000,
			trend: Math.floor(Math.random() * 20) - 5,
		},
		pages: {
			total: 8,
			popular: [
				{ path: '/evolution', views: Math.floor(Math.random() * 1000) + 2000 },
				{ path: '/playground', views: Math.floor(Math.random() * 800) + 1500 },
				{ path: '/state-sharing', views: Math.floor(Math.random() * 600) + 1200 },
				{ path: '/transitions', views: Math.floor(Math.random() * 500) + 1000 },
				{ path: '/performance', views: Math.floor(Math.random() * 400) + 800 },
			],
		},
		performance: {
			avgLoadTime: Math.random() * 0.5 + 0.3,
			lighthouseScore: Math.floor(Math.random() * 5) + 95,
			cacheHitRate: Math.random() * 10 + 88,
		},
		server: {
			uptime: '99.99%',
			timestamp: new Date().toISOString(),
			region: 'us-east-1',
		},
	};
}

export const GET: APIRoute = async ({ url }) => {
	const section = url.searchParams.get('section');
	const stats = generateStats();

	// Allow filtering by section
	if (section && section in stats) {
		return new Response(
			JSON.stringify({
				success: true,
				data: stats[section as keyof Stats],
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-cache',
				},
			}
		);
	}

	return new Response(
		JSON.stringify({
			success: true,
			data: stats,
		}),
		{
			status: 200,
			headers: {
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache',
			},
		}
	);
};
