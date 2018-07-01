"use strict";
/**
 */
require('./util');
var CreateClass = (function() {
    /**
     */
    function CreateClass() {}
    /**
     */
    CreateClass.defineProperties = function(target, props) {
       
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            if (descriptor != null) {
                var properties = {};
                properties = {};
                properties.get = descriptor.get;
                properties.set = descriptor.set;
                properties.enumerable = descriptor.enumerable || true;
                properties.configurable = true;
                //descriptor.enumerable = descriptor.enumerable || true;
                //descriptor.configurable = true;
                if ("value" in descriptor) {
                    properties.writable = true;
                    //  descriptor.writable = true;
                }
                Object.defineProperty(target,descriptor.key, properties);
            }
        }
       // console.log(target);
        //return target;
        //console.log(properties);
        //console.log(target);
        //console.log(Object.defineProperty);
      //  Object.defineProperty(target, properties);
        // Object.defineProperty(target, descriptor.key, descriptor);
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
                    get: new Function('fn', "return function get(){ return this._{0};}".format(args))(),
                    set: new Function('fn', "return function set({0}){ this._{0}={0};}".format(args))()
                };
                targetDescriptor.push(descriptor);
            }
        }
        return targetDescriptor;
    }
    /**
     */
    CreateClass.getArgsFunction = function(fn) {
        var strArgs = fn.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1];
        var args = [];
        if (!Object.isBlank(strArgs)) {
            args = strArgs.replace(/ /g, '').split(',');
        }
        return args;
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
    CreateClass.make = function(Constructor, protoProps, staticProps) {
        if (protoProps) {
           //Constructor =  
           CreateClass.defineProperties(Constructor.prototype, protoProps);
        }
        /* if (staticProps) {
             Object.defineProperties(Constructor, staticProps);
         }*/
        return Constructor;
    }
    /**
     */
    CreateClass.makeInterface = function(name, target) {
        var fn = null;
        if (name != null) {
            var conditional = "";
            for (var i = 0; i < target.length; i++) {
                conditional = conditional + "if (this.{1} === undefined) {\n throw new ReferenceError('method not fount[{0}.{1}]');\n} \n".format(name, target[i]);
            }
            fn = new Function('fn', "return function {0}(){\n {1} \n}".format(name, conditional));
        }
        return fn;
    }
    /**
     */
    CreateClass.inherits = function(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : (subClass.__proto__ = superClass);
    }
    /**
     */
    return CreateClass;
})();
module.exports = CreateClass;