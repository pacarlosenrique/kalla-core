"use strict";
var CreateClass = require('./reflec/create_class');
var Factory = require('./config/factory');
var FACTORYTYPE = require('./type/factory');
var MultiLogic = require('./config/MultiLogic');
var Conversation = require('./model/conversation');
var Response = require('./model/response');
var dirName = __dirname;
var targetDefault = {
    'ADAPTER': {
        'STORAGE': dirName + '/adapter/storage/SqlStorageAdapter',
        'INPUT': dirName + '/adapter/input/VariableInputTypeAdapter',
        'OUTPUT': dirName + '/adapter/output/OutPutAdapter',
        'LOGIC': [dirName + '/adapter/logic/NoKnowledgeAdapter']
    },
    'CONVERSATION': {
        'TRAINER': dirName + '/conversation/trainer/Trainer'
    },
    'COMMONS': {
        'PREPROCESOR': [dirName + '/commons/preprocesor/CleanWhiteSpace'],
        'FILTER': [dirName + '/commons/filter/Filter']
    }
};
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
    function Bot(target, readOnly) {
        this.readOnly = readOnly;
        this.idConversation = new Conversation("#21:3");
        this.factory = Factory.getInstance(targetDefault, target);
    }

    function factory(name, task) {
        return {
            name: name,
            execute: task
        };
    }

    function createIterator(_array) {
        var nextIndex = 0;
        return {
            next: function() {
                return nextIndex < _array.length ? {
                    name: _array[nextIndex].name,
                    value: _array[nextIndex++].execute,
                    done: false
                } : {
                    done: true
                };
            }
        }
    }
    /*
    var iter = createIterator([this.validateConveration()]);
    var key = true;
    while (key) {
        var next = iter.next();
        if (next.value != null) {
            next.value.then(function(res) {
                switch (next.name) {
                    case 'validate-converation':
                    console.log(res);
                        break;
                }
            });
            key = next.done;

        }
        
        console.log(next.done);
    }*/
    /**
     */
    Bot.prototype.getResponse = function(inputItem, callback) {
       // console.log("get Response",inputItem);
        this.validateConveration((valid) => {
            if (valid) {
                var inputStatement = this.inputPreProcessor(inputItem);
                var generateStatement = this.generateResponse(inputStatement);
                var previousStatement = null;
                this.lastResponse((statement) => {
                    previousStatement = statement;

                    if (!this.readOnly) {
                        this.learnResponse(generateStatement, previousStatement);

                    }
           //         console.log("previousStatement ", previousStatement);
                });
                /*if (!this.readOnly) {
                    this.learnResponse(generateStatement.statement, previousStatement);
                    this.storage.addToConversation(this.idConversation, inputStatement, generateStatement.response);
                }
                callback(this.output.processResponse(this.idConversation, generateStatement.response));
                */
            }
        });
    }
    /**
     */
    Bot.prototype.learnResponse = function(generate, previous) {
        if (previous != null) {
            generate.addResponse(new Response(previous.text));
        }
        this.storage.update(generate);
    }
    /**
     */
    Bot.prototype.inputPreProcessor = function(inputItem) {
        var inputStatement = this.input.processInputStatement(inputItem);
        if (inputStatement != null) {
            for (var i = 0; i < this.preprocesor.length; i++) {
                inputStatement = this.preprocesor[i].process(inputStatement);
            }
        }
        return inputStatement;
    }
    /**
     */
    Bot.prototype.generateResponse = function(inputStatement) {
        // this.storage.generateBaseQuery(this.idConversation); investigar
        var multiLogic = new MultiLogic(this.logic).process(inputStatement);
        return multiLogic; //this.logic.process(inputStatement);
    }
    /**
     */
    Bot.prototype.validateConveration = function(callback) {
        if (this.idConversation == null) {
            this.storage.createConversation().then((conversation) => {
                // this.idConversation = null;
                if (conversation != null) {
                    this.idConversation = conversation._conversation_id;
                }
                callback(this.idConversation != null);
            });
        } else {
            callback(this.idConversation != null);
        }

    }
    /**
     */
    Bot.prototype.lastResponse = function(callback) {
        this.storage.getLatestResponse(this.idConversation).then((statement) => {
            if (statement != null) {
                callback(statement);
            }

        });
        //return this.storage.getLatestResponse(this.idConversation);
    }
    /**
     */
    return CreateClass.make(Bot, DefineProperty);
})();
module.exports = Bot;
/*

console.log('--------------BOT------------------');
var bot = new Bot();
console.log(bot.input);
bot.getResponse("hola");*/