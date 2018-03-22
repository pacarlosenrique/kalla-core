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

})(FactoryType || (FactoryType = {}));

module.exports = FactoryType;

//console.log(FactoryType.COMMONS.PREPROCESOR);
//console.log(FactoryType.COMMONS.GET('PREPROCESOR'));
