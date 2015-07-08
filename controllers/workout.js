/*jslint node: true */
/*jslint nomen: true */
'use strict';

var http = require('http');

var i2c = require('i2c-bus');
var MPU6050 = require('i2c-mpu6050');

var address = 0x68;
var i2c1 = i2c.openSync(1);
var sensor = new MPU6050(i2c1, address);

var querystring = require('querystring');
var logger;

var getCount = function(req, res) {

	logger.log('info', 'controllers - workout - getCount');

	var interval = setInterval(function() {
		var data = sensor.readSync();
		var accel_z = data.accel.z;

		if(accel_z > 1.0) {
			console.log('increase count: ' + accel_z);
		
			var options, post_data, post_req;

			post_data = querystring.stringify({
				'accel_z' : accel_z
			});

			options = {
				host: global.config.api.host,
				port: 3000,
				method: 'POST',
				path: '/workout/count',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Content-Length': Buffer.byteLength(post_data)
				}
			};

			post_req = http.request(options, function(res) {
				res.setEncoding('utf8');
				res.on('data', function(chunk) {
					console.log('chunk: ' + JSON.stringify(chunk));
				});
			});

			post_req.write(post_data);
			post_req.end();

		}
	}, 1000);
};

module.exports = function(app, loggerObj) {

	logger = loggerObj;

	logger.log('info', 'controllers - workout - module.exports');

	app.get('/workout', getCount); 
};
