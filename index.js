"use strict";
//const API_URL = 'https://patrice-trypanosomal-sherryl.ngrok-free.dev';
//const API_URL = 'https://code-foxtrot.onrender.com';
const API_URL = 'http://localhost:3000';
const rootElement = document.getElementById('root');
if (rootElement) {
    const textElement = document.createElement('div');
    textElement.textContent = 'Hello, world!';
    rootElement.appendChild(textElement);
}
else {
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
                    const response = await fetch(`${API_URL}/api/start`, {
                        method: 'GET',
                        mode: 'cors',
                        headers: {
                            'ngrok-skip-browser-warning': 'true'
                        }
                    });
                    if (!response.ok) {
                        const text = await response.text();
                        console.error(`Failed to fetch data: ${text}`);
                        dataContainer.textContent = `Failed to fetch data: ${text}`;
                    }
                    else {
                        const data = (await response.json());
                        dataContainer.textContent = JSON.stringify(data);
                    }
                }
                catch (e) {
                    const text = e instanceof Error ? e.message : String(e);
                    console.error(`Failed to fetch data: ${text}`);
                    dataContainer.textContent = `Failed to fetch data: ${text}`;
                }
            })();
        });
    }
    else {
        console.error('Fetch button or data container not found');
    }
});
