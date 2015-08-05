module.exports = {
	series: "Simpsons",
	characters: ["Homer", "Bart", "Lisa", "Maggie"],
	prop1: {
		prop2: {
			prop3: {
				prop4: {
					prop5: {
						prop6: "value"
					},
					prop7: "value7"
				},
				prop8: "value8"
			},
			prop9: "value9"
		},
		prop10: "value10"
	},
	seasons: [
		{
			name: "Season 1",
			episodes: [
				{
					episodeNumber: 1,
					name: "Simpsons - 01 - Simpsons Roasting on an Open Fire",
					directedBy: ["David Silverman"],
					writtenBy: {
						firstName: "Mimi",
						lastName: "Pond"
					}
				},
				{
					episodeNumber: 2,
					name: "Simpsons - 01 - Bart the Genius",
					directedBy: ["David Silverman"],
					writtenBy: {
						firstName: "Jon",
						lastName: "Vitti"
					}
				},
				{
					episodeNumber: 3,
					name: "Simpsons - 01 - Homer's Odyssey",
					directedBy: ["Wes Archer"],
					writtenBy: {
						firstName: "Jay",
						lastName: "Kogen"
					}
				},
				{
					episodeNumber: 4,
					name: "Simpsons - 01 - There's No Disgrace Like Home",
					directedBy: ["Gregg Vanzo","Kent Butterworth"],
					writtenBy: {
						firstName: "Al",
						lastName: "Jean"
					}
				}						
			]
		},
		{
			name: "Season 2",
			episodes: [
				{
					episodeNumber: 1,
					name: "Simpsons - 02 - Bart Gets an 'F'",
					directedBy: ["David Silverman"],
					writtenBy: {
						firstName: "David",
						lastName: "Stern"
					}
				},
				{
					episodeNumber: 2,
					name: "Simpsons - 02 - Simpson and Delilah",
					directedBy: ["Rich Moore"],
					writtenBy: {
						firstName: "Jon",
						lastName: "Vitti"
					}
				},
				{
					episodeNumber: 3,
					name: "Simpsons - 02 - Treehouse of Horror",
					directedBy: ["Rich Moore", "Wes Archer", "David Silverman"],
					writtenBy: {
						firstName: "Sam",
						lastName: "Simon"
					}
				},
				{
					episodeNumber: 4,
					name: "Simpsons - 02 - Two Cars in Every Garage and Three Eyes on Every Fish",
					directedBy: ["Gregg Vanzo", "Kent Butterworth"],
					writtenBy: {
						firstName: "John",
						lastName: "Swartzwelder"
					}
				}						
			]
		}
	]
};