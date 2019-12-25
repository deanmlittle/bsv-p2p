'use strict';

var Message = require('../message');
var inherits = require('util').inherits;
var bsv = require('bsv');
var Buffer = require('buffer').Buffer;
var utils = require('../utils');
var BufferWriter = bsv.encoding.BufferWriter;
var BufferReader = bsv.encoding.BufferReader;
var $ = bsv.util.preconditions;
var _ = bsv.deps._;

/**
 * Request peer to add data to a bloom filter already set by 'filterload'
 * @param {Buffer=} data - Array of bytes representing bloom filter data
 * @param {Object=} options
 * @extends Message
 * @constructor
 */
function FilteraddMessage(arg, options) {
  Message.call(this, options);
  this.command = 'filteradd';
  $.checkArgument(
    _.isUndefined(arg) || Buffer.isBuffer(arg),
    'First argument is expected to be a Buffer or undefined'
  );
  this.data = arg || Buffer.alloc(1);
}
inherits(FilteraddMessage, Message);

FilteraddMessage.prototype.setPayload = function(payload) {
  $.checkArgument(payload);
  var parser = new BufferReader(payload);
  this.data = parser.readVarLengthBuffer();
  utils.checkFinished(parser);
};

FilteraddMessage.prototype.getPayload = function() {
  var bw = new BufferWriter();
  bw.writeVarintNum(this.data.length);
  bw.write(this.data);
  return bw.concat();
};

module.exports = FilteraddMessage;
