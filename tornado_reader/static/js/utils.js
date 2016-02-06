(function(){

"use strict";

window._utils = {};


// iteration
var forEach;
if (Array.prototype.forEach) {
	var coreForEach = Array.prototype.forEach;
	forEach = function(collection, fn) {
		coreForEach.call(collection, fn);
	};
}
else {
	forEach = function(collection, fn) {
		for (var i = 0, len = collection.length; i < len; i++) {
			fn(collection[i], i);
		}
	};
}

var dict = function(iterable) {
	var dct = {};
	forEach(iterable, function(val) {
		dct[val[0]] = val[1];
	});
	return dct;
};

_utils.forEach = forEach;
_utils.dict = dict;

// Object utils
var has = function(array, key) {
	return Object.prototype.hasOwnProperty.call(array, key);
};

_utils.has = has;

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


// events

var triggerEvent = function(element, name, memo) {
	var event;
	if (document.createEvent) {
		event = document.createEvent('HTMLEvents');
		event.initEvent(name, true, true);
	}
	else {
		event = document.createEventObject();
		event.eventType = name;
	}

	event.eventName = name;
	event.memo = memo || { };

	if (document.createEvent) {
		element.dispatchEvent(event);
	}
	else {
		element.fireEvent("on" + event.eventType, event);
	}
};

var bindEvent = function(element, name, fn) {
	if (document.addEventListener) {
		element.addEventListener(name, fn, false);
	}
	else {
		element.attachEvent('on' + name, fn);
	}
};

var unbindEvent = function(element, name, fn) {
	if (document.removeEventListener) {
		element.removeEventListener(name, fn, false);
	}
	else {
		element.detachEvent('on' + name, fn);
	}

};

window._utils.triggerEvent = triggerEvent;
window._utils.bindEvent = bindEvent;
window._utils.unbindEvent = unbindEvent;

// forms
var serializeForm = function(formElement) {
	var q = [];
	var addParameter = function(name, value) {
		q.push([name, value]);
	};

	var elements = formElement.elements;
	_utils.forEach(elements, function(element) {
		if (element.name === '' || element.disabled) {
			return;
		}

		switch (element.nodeName.toLowerCase()) {
			case 'input':
				switch (element.type) {
					case 'text':
					case 'hidden':
					case 'password':
					case 'button':
					case 'number':
					case 'email':
						addParameter(element.name, element.value);
						break;
					case 'checkbox':
					case 'radio':
						if (element.checked) {
							addParameter(element.name, element.value);
						}
						break;
					case 'file':
					case 'reset':
					case 'submit':
						break;
				}
				break;
			case 'textarea':
				addParameter(element.name, element.value);
				break;
			case 'select':
				switch (element.type) {
					case 'select-one':
						addParameter(element.name, element.value);
						break;
					case 'select-multiple':
						_utils.forEach(formElement.options, function(option) {
							if (option.selected) {
								addParameter(element.name, option.value);
							}
						});
						break;
				}
				break;
			case 'button':
				break;
		}
	});

	return q;
};

window._utils.serializeForm = serializeForm;

})();
