"use strict";

var CreateClass = require('../reflec/create_class');

var LearnResponse = (function() {
  /***/
  function LearnResponse() {
    this._text = null;
  }
  /**
  */
  var definitionProperty = [{
    key: 'text',
    get: function() {
      return this._text;
    },
    set: function(text) {
      this._text = text;
    }
  }];

  return CreateClass.make(LearnResponse, defineProperty);

})();


module.exports = LearnResponse;
