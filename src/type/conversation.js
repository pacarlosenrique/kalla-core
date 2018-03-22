'use strict';

var ConversationType;
/**
 */
(function(ConversationType) {
  /*
   */
  ConversationType[ConversationType["TRAINER"] = "CONVERSATION-TRAINER"] = "TRAINER";
  /**
   */
  ConversationType.GET = function(id) {
    return ConversationType[id];
  };

})(ConversationType || (ConversationType = {}));

module.exports = ConversationType;
