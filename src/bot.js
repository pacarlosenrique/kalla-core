~``
"use strict";
var CreateClass = require('./reflec/create_class');
var Factory = require('./config/factory');

var FACTORYTYPE = require('./type/factory');

/*
var ADAPTER = require('./type/adapter');
var COMMONS = require('./type/commons');
var CONVERSATION = require('./type/conversation');
*/
var DefineProperty = (function() {
  var defineProperty = [];
  var property = {
    storage: function() {
      return this.factory.get(FACTORYTYPE.ADAPTER.STORAGE);
    },
    input: function() {
      return this.factory.get(FACTORYTYPE.ADAPTER.INPUT);
    },
    logic: function() {
      return this.factory.get(FACTORYTYPE.ADAPTER.LOGIC);
    },
    output: function() {
      return this.factory.get(FACTORYTYPE.ADAPTER.OUTPUT);
    },
    preprocesor: function() {
      return this.factory.get(FACTORYTYPE.COMMONS.PREPROCESOR);
    },
    trainer: function() {
      return this.factory.get(FACTORYTYPE.COMMONS.CONVERSATION);
    }
  };

  Object.keys(property).forEach(function(nextkey) {
    if (Object.prototype.hasOwnProperty.call(property, nextkey)) {
      defineProperty.push({
        key: nextkey,
        get: property[nextkey]
      });
    }
  });
  return defineProperty;
})();

var Bot = (function() {
  /**
  */
  function Bot(args, readOnly) {
    this.readOnly = readOnly;
    this.idConversation = null;
    this.factory = Factory.getInstance(args);
  }
  /**
  */
  Bot.prototype.getResponse = function(inputItem) {
    if (this.validateConveration()) {
      var inputStatement = this.inputPreProcessor(inputItem);
      var generateStatement = this.generateResponse(inputStatement);
      var previousStatement = this.lastResponse();
      if (!this.readOnly) {
        this.learnResponse(generateStatement.statement, previousStatement);
        this.storage.addToConversation(this.idConversation, inputStatement, generateStatement.response);
      }
      return this.output.processResponse(this.idConversation, generateStatement.response);
    }
  }
  /**
  */
  Bot.prototype.inputPreProcessor = function(inputItem) {
    var inputStatement = this.input.preprocesorInputStatement(inputItem);
    if (inputStatement != null) {
      for (var i = 0; i < this.preprocesor.length; i++) {
        inputStatement = his.preprocesor[i](inputStatement);
      }
    }
    return inputStatement;
  }
  /**
  */
  Bot.prototype.generateResponse = function(inputStatement) {
    return this.storage.generateBaseQuery(this.idConversation);
  }
  /**
  */
  Bot.prototype.validateConveration = function() {
    if (this.idConversation == null) {
      console.log(this.storage);
      this.idConversation = this.storage.createConversation();
    }
    return this.idConversation != null;
  }
  /**
  */
  Bot.prototype.lastResponse = function() {
    return this.storage.getLastResponse(this.idConversation);
  }
  /**
  */
  return CreateClass.make(Bot, DefineProperty);
})();





console.log('--------------BOT------------------');
var bot = new Bot();
console.log(bot.input);
bot.getResponse("hola");
