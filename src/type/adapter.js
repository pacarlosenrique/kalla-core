'use strict';

var AdapterType;
/**
 */
(function(AdapterType) {
  /*
   */
  AdapterType[AdapterType["INPUT"] = 'ADAPTER-INPUT'] = "INPUT";
  /*
   */
  AdapterType[AdapterType["OUTPUT"] = 'ADAPTER-OUTPUT'] = "OUTPUT";
  /**
   */
  AdapterType[AdapterType["LOGIC"] = 'ADAPTER-LOGIC'] = "LOGIC";
  /**
   */
  AdapterType[AdapterType["STORAGE"] = 'ADAPTER-STORAGE'] = "STORAGE";
  /**
   */
  AdapterType.GET = function(id) {
    return AdapterType[id];
  };

})(AdapterType || (AdapterType = {}));

module.exports = AdapterType;
