/*jslint node: true */
/*jslint nomen: true */
'use strict';

module.exports = function(app, logger) {

	logger.log('info', 'controllers - index - module.exports');

	require('./workout')(app, logger);
};
