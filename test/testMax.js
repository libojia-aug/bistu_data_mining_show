var http = require("http");
var options = {
	hostname: '127.0.0.1',
	port: 3001,
	path: '/',
	method: 'GET'
};

function get() {
	var req = http.request(options, (res) => {
		console.log(`STATUS: ${res.statusCode}`);
		console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
		res.setEncoding('utf8');
		res.on('data', (chunk) => {
			console.log(`BODY: ${chunk}`);
		});
		res.on('end', () => {
			console.log('No more data in response.')
		})
	});

	req.on('error', (e) => {
		console.log(`problem with request: ${e.message}`);
	});

	// write data to request body
	req.end();
}

for (var i = 0; i < 1; i++) {
	get();
}