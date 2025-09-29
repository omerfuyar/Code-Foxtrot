const API_URL = 'https://patrice-trypanosomal-sherryl.ngrok-free.dev';
//const API_URL = 'https://code-foxtrot.onrender.com';
//const API_URL = 'http://localhost:3000';

interface ApiResponse {
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
					const response = await fetch(`${API_URL}/api/start`);

					if (!response.ok) {
						const contentType = response.headers.get('content-type');
						if (contentType && contentType.includes('application/json')) {
							const errorData: unknown = await response.json();
							throw new Error(`API error: ${JSON.stringify(errorData)}`);
						} else {
							const text = await response.text();
							throw new Error(`HTTP error! Status: ${response.status}. Response: ${text.substring(0, 100)}...`);
						}
					}

					const data = await response.json() as ApiResponse;
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
