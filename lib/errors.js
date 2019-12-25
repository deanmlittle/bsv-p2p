'use strict';

var spec = {
  name: 'P2P',
  message: 'Internal Error on bsv-p2p Module {0}'
};

module.exports = require('bsv').errors.extend(spec);
