"use strict";
/**
*/
require('./util');

var CreateClass = (function() {
  /**
   */
  function CreateClass() {
  }
  /**
   */
  CreateClass.defineProperties = function(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      if (descriptor != null) {
        descriptor.enumerable = descriptor.enumerable || true;
        descriptor.configurable = true;
        if ("value" in descriptor) {
          descriptor.writable = true;
        }
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }
  }
  /**
  */
  CreateClass.defineGetterAndSetter = function() {
    var targetDescriptor = [];
    for (var i = 0; i < arguments.length; i++) {
      var args = arguments[i];
      if (args != null) {
        var descriptor = {
          key: args,
          get: new Function('fn',
            "return function get(){ return this._{0};}".format(args)
          )(),
          set: new Function('fn',
            "return function set({0}){ this._{0}={0};}".format(args)
          )()
        };
        targetDescriptor.push(descriptor);
      }
    }
    return targetDescriptor;
  }
  /**
   */
  CreateClass.callCheck = function(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };
  /**
   */
  CreateClass.make = function(Constructor, protoProps,
    staticProps) {
    if (protoProps) {
      CreateClass.defineProperties(Constructor.prototype, protoProps);
    }
    if (staticProps) {
      CreateClass.defineProperties(Constructor, staticProps);
    }
    return Constructor;
  };

  return CreateClass;
})();

module.exports = CreateClass;
