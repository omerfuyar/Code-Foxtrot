import 'dotenv/config';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = 3000;
const frontendPath = path.join(__dirname, '../../frontend');

const server = http.createServer((req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	// Handle pre-flight request for CORS
	if (req.method === 'OPTIONS') {
		res.writeHead(204);
		res.end();
		return;
	}

	if (req.url === '/api/start' && req.method === 'GET') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ status: 'started' }));
	} else if (req.url === '/' || req.url === '/index.html') {
		const htmlContent = fs.readFileSync(path.join(frontendPath, 'index.html'), 'utf8');
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(htmlContent);
		return;
	} else if (req.url === '/index.css') {
		const cssContent = fs.readFileSync(path.join(frontendPath, 'index.css'), 'utf8');
		res.writeHead(200, { 'Content-Type': 'text/css' });
		res.end(cssContent);
		return;
	} else if (req.url === '/build/index.js') {
		const jsContent = fs.readFileSync(path.join(frontendPath, 'build/index.js'), 'utf8');
		res.writeHead(200, { 'Content-Type': 'application/javascript' });
		res.end(jsContent);
		return;
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ error: 'Not found' }));
	}
});

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}`);
});
