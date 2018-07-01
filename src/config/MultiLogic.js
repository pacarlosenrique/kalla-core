"use strict";

var MultiLogic = /** @class */ (function() {
	function MultiLogic(adapter) {
		if (adapter === void 0) {
			adapter = [];
		}
		this.adapter = adapter;
	}
	MultiLogic.prototype.mostCommon = function(_array) {
		if (_array.length == 0)
			return null;
		var modeMap = {},
			maxCount = 1,
			modes = [_array[0]];
		for (var i = 0; i < _array.length; i++) {
			var el = _array[i];
			if (modeMap[el] == null)
				modeMap[el] = 1;
			else
				modeMap[el]++;
			if (modeMap[el] > maxCount) {
				modes = [el];
				maxCount = modeMap[el];
			} else if (modeMap[el] == maxCount) {
				modes.push(el);
				maxCount = modeMap[el];
			}
		}
		return modes;
	};;
	MultiLogic.prototype.process = function(statement) {
		var results = [];
		var result = null;
		var maxConfidence = -1;

		for (var i = 0; i < this.adapter.length; i++) {
			var adapter = this.adapter[i];

			if (adapter != null && adapter.process != null) {
				var output = adapter.process(statement);

				results.push(output);
				if (output.confidence > maxConfidence) {
					result = output;
					maxConfidence = output.confidence;
				}
			}
		}
		if (results.length >= 3) {
			var statements = [];
			for (var x = 0; x < results.length; x++) {
				statements.push(results[x].statement);
			}
			var most = this.mostCommon(statements);
			result = this.getGreatestConfidence(most[0], results);
		}
		return result;
	};
	MultiLogic.prototype.getGreatestConfidence = function(output, options) {
		var values = null;
		for (var i = 0; i < options.length; i++) {
			if (output.statement == options[i].statement) {
				values = options[i];
				break;
			}
		}
		return values;
	};
	return MultiLogic;
}());
module.exports = MultiLogic;