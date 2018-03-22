"use strict";
var Path = require('./path');
/**
*/
if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match;
    });
  };
}
if (!Object.isType) {
  Object.isType = function(_this, str) {
    return Object.getType(_this) === str;
  }
}

if (!Object.getType) {
  Object.getType = function(_this) {
    return Object.prototype.toString.call(_this);
  }
}

var isObject = function(_this, str) {
  return Object.prototype.toString.call(_this) === str;
};

if (!Array.prototype.each) {
  Array.prototype.each = function(callback) {
    for (var key in this) {
      if (Object.prototype.hasOwnProperty.call(this, key)) {
        callback(this[key], key);
      }
    }
  }
}

module.exports = {
  String,
  Object,
  Path,
  Array
};
