'use strict';
/**
 */
var CreateClass = require('../reflec/create_class');
/**@Class*/
var Injector = (function() {
    var instance;
    /**
     */
    function Injector() {
        this.dependencies = {};
        this.build = {};
    }
    /**
     */
    Injector.prototype.register = function(key, value) {
        this.dependencies[key] = require(value);
    };
    Injector.prototype.subRegister = function(key, index, value) {
        if (this.dependencies[key] != null) {
            this.dependencies[key][index] = require(value);
        } else {
            this.dependencies[key] = [];
            this.dependencies[key][index] = require(value);
        }
    }
    /**
     */
    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }
    /**
     */
    function isObject(dependency) {
        return Object.prototype.toString.call(dependency);
    }
    /**
     */
    Injector.prototype.getArguments = function(dependency, callback, injector) {
        if (dependency) {
            var strArgs = dependency.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1];
            if (!isBlank(strArgs)) {
                var argument = strArgs.replace(/ /g, '').split(',');
                for (var i = 0; i < argument.length; i++) {
                    if (injector != null && argument[i] in injector) {
                        callback.apply(this, [injector[argument[i]]]);
                    } else {
                        callback.apply(this, [argument[i]]);
                    }
                }
            }
        }
    }
    /**
     */
    Injector.prototype.forArrayInstance = function(_array, callback) {
        for (var key in _array) {
            if (Object.prototype.hasOwnProperty.call(_array, key)) {
                callback(key, _array[key]);
            }
        }
    }
    /**
     */
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    /**
     */
    Injector.prototype.instance = function(dependency) {
        var $scope = {};
        var _this = {};
        var pipe = false;
        var func = null;
        var injector = {};
        var args = [];
        if (dependency != null && dependency.fn != null) {
            if (dependency.inject != null) {
                for (var key in dependency.inject) {
                    if (Object.prototype.hasOwnProperty.call(dependency.inject, key)) {
                        var ElementInject = dependency.inject[key];
                        if (ElementInject != null && ElementInject.Class != null) {
                            var target = [];
                            var empty = new Object();
                            empty.__proto__ = ElementInject.Class.prototype
                            ElementInject.Class.apply(empty, ElementInject.Target);
                            _this[key] = empty;
                        }
                    }
                }
            }
            switch (isObject(dependency.fn)) {
                case '[object Function]':
                    this.getArguments(dependency.fn, function(name) {
                        if ('$scope' === name) {
                            args.push($scope);
                        } else if (name in this.dependencies) {
                            args.push((name in this.build) ? this.build[name] : this.build[name] = this.instance(this.dependencies[name]));
                        } else {
                            args.push(new Error('Not found dependency [' + name + ']'));
                        }
                    });
                    pipe = true;
                    dependency.fn.apply(_this, args);
                    break;
                case '[object Array]':
                    this.forArrayInstance(dependency.fn, function(index, item) {
                        if (isObject(item) === '[object Function]') {
                            func = item;
                        } else if (isObject(item) === '[object String]' && item.indexOf(':') > -1) {
                            var _array = item.split(':');
                            injector[_array[1]] = _array[0];
                        }
                    });
                    if (func != null) {
                        this.getArguments(func, function(name) {
                            if ('$scope' === name) {
                                args.push($scope);
                            } else if (name in this.dependencies) {
                                args.push((name in this.build) ? this.build[name] : this.build[name] = this.instance(this.dependencies[name]));
                            } else {
                                args.push(new Error('Not found dependency [' + name + ']'));
                            }
                        }, injector);
                        func.apply(_this, args);
                        pipe = true;
                    }
                    break;
            }
            if (pipe) {
                if (dependency.implements != null) {
                    for (var i = 0; i < dependency.implements.length; i++) {
                        dependency.implements[i]().call($scope);
                    }
                }
                return (function() {
                    return $scope;
                })();
            } else {
                return (function() {
                    return new Error('Error [object Function]' + dependency);
                })();
            }
        }
    }
    /**
     */
    Injector.prototype.forDependency = function(callback) {
        for (var key in this.dependencies) {
            if (Object.prototype.hasOwnProperty.call(this.dependencies, key)) {
                callback(key, this.dependencies[key]);
            }
        }
    }
    /**
     */
    Injector.prototype.resolve = function(callback) {
        this.forDependency((key, item) => {
            //console.log(key);
            //console.log(isObject(item));
            if (isObject(item) === '[object Array]') {
                var _ArrayInstance = [];
                for (var i = 0; i < item.length; i++) {
                    _ArrayInstance.push(this.instance(item[i]));
                }
                callback(key, _ArrayInstance);
            } else {
                callback(key, this.instance(item));
            }
        });
    };
    return {
        getInstance: function() {
            if (null == instance) {
                instance = new Injector();
            }
            return instance;
        }
    };
})();
module.exports = Injector;
/*
var injector = Injector.getInstance();

injector.register('service', function() {
  return {
    name: 'Service'
  };
});

injector.register('router', ['cleanService:clean', function(clean, service) {
  return {
    name: "Router"
  };
}]);

injector.register('cleanService', function($scope, service) {
  $scope.clean = "cleanService";
});

injector.register('controller', function(router, service) {
  return {};
});

injector.resolve(function(key, fn) {
  console.log(key + ' - > ' + fn());
});
*/