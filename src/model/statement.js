"use strict";
var CreateClass = require('../reflec/create_class');
module.exports = (function() {

	function Statement(id, text, confidence) {
		this.id = id;
		this.text = text;
		this.confidence = confidence;
		this.response_to = [];
	}
	Statement.prototype.getId = function() {
		return "#" + this.id.cluster + ":" + this.id.position;
	}
	Statement.prototype.addTags = function(tag) {
		if (tag != null) {
			this.tags.push(tag);
		}
	}
	Statement.prototype.addResponse = function(response) {
		if (response != null) {
			this.in_response_to.push(response);
		}
	}
	/**
	 */
	var defineProperty = [{
		key: 'id',
		get: function() {
			return this._id;
		},
		set: function(_id) {
			this._id = _id;
		}
	}, {
		key: 'text',
		get: function() {
			return this._text;
		},
		set: function(text) {
			this._text = text;
		}
	}, {
		key: 'in_tag_to',
		get: function() {
			return this._in_tag_to;
		},
		set: function(in_tag_to) {
			this._in_tag_to = in_tag_to;
		}
	}, {
		key: 'response_to',
		get: function() {
			return this._response_to;
		},
		set: function(response_to) {
			this._response_to = response_to;
		}
	}, {
		key: 'confidence',
		get: function() {
			return this._confidence;
		},
		set: function(confidence) {
			this._confidence = confidence;
		}
	}, {
		key: 'extra_data',
		get: function() {
			return this._extra_data;
		},
		set: function(extra_data) {
			this._extra_data = extra_data;
		}
	}];
	return CreateClass.make(Statement, defineProperty);
})();