"use strict";
const API_URL = 'https://patrice-trypanosomal-sherryl.ngrok-free.dev';
// Get the root element
const rootElement = document.getElementById('root');
if (rootElement) {
    // Create and append content using vanilla DOM
    const textElement = document.createElement('div');
    textElement.textContent = 'Hello, world!';
    rootElement.appendChild(textElement);
}
else {
    console.error('Root element not found');
}
// Add functionality for the fetch button
document.addEventListener('DOMContentLoaded', () => {
    // Get API URL from environment or default to local
    const fetchDataButton = document.getElementById('fetch-data');
    const dataContainer = document.getElementById('data-container');
    if (fetchDataButton && dataContainer) {
        fetchDataButton.addEventListener('click', () => {
            // Wrap the async logic in a self-invoking function
            void (async () => {
                try {
                    dataContainer.textContent = 'Fetching...';
                    const response = await fetch(`${API_URL}/api/start`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    // Tell TypeScript the expected type of the JSON data
                    const data = await response.json();
                    dataContainer.textContent = JSON.stringify(data, null, 2);
                }
                catch (error) {
                    console.error('Failed to fetch data:', error);
                    dataContainer.textContent = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
                }
            })(); // Immediately invoke the async function
        });
    }
    else {
        console.error('Fetch button or data container not found');
    }
});
