"use strict";
var CreateClass = require('../reflec/create_class');
module.exports = (function() {
    function Response(id, text) {
        this.id = id;
       
        this.text = text;

        this.create_at = new Date();

        this.ocurrence = 1;
    }
    Response.prototype.getId = function() {
        return "#" + this.id.cluster + ":" + this.id.position;
    }
    var defineProperty = [{
        key: 'text',
        get: function() {
            return this._text;
        },
        set: function(text) {
            this._text = text;
        }
    }, {
        key: 'id',
        get: function() {
            return this._id;
        },
        set: function(id) {
            this._id = id;
        }
    }, {
        key: 'ocurrence',
        get: function() {
            return this._ocurrence;
        },
        set: function(ocurrence) {
            this._ocurrence = ocurrence;
        }
    }];

    return CreateClass.make(Response, defineProperty);
})();