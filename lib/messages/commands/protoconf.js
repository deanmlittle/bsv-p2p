'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var Buffer = require('buffer').Buffer;
var bitcore = require('bitcore-lib-cash');
var utils = require('../utils');
var $ = bitcore.util.preconditions;
var BufferReader = bitcore.encoding.BufferReader;
var BufferWriter = bitcore.encoding.BufferWriter;
 
/**
 * A message to announce protocol configuration immediately after sending VERACK.
 * @param {Object=} arg - an object of protocol configurations
 * @param {Integer=} arg.maxRecvPayloadLength - max protocol payload length, should not be less than 1 * 1024 * 1024
 * @param {Object=} options
 * @extends Message
 * @constructor
 */
function ProtoconfMessage(arg, options) {
  Message.call(this, options);
  this.command = 'protoconf';
  if (arg) {
    this.maxRecvPayloadLength = arg.maxRecvPayloadLength
  }
}
inherits(ProtoconfMessage, Message);

ProtoconfMessage.prototype.setPayload = function(payload) {
  var parser = new BufferReader(payload);
  $.checkArgument(!parser.finished(), 'No data received in payload');
  
  var numberOfFields = parser.readVarintNum();
  if(numberOfFields > 0) {
      this.maxRecvPayloadLength = parser.readUInt32LE();
  }

  utils.checkFinished(parser);
};

ProtoconfMessage.prototype.getPayload = function() {
  var bw = new BufferWriter();
  
  if(this.maxRecvPayloadLength) {
    bw.writeVarintNum(1);
    bw.writeUInt32LE(this.maxRecvPayloadLength);
  } else {
    bw.writeVarintNum(0);
  }

  return bw.concat();
};

module.exports = ProtoconfMessage;
