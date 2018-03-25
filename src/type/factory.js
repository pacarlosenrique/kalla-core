'use strict';
/**
 */
var CommonsType = require('./commons');
/**
 */
var AdapterType = require('./adapter');
/**
 */
var ConversationType = require('./conversation');
var FactoryType;
var protperty = ['COMMONS', 'ADAPTER', 'CONVERSATION'];
/**
 */
(function(FactoryType) {
    /*
     */
    FactoryType[FactoryType["COMMONS"] = CommonsType] = "COMMONS";
    /*
     */
    FactoryType[FactoryType["ADAPTER"] = AdapterType] = "ADAPTER";
    /**
     */
    FactoryType[FactoryType["CONVERSATION"] = ConversationType] = "CONVERSATION";
    /**
     */
    FactoryType.GET = function(category, key) {
        var factoryType = FactoryType[category];
        var result = null;
        if (factoryType != null) {
            result = factoryType.GET(key);
        }
        return result;
    };
    FactoryType.each = function(callback) {
        if (callback != null) {
            for (var i = protperty.length - 1; i >= 0; i--) {
                var name = protperty[i];
                callback(name, FactoryType[name]);
            }
            /*
            for (var index in protperty) {
                //if (Object.prototype.toString.call(factoryType) == '[object String]') {
                //    console.log(factoryType);
                console.log(FactoryType[index]);
                callback(factoryType, FactoryType[factoryType]);
                //}
            }*/
        }
    }
})(FactoryType || (FactoryType = {}));
module.exports = FactoryType;
//console.log(FactoryType.COMMONS.PREPROCESOR);
//console.log(FactoryType.COMMONS.GET('PREPROCESOR'));