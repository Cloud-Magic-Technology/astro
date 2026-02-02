import type { APIRoute } from 'astro';

// Simple email validation
function isValidEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Simulated subscriber database
const subscribers = new Set<string>();

export const POST: APIRoute = async ({ request }) => {
	try {
		const data = await request.json();
		const { email, name } = data;

		// Validation
		if (!email) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Email is required',
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		if (!isValidEmail(email)) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Invalid email format',
				}),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Check for existing subscriber (simulated)
		if (subscribers.has(email)) {
			return new Response(
				JSON.stringify({
					success: false,
					error: 'Email already subscribed',
				}),
				{ status: 409, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Add subscriber (simulated)
		subscribers.add(email);

		return new Response(
			JSON.stringify({
				success: true,
				message: `Thanks for subscribing${name ? `, ${name}` : ''}!`,
				email,
				subscribedAt: new Date().toISOString(),
			}),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				success: false,
				error: 'Invalid request body',
			}),
			{ status: 400, headers: { 'Content-Type': 'application/json' } }
		);
	}
};

export const GET: APIRoute = async () => {
	return new Response(
		JSON.stringify({
			endpoint: '/api/subscribe',
			methods: ['POST'],
			description: 'Newsletter subscription endpoint',
			body: {
				email: 'string (required)',
				name: 'string (optional)',
			},
		}),
		{ status: 200, headers: { 'Content-Type': 'application/json' } }
	);
};
