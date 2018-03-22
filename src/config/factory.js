'use strict';
var util = require('../reflec/util');

var FACTORYTYPE = require('../type/factory');

var Injector = require('./injector');
var Build = require('./build');
var Cache = require('./cache');

var Factory = /**@Class*/ (function() {

  var instance;

  function Factory() {
    this.injector = Injector.getInstance();
    this.cache = new Cache();
  }

  Factory.prototype.get = function(factoryType) {
    return this.cache.get(factoryType);
  }

  Factory.prototype.all = function() {
    return this.cache;
  }
  /**
  */
  Factory.prototype.subscribe = function(factoryType, fn) {
    this.injector.register(factoryType, fn);
  }
  /**
      this.subscribe.sub(index,factoryType, fn);
  */
  Factory.prototype.subSubscribe = function(index, factoryType, fn) {
    this.injector.register(String("{0}-{1}").format(factoryType, index), fn);
  }
  /**
  */
  Factory.prototype.publish = function() {
    this.injector.resolve((type, fn) => {
      if (type != null) {
        this.cache.add(type, fn);
      }
    });
  }
  /**
  */
  return {
    getInstance: function(arg) {
      if (null == instance) {
        instance = new Factory();
        new Build(arg).make(function(category, key, fn) {
          if (Object.isType(fn, '[object Array]')) {
            for (var i = 0; i < fn.length; i++) {
              instance.subSubscribe(i, FACTORYTYPE.GET(category, key), fn[i]);
            }
          } else {
            instance.subscribe(FACTORYTYPE.GET(category, key), fn);
          }
        });
        instance.publish();
      }
      return instance;
    }
  };
})();


module.exports = Factory;

//var factory = Factory.getInstance({});

//console.log(factory.get(FACTORYTYPE.ADAPTER.INPUT));
//console.log(factory.all());
