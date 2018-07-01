/**
 */
var Storage = require('../../interfaces/adapter/storage');
/**
 */
var OrientDB = require('orientjs').ODatabase;
/**
 */
var Conversation = require('../../model/conversation');
/**
 */
var Statement = require('../../model/statement');
/**
 */
var Response = require('../../model/response');
/**
 */
const readJsonSync = require('read-json-sync');
/**
 */
(function() {
    'use strict';
    var __extends = (this && this.__extends) || (function() {
        var extendStatics = Object.setPrototypeOf || ({
                __proto__: []
            }
            instanceof Array && function(d, b) {
                d.__proto__ = b;
            }) || function(d, b) {
            for (var p in b)
                if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function(d, b) {
            extendStatics(d, b);

            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var Context = /** @class */ (function() {
        /** */
        function Context() {
            this.element = readJsonSync('package.json');
            this.target = null;
        }
        /** */
        Context.prototype.find = function(key) {
            var config = null;
            if (this.target == null) {
                this.target = this.element;
            }
            if (this.isExistStorage(key)) {
                this.target = this.target[key];
            }
            return this;
        };
        /** */
        Context.prototype.getTarget = function() {
            return this.target;
        };
        /** \=*/
        Context.prototype.isExistStorage = function(key) {
            return this.target != null && this.target[key] != null;
        };
        return Context;
    }());
    /**
     */
    var Creator = /** @class */ (function() {
        function Creator() {
            this.context = new Context().find('@storage');
        }
        Creator.prototype.db = function(callback) {
            return callback(this.context);
        };
        return Creator;
    }());
    /**
     */
    var ConcreteCreator = /** @class */ (function(_super) {
        __extends(ConcreteCreator, _super);
        /** */
        function ConcreteCreator(callback) {
            var _this = _super.call(this) || this;
            _this._session = _this.db(callback);
            return _this;
        }
        /** */
        ConcreteCreator.prototype.persist = function(callback) {
            var _this = this;
            return new Promise(function(resolve, regect) {
                callback(_this._session, resolve, regect);
            });
        };
        ConcreteCreator.prototype.merge = function(callback) {
            var _this = this;
            return new Promise(function(resolve, regect) {
                callback(_this.session, resolve, reject)
            });
        }
        /** */
        ConcreteCreator.prototype.remove = function(callback) {
            var _this = this;
            return new Promise(function(resolve, regect) {
                callback(_this._session, resolve, regect);
            });
        };
        /** */
        ConcreteCreator.prototype.baseQuery = function(callback) {
            var _this = this;
            return new Promise(function(resolve, regect) {
                callback(_this._session, resolve, regect);
            });
        };
        return ConcreteCreator;
    }(Creator));
    /**
     */
    var AsyncOrient = /** @class */ (function(_super) {
        __extends(AsyncOrient, _super);

        function AsyncOrient() {
            return _super.call(this, function(context) {
                var target = context.find('@orientdb').find('@connection').getTarget();
                return new OrientDB(target);
            }) || this;
            //return this;
        }
        AsyncOrient.prototype.insert = function(table, data) {
            return _super.prototype.persist.call(this, function(session, resolve, reject) {
                session.create('VERTEX', table).set(data).one().then(function(res) {
                    session.close().then(function() {
                        resolve(res);
                    })
                });
            });
        };
        AsyncOrient.prototype.merge = function(table, data) {
            return _super.prototype.persist.call(this, function(session, resolve, reject) {
                session.update(data.id).set(data.target).one().then(function(res) {
                    session.close().then(() => {
                        resolve(res);
                    });
                });
            });
        };
        AsyncOrient.prototype.query = function(sql, params) {
            return _super.prototype.baseQuery.call(this, function(session, resolve, reject) {
                session.open().then(function() {
                    return session.query(sql, params);
                }).then(function(res) {
                    session.close().then(function() {
                        resolve(res);
                    });
                });
            });
        };
        return AsyncOrient;
    }(ConcreteCreator));
    /**
     */
    var PersistenceContext = /** @class */ (function() {
        function PersistenceContext(concrete) {
            this.concrete = concrete;
        }
        PersistenceContext.prototype.insert = function(table, data) {
            return this.concrete.insert(table, data);
        };
        PersistenceContext.prototype.update = function(table, data) {
            return this.concrete.merge(table, data);
        };
        PersistenceContext.prototype.query = function(sql, params) {
            return this.concrete.query(sql, params);
        };
        return PersistenceContext;
    }());
    /**
     */
    module.exports = {
        implements: [Storage],
        inject: {
            persistenceContext: {
                Class: PersistenceContext,
                Target: [
                    new AsyncOrient()
                ]
            }
        },
        fn: ['$scope', function($scope) {
            /**
            @return Promise
            */
            // 
            var _this = this;

            function attachStatement(target) {
                var statement = null;
                if (target != null) {
                    statement = new Statement(target['@rid'], target['text'], target['confidence']);
                    statement.extra_data = target['extra_data'];
                    statement.confidence = target['confidence'];
                    statement.in_statement_to = target['in_statement_to']._content;
                    statement.out_response_to = target['out_response_to']._content;
                    //console.log(target);
                    //statement.response_to= [];
                }
                return statement;
            }

            function attachResponse(target) {
                var response = null;
                if (target != null) {
                    response = new Response(target['@rid'], target['text']);
                    response.ocurrence = target['ocurrence'];
                }
                return response;
            }
            $scope.createConversation = function() {
                return _this.persistenceContext.insert('Conversation', {
                    date_act: new Date()
                }).then(function(result) {
                    return new Conversation(result['@rid']);
                });
            }
            $scope.getModel = function() {}
            $scope.generateBaseQuery = function() {}
            $scope.count = function() {}
            $scope.find = function() {}
            $scope.remove = function() {}
            $scope.filter = function() {}
            $scope.update = function(statement) {
                if (statement != null && statement.text != null) {
                    var sql = "SELECT * FROM Statement WHERE text =:statement_text ORDER BY @RID DESC";
                    var parameter = {
                        params: {
                            statement_text: statement.text
                        },
                        limit: 1
                    };
                    _this.persistenceContext.query(sql, parameter).then(function(result) {
                        if (result != null && result.length > 0) {
                            statement = attachStatement(result[0]);
                            var sql = "SELECT EXPAND(OUT('response_to')) FROM Statement WHERE @RID =:id";
                            var parameter = {
                                params: {
                                    id: statement.getId()
                                },
                                limit: 1
                            };
                            _this.persistenceContext.query(sql, parameter).then(function(result) {
                                var response = attachResponse(result[0]);
                                response.ocurrence = response.ocurrence + 1;
                                var parameter = {
                                    id: response.getId(),
                                    target: {
                                        statement_text: response.statement_text,
                                        ocurrence: response.ocurrence,
                                        create_at: response.create_at
                                    }
                                };

                                _this.persistenceContext.update('Response', parameter);
                                
                                if (statement.response_to != null) {
                                    statement.response_to.push(response);
                                }

                            });
                        }
                    }); 
                }
            };

            $scope.getLatestResponse = function(conversation) {
                var sql = "SELECT EXPAND(OUT()) from Conversation WHERE @RID =:id ORDER BY @RID ASC";
                var parameter = {
                    params: {
                        id: conversation.conversation_id
                    },
                    limit: 1
                };
                return _this.persistenceContext.query(sql, parameter).then(function(result) {
                    var in_statement_to = result[0];
                    var statement = null;
                    if (in_statement_to != null) {
                        statement = attachStatement(in_statement_to);
                    }
                    return statement;
                });
            }
            $scope.addToConversation = function() {
                
            }
            $scope.getRandom = function() {}
            $scope.drop = function() {}
            $scope.getResponseStatements = function() {}
        }]
    };
})();