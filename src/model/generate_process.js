"use strict";
/***/
var CreateClass = require('../reflec/create_class');
/***/
var GenerateProcess = (function(createClass) {
  /***/
  return createClass.make(function GenerateProcess() {}, [{
    key: 'statement',
    get: function() {
      return this._statement;
    },
    set: function(statement) {
      this._statement = statement;
    }
  }, {
    key: 'response',
    get: function() {
      return this._response;
    },
    set: function(response) {
      this._response = response;
    }
  }]);
})(CreateClass);

module.exports = GenerateProcess;