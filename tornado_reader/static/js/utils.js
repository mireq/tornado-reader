(function(){

"use strict";

window._utils = {};

// DOM
var el = document.createElement('DIV');

var elem = function(elementName, attrs, content) {
	var element = document.createElement(elementName);
	if (attrs !== undefined) {
		for (var attrName in attrs) {
			if (has(attrs, attrName)) {
				element.setAttribute(attrName, attrs[attrName]);
			}
		}
	}

	if (content !== undefined) {
		element.appendChild(document.createTextNode(content));
	}
	return element;
};

var elemAppend = function(parent, elementName, attrs, content) {
	var el = elem(elementName, attrs, content);
	parent.appendChild(el);
	return el;
};

var byId = function(elementId) {
	return document.getElementById(elementId);
};

var byCls;
if (el.getElementsByClassName === undefined) {
	byCls = function(parent, cls) {
		var elements = parent.getElementsByTagName('*');
		var match = [];
		for (var i = 0, leni = elements.length; i < leni; i++) {
			if (hasClass(elements[i], cls)) {
				match.push(elements[i]);
			}
		}
		return match;
	};
}
else {
	byCls = function(parent, cls) {
		return parent.getElementsByClassName(cls);
	};
}

_utils.elem = elem;
_utils.elemAppend = elemAppend;
_utils.id = byId;
_utils.cls = byCls;

})();
