"use strict";

var CreateClass = require('../reflec/create_class');
var GenerateProcess = (function() {
  /**
  */
  function GenerateProcess() {
    this._statement = null;
    this._response = null;
  }
  /**
  */
  var defineProperty = [{
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
  }];

  return CreateClass.make(GenerateProcess, defineProperty);

})();


module.exports = GenerateProcess;
