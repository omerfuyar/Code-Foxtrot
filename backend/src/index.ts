/* eslint-disable indent */
import 'dotenv/config';
import https from 'https';
import fs from 'fs';
import { IncomingMessage, ServerResponse } from 'http';
import { IpregistryClient } from '@ipregistry/client';

import { RouteHandler } from './routeHandler.js';
import { HttpsResponse } from './common/types.js';

const PORT = process.env.PORT || 0;
const LOG_FILE = process.env.LOG_FILE || '';
const IP_REGISTRY_CLIENT: IpregistryClient = new IpregistryClient(process.env.IP_REGISTRY_API_KEY || '');

function dateToString(date: Date): string {
	return date.getFullYear() + '-' +
		String(date.getMonth() + 1).padStart(2, '0') + '-' +
		String(date.getDate()).padStart(2, '0') + ' ' +
		String(date.getHours()).padStart(2, '0') + ':' +
		String(date.getMinutes()).padStart(2, '0') + ':' +
		String(date.getSeconds()).padStart(2, '0');
}

RouteHandler.registerRoute('/api/start', (method: string): HttpsResponse<string> => {
	switch (method) {
		case 'GET':
			return { statusCode: 200 };
		case 'POST':
			return { statusCode: 200 };
		case 'OPTIONS':
			return { statusCode: 200 };
		default:
			return { statusCode: 405 };
	}
});

const server = https.createServer((request: IncomingMessage, response: ServerResponse) => {
	void (async () => {
		response.setHeader('Access-Control-Allow-Origin', '*');
		response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
		response.setHeader('Access-Control-Allow-Headers', 'Content-Type, ngrok-skip-browser-warning');

		const clientIp =
			request.headers['x-forwarded-for']?.toString().split(',')[0] ||
			('!' + (request.socket.remoteAddress || ''));

		const clientPort =
			request.headers['x-forwarded-port']?.toString() ||
			('!' + (request.socket.remotePort || ''));

		const logMessage = `[${dateToString(new Date())}]->[${clientIp}:${clientPort}]->[${request.method}]->[${request.url}]`;

		const ipLocation = (await IP_REGISTRY_CLIENT.lookupIp(clientIp)).data;
		const ipHostname = ipLocation.hostname || 'Unknown';
		const ipCountry = ipLocation.location?.country?.name || 'Unknown';
		const ipRegion = ipLocation.location?.region?.name || 'Unknown';
		const ipCity = ipLocation.location?.city || 'Unknown';
		const logIpMessage = `Hostname: ${ipHostname}, Country: ${ipCountry}, Region: ${ipRegion}, City: ${ipCity}`;

		console.log(logMessage);
		console.log(logIpMessage);

		fs.appendFile(LOG_FILE, logMessage + '\n' + logIpMessage + '\n', (err) => {
			if (err) {
				console.error('Failed to write to log file:', err);
			}
		});

		const result: HttpsResponse<unknown> | null = RouteHandler.accessRoute(request.url || '', request.method || '');

		response.writeHead(result?.statusCode || 404, { 'Content-Type': 'application/json' });
		response.end(JSON.stringify(result?.body || { error: 'Not found' }));
	})();
});

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}\n`);
});
