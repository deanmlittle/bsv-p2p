'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var bsv = require('bsv');
var Buffer = require('buffer').Buffer;

/**
 * A message in response to a protoconf message.
 * @extends Message
 * @constructor
 */
function ProtoconfMessage(arg, options) {
  Message.call(this, options);
  this.command = 'protoconf';
}
inherits(ProtoconfMessage, Message);

ProtoconfMessage.prototype.setPayload = function() {};

ProtoconfMessage.prototype.getPayload = function() {
  return Buffer.alloc(1);
};

module.exports = ProtoconfMessage;
