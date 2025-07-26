import React from 'react';
import { createRoot } from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import TopBar from './components/TopBar';
import Button from './components/Button';
import Image from './components/Image';
import DropdownMenu from './components/DropdownMenu';
import { Dropdown } from 'react-bootstrap';

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<TopBar minHeight={80} maxHeight={80}>
			<TopBar.Left>
				<Image
					src="https://react.dev/images/og-home.png"
					alt="React Logo"
					size={{ width: 85, height: 45 }}
				/>

				<Dropdown>
					<Dropdown.Toggle variant="success"></Dropdown.Toggle>
					<Dropdown.Menu>
						<DropdownMenu.Item onClick={() => alert("Item 1 clicked!")}>
							Item 1
						</DropdownMenu.Item>
						<DropdownMenu.Item onClick={() => alert("Item 2 clicked!")}>
							Item 2
						</DropdownMenu.Item>
						<DropdownMenu.Item onClick={() => alert("Item 3 clicked!")}>
							Item 3
						</DropdownMenu.Item>
					</Dropdown.Menu>
				</Dropdown>

				<Button
					onClick={() => alert("button 1 clicked!")}
					text="test button"
					boxless
				/>
			</TopBar.Left>

			<TopBar.Right>
				<Button onClick={() => alert("Login clicked!")} text="Log In" />
			</TopBar.Right>
		</TopBar>

		<div style={{ marginTop: '80px', padding: '20px' }}>
			<h1>Page Content</h1>
			<p>This content will scroll, but the top bar will remain fixed.</p>
		</div>
	</React.StrictMode>
);
