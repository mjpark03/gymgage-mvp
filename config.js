/*jslint node: true */
/*jslint nomen: true */
'use strict';

var config = {};

config.api = {};

config.api.host = process.env.API_HOST || '172.30.1.19';

module.exports = config;
