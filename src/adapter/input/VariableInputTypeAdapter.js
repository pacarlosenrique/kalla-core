require('../../reflec/util');
var __extends = (this && this.__extends) || (function() {
	var extendStatics = Object.setPrototypeOf || ({
			__proto__: []
		}
		instanceof Array && function(d, b) {
			d.__proto__ = b;
		}) || function(d, b) {
		for (var p in b)
			if (b.hasOwnProperty(p)) d[p] = b[p];
	};
	return function(d, b) {
		extendStatics(d, b);

		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
})();
var StatementMixin = /** @class */ (function() {
	function StatementMixin() {
		this.tags = [];
	}
	StatementMixin.prototype.getTags = function() {
		this.tags;
	};
	StatementMixin.prototype.addTags = function(tags) {
		for (var i = 0; i < tags.length; i++) {
			this.tags.push(tags[i]);
		}
	};
	return StatementMixin;
}());
var Statement = /** @class */ (function(_super) {
	__extends(Statement, _super);

	function Statement(inputText) {
		var _this = _super.call(this) || this;
		_this.extra_data = [];
		_this.in_response_to = [];
		_this.confidence = 0;
		_this.text = inputText;
		return _this;
	}
	Statement.prototype.addExtraData = function(key, value) {
		this._extra_data[key] = value;
	};
	Statement.prototype.addResponse = function(response) {
		console.log(this.in_response_to);
		for (var i = 0; i < this.in_response_to.length; i++) {
			console.log(response.text);

			if (response.text == this.in_response_to[i].text) {
				this.in_response_to[i].ocurrence += 1;
			}
		}
	};
	Statement.prototype.getResponseCount = function(statement) {
		var ocurrence = 0;
		for (var i = 0; i < this._in_response_to.length; i++) {
			if (statement.text == this._in_response_to[i].text) {
				ocurrence = this._in_response_to[i].ocurrence;
			}
		}
		return ocurrence;
	};
	return Statement;
}(StatementMixin));
var InputAdapter = /** @class */ (function() {
	function InputAdapter() {}
	InputAdapter.prototype.processInputStatement = function(inputText) {
		var inputStatement = this.processInput(inputText);
		if (inputStatement != null) {
			this.existingStatement = this.getStorage().find(inputStatement.text);
			if (this.existingStatement != null) {
				inputStatement = this.existingStatement;
			}
		}
		return inputStatement;
	};
	return InputAdapter;
}());
var VariableInputTypeAdapter = /** @class */ (function(_super) {
	__extends(VariableInputTypeAdapter, _super);

	function VariableInputTypeAdapter() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	VariableInputTypeAdapter.prototype.setStorage = function(storage) {
		this.storage = storage;
	};
	VariableInputTypeAdapter.prototype.getStorage = function() {
		return this.storage;
	};
	VariableInputTypeAdapter.prototype.processInput = function(inputText) {
		var typeInput = Object.prototype.toString.call(inputText);

		if (typeInput === '[object String]') {
			return new Statement(inputText);
		} else {
			return inputText;
		}
	};
	return VariableInputTypeAdapter;
}(InputAdapter));
module.exports = {
	inject: {
		variableInput: {
			Class: VariableInputTypeAdapter,
			Target: []
		}
	},
	fn: ['$scope', 'ADAPTER-STORAGE:storage', function($scope, storage) {
		var _this = this;
		_this.variableInput.setStorage(storage);
		$scope.processInputStatement = function(inputText) {
			return _this.variableInput.processInputStatement(inputText);
		};
	}]
};