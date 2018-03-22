'use strict';

var Cache = (function() {
  /**
   */
  function Cache() {
    this.map = {};
  }
  /**
   */
  Cache.prototype.add = function(factorType, handler) {
    if (!this.constants(factorType)) {
      this.map[factorType] = handler;
    }
  }
  /**
   */
  Cache.prototype.get = function(factorType) {
    var target = null;
    if (this.constants(factorType)) {
      target = this.map[factorType];
    }
    return target;
  }
  /**
   */
  Cache.prototype.constants = function(factorType) {
    return this.map != null && this.map[factorType] != null;
  }
  /**
   */
  return Cache;
})();

module.exports = Cache;

/*
var Item = (function() {

  function Item(_compile, _fn) {
    this._compile = _compile;
    this._fn = _fn;
  }

  var defineProperty = [{
    key: 'compile',
    get: function() {
      return this._compile;
    }
  }, {
    key: 'fn',
    get: function() {
      return this._fn;
    }
  }];

  return CreateClass.make(GenerateProcess, defineProperty);

})();
*/
