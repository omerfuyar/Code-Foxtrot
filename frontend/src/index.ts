//const API_URL = 'https://patrice-trypanosomal-sherryl.ngrok-free.dev';
//const API_URL = 'https://code-foxtrot.onrender.com';
const API_URL = 'http://localhost:3000';

interface ApiResponse {
	statusCode: number;
	status: string;
}

const rootElement = document.getElementById('root');

if (rootElement) {
	const textElement = document.createElement('div');
	textElement.textContent = 'Hello, world!';
	rootElement.appendChild(textElement);
} else {
	console.error('Root element not found');
}

document.addEventListener('DOMContentLoaded', () => {

	const fetchDataButton = document.getElementById('fetch-data');
	const dataContainer = document.getElementById('data-container');

	if (fetchDataButton && dataContainer) {
		fetchDataButton.addEventListener('click', () => {
			void (async () => {
				try {
					dataContainer.textContent = 'Fetching...';
					const response = await fetch(`${API_URL}/api/start`, {
						method: 'GET',
						mode: 'cors', // allow cross-origin
						headers: {
							'ngrok-skip-browser-warning': 'true'  // Add this header
						}
					});

					if (!response.ok) {
						const text = await response.text();
						throw new Error(`HTTP ${response.status}: ${text}`);
					}

					const data = (await response.json()) as ApiResponse;
					dataContainer.textContent = JSON.stringify(data, null, 2);
				} catch (error) {
					console.error('Failed to fetch data:', error);
					dataContainer.textContent = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
				}
			})();
		});
	} else {
		console.error('Fetch button or data container not found');
	}
});
