export interface GalleryItem {
	id: string;
	title: string;
	image: string;
	category: string;
	description: string;
	details: string[];
}

export const galleryItems: GalleryItem[] = [
	{
		id: 'cosmic-nebula',
		title: 'Cosmic Nebula',
		image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&h=800&fit=crop',
		category: 'Space',
		description: 'A stunning view of colorful gas clouds in deep space, showcasing the birthplace of new stars. These cosmic nurseries span light-years across and contain enough material to form thousands of solar systems.',
		details: [
			'Distance: 7,000 light-years from Earth',
			'Size: Approximately 10 light-years across',
			'Composition: Hydrogen, helium, and trace elements',
			'Age: Estimated 10,000 years old',
		],
	},
	{
		id: 'mountain-dawn',
		title: 'Mountain Dawn',
		image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
		category: 'Nature',
		description: 'Golden light breaks over snow-capped peaks, painting the mountains in warm hues. This magical moment lasts only minutes as the sun rises, transforming the landscape from blue shadows to golden brilliance.',
		details: [
			'Location: Alpine mountain range',
			'Elevation: 4,500 meters above sea level',
			'Best time: Early morning, clear days',
			'Temperature: -15°C at dawn',
		],
	},
	{
		id: 'ocean-depths',
		title: 'Ocean Depths',
		image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=800&fit=crop',
		category: 'Ocean',
		description: 'The mysterious blue world beneath the waves, where light fades into darkness. The ocean contains 97% of Earth\'s water and remains largely unexplored, hiding countless secrets in its depths.',
		details: [
			'Depth: 200-1000 meters (Twilight Zone)',
			'Light: Less than 1% of surface light',
			'Pressure: Up to 100 atmospheres',
			'Temperature: 4-10°C',
		],
	},
	{
		id: 'aurora-dance',
		title: 'Aurora Dance',
		image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&h=800&fit=crop',
		category: 'Sky',
		description: 'Northern lights paint the night sky with ethereal greens and purples. This natural light display occurs when charged particles from the sun interact with gases in Earth\'s atmosphere.',
		details: [
			'Altitude: 100-300 km above Earth',
			'Colors: Green (oxygen), Purple/Red (nitrogen)',
			'Best viewing: 65-72° latitude',
			'Season: September to March',
		],
	},
	{
		id: 'desert-sunset',
		title: 'Desert Sunset',
		image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&h=800&fit=crop',
		category: 'Desert',
		description: 'The sun dips below endless dunes, creating a gradient of warm desert colors. Deserts cover about 33% of Earth\'s land surface and experience some of the most dramatic temperature swings on the planet.',
		details: [
			'Location: Sahara Desert region',
			'Temperature swing: 40°C+ daily variance',
			'Dune height: Up to 180 meters',
			'Annual rainfall: Less than 250mm',
		],
	},
	{
		id: 'forest-mist',
		title: 'Forest Mist',
		image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=800&fit=crop',
		category: 'Forest',
		description: 'Ancient trees emerge from morning fog, creating a mystical woodland scene. Old-growth forests like this one can be hundreds of years old, harboring complex ecosystems with thousands of species.',
		details: [
			'Tree age: 200-500 years',
			'Canopy height: 40-60 meters',
			'Biodiversity: 1000+ species per hectare',
			'Carbon storage: 500+ tons per hectare',
		],
	},
];
