import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import TopBar from './components/TopBar';
import Button from './components/Button';
import Image from './components/Image';

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<TopBar>
			<TopBar.Left>
				<Image
					src="https://react.dev/images/og-home.png"
					alt="React Logo"
					size={{ width: 85, height: 45 }}
				/>
			</TopBar.Left>
			<TopBar.Right>
				<Button onClick={() => alert("Login clicked!")}>
					Log In
				</Button>
			</TopBar.Right>
		</TopBar>

		<div style={{ marginTop: '80px', padding: '20px' }}>
			<h1>Page Content</h1>
			<p>This content will scroll, but the top bar will remain fixed.</p>
		</div>
	</React.StrictMode>
);
