# json-translate
Translate json object to another json object
 * Define new property name in your new json object
 * Flatten json object
 * Get values from deep nested properties

##Installation

##Usage
```
var jsonTranslate = require("json-translate");
var newJson = jsonTranslate(sourceJson, destDefinition);
```

E.g.
To get value from object hierarchy

*Source Json*
```
property1: {
    myObject: "My Object"
}
```
define it in an array with property name values`["property1", "myObject"]`

To get value of a property from array of objects
*Source Json*
```
property1 : [
	{
		myObject: "My Object 1"
	},
	{
		myObject: "My Object 2"
	},
	{
		myObject: "My Object 3"
	},
	{
		myObject: "My Object 4"
	}
]
```
Put "myObject" property in an array in your definition to say that "property1" contains an array of objects that has property "myObject" `["property1", ["myObject]]`
Adding a third item in the array will not be read `["property1", ["myObject], "ignore"]`

Its also possible to have nested object in an array of objects
*Source Json*
```
property1: [
	{
		myObject: {
			anotherObject: "Another Object"
		}
	},
	{
		myObject: {
			anotherObject: "Another Object"
		}
	},
	{
		myObject: {
			anotherObject: "Another Object"
		}
	}
]
```
Then your definition should look like this now `["property1", ["myObject", "anotherObject"]]` .
You can still add items after "anotherObject" as long as values inside "anotherObject" is nested objects.

##More examples

###Nested properties

```
var originalJson = 
{
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
}
	
var destDefinition = {
	value: ["prop1", "prop2", "prop3", "prop4", "prop5", "prop6"],
	value7: ["prop1", "prop2", "prop3", "prop4", "prop7"],
	value8: ["prop1", "prop2", "prop3", "prop8"],
	value9: ["prop1", "prop2", "prop9"],
	value10: ["prop1", "prop10"]
};

var result = jsonTranslate(originalJson, destDefinition);
```

The result will be 
```
{ 
	value: "value",
	value7: "value7" ,
	value8: "value8",
	value9: "value9",
	value10: "value10"
}
```

###Array of Objects
```
var originalJson = 
{
students: [
	{
		name: "Student 1",
		grades: [
			{
				q1: "A",
				q2: "A+",
				q3: "D",
				q4: "D+"
			}
		]
	},
	{
		name: "Student 2",
		grades: [
			{
				q1: "B",
				q2: "B+",
				q3: "E",
				q4: "E+"
			}
		]
	},
	{
		name: "Student 3",
		grades: [
			{
				q1: "C",
				q2: "C+",
				q3: "F",
				q4: "F+"
			}
		]
	},
]
};

var destDefinition = {
	q1Grades: ["students", ["grades",["q1"]]],
	q2Grades: ["students", ["grades",["q2"]]],
	q3Grades: ["students", ["grades",["q3"]]],
	q4Grades: ["students", ["grades",["q4"]]]
}
var result = jsonTranslate(originalJson, destDefinition);
```

The result will be
```
{
	q1Grades: ["A", "B", "C"],
	q2Grades: ["A+", "B+", "C+"],
	q3Grades: ["D", "E", "F"],
	q4Grades: ["D+", "E+", "F+"],
}
```
