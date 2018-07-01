"use strict";
var CreateClass = require('../reflec/create_class');
module.exports = (function() {
    function Conversation(id) {
        //this._statement_id = null;
        this._conversation_id = id;
    }
    /**codigo debe ser implementado en el sqlAdapter
     */
    Conversation.prototype.getIdConversation = function() {
        return "#" + this.statement_id.cluster + ":" + this.statement_id.position;
    }
    var defineProperty = [{
        key: 'statement_id',
        get: function() {
            return this._statement_id;
        },
        set: function(statement_id) {
            this._statement_id = statement_id;
        }
    }, {
        key: 'conversation_id',
        get: function() {
            return this._conversation_id;
        },
        set: function(conversation_id) {
            this._conversation_id = conversation_id;
        }
    }];
    return CreateClass.make(Conversation, defineProperty);
})();