'use strict';
var util = require('../reflec/util');
//var Component = require('./component');

var Build = (function() {
  /**
   */
  const propertyElement = ['LOGIC', 'FILTER'];
  /**
   */
  const propertyType = ['ADAPTER', 'CONVERSATION', 'COMMONS'];
  /**
   */
  const args = {
    'ADAPTER': {
      'STORAGE': 'adapter.storage.SqlStorageAdapter',
      'INPUT': 'adapter.input.VariableInputTypeAdapter',
      'OUTPUT': 'adapter.output.OutPutAdapter',
      'LOGIC': ['adapter.logic.NoKnowledgeAdapter']
    },
    'CONVERSATION': {
      'TRAINER': 'conversation.trainer.Trainer'
    },
    'COMMONS': {
      'PREPROCESOR': 'commons.preprocesor.CleanWhiteSpace',
      'FILTER': ['commons.filter.Filter']
    }
  };
  /**
   */
  function Build(target) {
    this.target = target;
  }
  /**
   */
  Build.prototype.make = function(callback) {
    if (callback != null) {
      for (var i = 0; i < propertyType.length; i++) {
        var name = propertyType[i];
        each.apply(this, [name, (key, item) => {
          callback(name, key, item);
        }]);
      }
    }
  }
  /**
   */
  function isValidTarget(name, key) {
    return this.target != null && this.target[name] != null && Object.keys(
        this.target[name]).length > 0 && this.target[name][key];
  }
  /**
  */
  Build.prototype.isValid = function(name, key) {
    var pipe = false;
    if (this.target != null && this.target[name]) {
      pipe = Object.keys(this.target[name]).length > 0 && this.target[name][key] != null;
    }
    return pipe;
  }
  /**
   */
  Build.prototype.item = function(name, source, key) {
    var to = null;
    if (Object.isType(source[key], '[object Array]')) {
      var sources = [];
      if (this.isValid(name, key)) {
        sources = this.target[name][key].concat(source[key]);
      } else {
        sources = source[key];
      }
      for (var i = 0; i < sources.length; i++) {
        sources[i] = util.Path.route(sources[i]);
      }
      to = sources;
    } else {
      if (this.isValid(name, key)) {
        to = util.Path.route(this.target[name][key]);
      } else {
        //console.log(Object.keys(util));
        to = util.Path.route(source[key]);
      }
    }
    return to;
  };
  /**
   */
  function each(name, callback) {
    var source = args[name];
    if (name != null && callback != null) {
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          callback(key, this.item(name, source, key));
        }
      }
    }
  }

  return Build;
})()

module.exports = Build;
