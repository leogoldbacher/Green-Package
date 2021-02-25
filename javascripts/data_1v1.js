const data = {
	cities: [
		{
			id: 'W',
			name: 'Wien',
			coord: {
				lat: 48.20849,
				lon: 16.37208,
				x: 244.50334,
				y: 155.3298,
			},
			link: 'https://www.wien.at/',
		},
		{
			id: 'L',
			name: 'Linz',
			coord: {
				lat: 48.30639,
				lon: 14.28611,
				x: 179.01,
				y: 150.44,
			},

			link: 'https://www.linz.at/',
		},
		{
			id: 'I',
			name: 'Innsbruck',
			coord: {
				lat: 47.26266,
				lon: 11.39454,
				x: 88.21019,
				y: 198.44272,
			},
			link: 'https://www.innsbruck.at/',
		},
	],
	routes: [
		{
			c1: 'L',
			c2: 'W',
			costs: [
				{
					type: 'car',
					emission: 34.96,
					duration: 128,
				},
				{
					type: 'train',
					emission: 5.88,
					duration: 74,
				},
			],
		},
	],
};
