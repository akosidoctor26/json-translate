var jsonTranslate = require("../json-translate");
var expect = require("chai").expect;
var data = require("./data");

		
describe("json-translate", function() {
	
	it("should get value from deep nested objects", function() {
		var destDefinition = {
			value: ["prop1", "prop2", "prop3", "prop4", "prop5", "prop6"],
			value7: ["prop1", "prop2", "prop3", "prop4", "prop7"],
			value8: ["prop1", "prop2", "prop3", "prop8"],
			value9: ["prop1", "prop2", "prop9"],
			value10: ["prop1", "prop10"]
		};
		expect(jsonTranslate(data, destDefinition))
			.to.deep.equal({ 
				value: "value",
				value7: "value7" ,
				value8: "value8",
				value9: "value9",
				value10: "value10"
			});
	});
	
	it("should assign value to nested destination objects", function() {
		var destDefinition = {
			series: ["series"],
			dummy: {
				dummy1: {
					value: ["prop1", "prop2", "prop3", "prop4", "prop5", "prop6"]
				},
				dummy2: {
					value7: ["prop1", "prop2", "prop3", "prop4", "prop7"]
				},
				dummy3: {
					dummy4: {
						value8: ["prop1", "prop2", "prop3", "prop8"]
					},
					dummy5: {
						dummy6: {
							value9: ["prop1", "prop2", "prop9"]
						}
					}
				}
			}
		};
		
		expect(jsonTranslate(data, destDefinition)).to.deep.equal({
			dummy: {
				dummy1: {
					value: "value"
				},
				dummy2: {
					value7: "value7"
				},
				dummy3: {
					dummy4: {
						value8: "value8"
					},
					dummy5: {
						dummy6: {
							value9: "value9"
						}
					}
				}
			},
			series: "Simpsons"
		});
	});
	
	it("should get array values from source", function() {
		var destDefinition = {
			mainCharacters: {
				family: ["characters"]
			}
		}		
		
		expect(jsonTranslate(data, destDefinition)).to.deep.equal({
			mainCharacters: {
				family: ["Homer", "Bart", "Lisa", "Maggie"]	
			}
		});
	});
	
	it("should pluck value from array source", function(){
		var destDefinition = {
			seasons: ["seasons", ["name"]],
			episodes: ["seasons", ["episodes", ["name"]]],
			// directors: ["seasons", ["episodes", ["directedBy"]]],
		}		
		
		expect(jsonTranslate(data, destDefinition)).to.deep.equal({
			seasons: ["Season 1", "Season 2"],
			episodes: ["Simpsons - 01 - Simpsons Roasting on an Open Fire",
				"Simpsons - 01 - Bart the Genius",
				"Simpsons - 01 - Homer's Odyssey",
				"Simpsons - 01 - There's No Disgrace Like Home",
				"Simpsons - 02 - Bart Gets an 'F'",
				"Simpsons - 02 - Simpson and Delilah",
				"Simpsons - 02 - Treehouse of Horror",
				"Simpsons - 02 - Two Cars in Every Garage and Three Eyes on Every Fish"
			],
			/*
			actual result: */
			// directors: [
			// 	["David Silverman"],
			// 	["David Silverman"],
			// 	["Wes Archer"],
			// 	["Gregg Vanzo",
			// 	"Kent Butterworth"],
			// 	["David Silverman"],
			// 	["Rich Moore"],
			// 	["Rich Moore",
			// 	"Wes Archer",
			// 	"David Silverman"],
			// 	["Gregg Vanzo",
			// 	"Kent Butterworth"]
			// ]
			
		});
	});
	
	it("should ignore from 3rd element if source is array - e.g. [prop1, [prop2], ignoreProp3]", function() {
		var destDefinition = {
			seasons: ["seasons", ["name"], "ignore"],
			episodes: ["seasons", ["episodes", ["name"], "ignore", "ignore"], "ignore"],
		}		
		
		expect(jsonTranslate(data, destDefinition)).to.deep.equal({
			seasons: ["Season 1", "Season 2"],
			episodes: ["Simpsons - 01 - Simpsons Roasting on an Open Fire",
				"Simpsons - 01 - Bart the Genius",
				"Simpsons - 01 - Homer's Odyssey",
				"Simpsons - 01 - There's No Disgrace Like Home",
				"Simpsons - 02 - Bart Gets an 'F'",
				"Simpsons - 02 - Simpson and Delilah",
				"Simpsons - 02 - Treehouse of Horror",
				"Simpsons - 02 - Two Cars in Every Garage and Three Eyes on Every Fish"
			]
		});
	});
	
	it("should get value from deep object in an array source", function() {
		var destDefinition = {
			writers: ["seasons", ["episodes", ["writtenBy", "firstName"]]]
		}
		
		expect(jsonTranslate(data, destDefinition)).to.deep.equal({
			writers: [
				"Mimi",
				"Jon",
				"Jay",
				"Al",
				"David",
				"Jon",
				"Sam",
				"John"
			]
		});
	});
	
	it("should assign null to destination object if property is not found in source", function() {
		var destDefinition = {
			noProp1: ["notExist1", "notExist2", "notExist3"],
			noProp2: ["notExist1", ["notExist2", ["notExist3"]]],
			noProp3: ["notExist"]
		};
		
		expect(jsonTranslate(data, destDefinition)).to.deep.equal({
			noProp1: null,
			noProp2: null,
			noProp3: null
		});
	});
});