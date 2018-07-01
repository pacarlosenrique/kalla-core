'use strict';

var CreateClass = require('../../reflec/create_class');

module.exports = CreateClass.makeInterface('Storage', ['createConversation', 'getModel', 'generateBaseQuery', 'count',
    'find', 'remove', 'filter', 'update', 'getLatestResponse',
    'addToConversation', 'getRandom', 'drop', 'getResponseStatements'
]);
