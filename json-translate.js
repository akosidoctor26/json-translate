var _ = require("underscore");

module.exports = function(sourceObject, destinationObject) {
	return traverseDestination(sourceObject, destinationObject, {});
};

function traverseDestination(sourceObject, destinationObject, result) {
	
	for(var destinationKey in destinationObject) {		
		
		var sourceKey = destinationObject[destinationKey]; // the property in the source Json
		
		if(!_.isArray(sourceKey) && _.isObject(sourceKey)) {
			result[destinationKey] = {};
			traverseDestination(sourceObject, sourceKey, result[destinationKey]);
		}
		else if(_.isString(sourceKey)) {
			//If sourceKey is string 
			//the value is in the first level properties of the source object
			result[destinationKey] = sourceObject[sourceKey];
		} 
		else if(_.isArray(sourceKey)) {
			//If sourceKey is array
			//the value is nested within the source object
			result[destinationKey] = traverseSourceObject(sourceObject, sourceKey, 0);
		}
	}
	
	return result;
}


//sourceObject is the actual object
//arraySource is formatted like this ["teams", ["sites", ["s1", "s2"]]]
//index starts at 0
function traverseSourceObject(sourceObject, arraySource, index) {
	//get source property name at index 0, this is also at the 1st level property
	var sourceKey = arraySource[index];
	
	if(!sourceKey) {
		return sourceObject;
	}
	
	if(!sourceObject) {
		return null;
	}
	
	//if sourceKey item is string 
	if(_.isString(sourceKey)) {
		//get the value of that property then loop again to next item in the arraySource
		return traverseSourceObject(sourceObject[sourceKey] || null, arraySource, index + 1);
	} 
	//if sourceKey item is array 
	else if(_.isArray(sourceKey)){
		//the value in the sourceObject contains an array
		//with a property name in the first item in the sourceKey
		//pluck so that it will return the values only of the property
		var value = _.pluck(sourceObject, _.first(sourceKey));
		
		//if the first item is a string then we are done
		if(!_.isObject(_.first(value))) {
			return value;
		}
		//if not string then it must be an object or array within the value
		else if(_.isArray(_.first(value))) {
			return traverseSourceObject(_.flatten(value, false), sourceKey, index);	
		}
		else {
			return traverseSourceObject( _.pluck(value, sourceKey[index]), sourceKey, index + 1);
		}
	}
}