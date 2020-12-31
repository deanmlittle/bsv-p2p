'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var Buffer = require('buffer').Buffer;
var bsv = require('bsv');
var JSUtil = bsv.util.js;
/**
 * A message in response to a version message.
 * @extends Message
 * @constructor
 */
function VerackMessage(arg, options) {
  Message.call(this, options);
  this.command = 'verack';
}
inherits(VerackMessage, Message);

VerackMessage.prototype.setPayload = function() {};

VerackMessage.prototype.getPayload = function() {
  return Buffer.alloc(0);
};

module.exports = VerackMessage;
