import { HttpsResponse as HttpResponse } from './common/types';

const API_URL = 'http://patrice-trypanosomal-sherryl.ngrok-free.dev';
//const API_URL = 'http://code-foxtrot.onrender.com';
//const API_URL = 'http://localhost:3000';

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
				dataContainer.textContent = 'Testing...';

				try {
					const response = await fetch(`${API_URL}/test`, {
						method: 'GET',
						mode: 'cors',
						headers: {
							'ngrok-skip-browser-warning': 'true'
						}
					});

					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}

					const data = (await response.json()) as HttpResponse<unknown>;
					dataContainer.textContent = JSON.stringify(data.body);
				} catch (e) {
					const text = e instanceof Error ? e.message : String(e);
					console.error(text);
					dataContainer.textContent = text;
				}
			})();
		});
	} else {
		console.error('Fetch button or data container not found');
	}
});
