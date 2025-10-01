/* eslint-disable indent */
import 'dotenv/config';
import http from 'http';

const PORT = 3000;

interface ApiResponse {
	statusCode: number;
	status: string;
}

function handleGetRequest(url: string): ApiResponse | null {
	switch (url) {
		case '/api/start':
			return { statusCode: 200, status: 'test' };
		case '/api/bar':
			return { statusCode: 200, status: 'bar' };
		case '/api/baz':
			return { statusCode: 200, status: 'baz' };
		default:
			return null;
	}
}

function handlePostRequest(url: string): ApiResponse | null {
	return { statusCode: 200, status: `bar ${url}` };
}

function handleOptionsRequest(url: string): ApiResponse | null {
	return { statusCode: 204, status: `foo ${url}` };
}

const server = http.createServer((request, response) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type, ngrok-skip-browser-warning');

	console.log(`${new Date().toUTCString()} : Received ${request.method} request for "${request.url}" from (${request.socket.remoteAddress}:${request.socket.remotePort})`);

	let result: ApiResponse | null = null;

	switch (request.method) {
		case 'GET':
			result = handleGetRequest(request.url || '');
			break;
		case 'POST':
			result = handlePostRequest(request.url || '');
			break;
		case 'OPTIONS':
			result = handleOptionsRequest(request.url || '');
			break;
		default:
			response.writeHead(405, { 'Content-Type': 'application/json' });
			response.end(JSON.stringify({ error: 'Method not allowed' }));
			return;
	}

	response.writeHead(response?.statusCode || 404, { 'Content-Type': 'application/json' });
	response.end(JSON.stringify(result?.status || { error: 'Not found' }));
});

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
