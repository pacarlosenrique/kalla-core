'use strict';

var CommonsType;
/**
 */
(function(CommonsType) {
  /*
   */
  CommonsType[CommonsType["PREPROCESOR"] = 'COMMONS-PREPROCESOR'] = "PREPROCESOR";
  /*
   */
  CommonsType[CommonsType["FILTER"] = 'COMMONS-FILTER'] = "FILTER";
  /**
   */
  CommonsType.GET = function(id) {
    return CommonsType[id];
  };

})(CommonsType || (CommonsType = {}));

module.exports = CommonsType;
