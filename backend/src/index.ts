/* eslint-disable indent */
import 'dotenv/config';
import http from 'http';
import fs from 'fs';

const PORT = 3000;
const LOG_FILE = 'server.log';

interface ApiResponse {
	statusCode: number;
	status: string;
}

function handleGetRequest(url: string): ApiResponse | null {
	switch (url) {
		case '/api/start':
			return { statusCode: 200, status: 'test' };
		default:
			return null;
	}
}

function handlePostRequest(url: string): ApiResponse | null {
	switch (url) {
		case '/api/start':
			return { statusCode: 204, status: `foo ${url}` };
		default:
			return null;
	}
}

function handleOptionsRequest(url: string): ApiResponse | null {
	switch (url) {
		case '/api/start':
			return { statusCode: 204, status: `foo ${url}` };
		default:
			return null;
	}
}

const server = http.createServer((request, response) => {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	response.setHeader('Access-Control-Allow-Headers', 'Content-Type, ngrok-skip-browser-warning');

	const clientIp =
		request.headers['x-forwarded-for']?.toString().split(',')[0] ||
		('!' + request.socket.remoteAddress);

	const clientPort =
		request.headers['x-forwarded-port']?.toString() ||
		('!' + request.socket.remotePort);

	const date = new Date();
	const formattedDate = date.getFullYear() + '-' +
		String(date.getMonth() + 1).padStart(2, '0') + '-' +
		String(date.getDate()).padStart(2, '0') + ' ' +
		String(date.getHours()).padStart(2, '0') + ':' +
		String(date.getMinutes()).padStart(2, '0') + ':' +
		String(date.getSeconds()).padStart(2, '0');

	const logMessage = `[${formattedDate}]->[${clientIp}:${clientPort}]->[${request.method}]->[${request.url}]`;

	console.log(logMessage);

	fs.appendFile(LOG_FILE, logMessage + '\n', (err) => {
		if (err) {
			console.error('Failed to write to log file:', err);
		}
	});

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
	console.log(`Server running at http://localhost:${PORT}\n`);
});
