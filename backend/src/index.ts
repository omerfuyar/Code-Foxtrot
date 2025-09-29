import 'dotenv/config';
import http from 'http';

const PORT = 3000;

const server = http.createServer((request, response) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type, ngrok-skip-browser-warning');

	console.log(`Received ${request.method} request for ${request.url}`);

	if (request.method === 'OPTIONS') {
		response.writeHead(204);
		response.end();
		return;
	}

	if (request.method === 'GET' && request.url === '/api/start') {
		response.writeHead(200, { 'Content-Type': 'application/json' });
		response.end(JSON.stringify({ status: 'started' }));
	} else {
		response.writeHead(404, { 'Content-Type': 'application/json' });
		response.end(JSON.stringify({ error: 'Not found' }));
	}
});

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
