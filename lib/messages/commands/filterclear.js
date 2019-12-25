'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var bsv = require('bsv');
var Buffer = require('buffer').Buffer;

/**
 * Request peer to clear data for a bloom filter
 * @extends Message
 * @constructor
 */
function FilterclearMessage(arg, options) {
  Message.call(this, options);
  this.command = 'filterclear';
}
inherits(FilterclearMessage, Message);

FilterclearMessage.prototype.setPayload = function() {};

FilterclearMessage.prototype.getPayload = function() {
  return Buffer.alloc(1);
};

module.exports = FilterclearMessage;
