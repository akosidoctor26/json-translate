# json-translate
Translate json object to another json object
 * Rename property
 * Flatten json object
 * Get values from deep nested properties

##Usage
'var jsonTranslate = require("json-translate");'
'jsonTranslate(sourceObject, destDefinition);'

###Nested properties

```
var sourceObject = 
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

var result = jsonTranslate(data, destDefinition)
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
