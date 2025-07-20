import React from 'react';
import "./App.css";

function App() {
	const [inputFieldValue, setInputFieldValue] = React.useState<string>("");

	const [inputLastKey, setInputLastKey] = React.useState<string>("");

	const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

	React.useEffect(() => {
		const handleKeyDown: (event: KeyboardEvent) => void =
			(event) => {
				setInputLastKey(event.key);
			};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	React.useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) throw new Error("Canvas not found.");

		const context = canvas.getContext("2d", { alpha: false });
		if (!context) throw new Error("Failed to get canvas context 2d.");

		context.fillStyle = "blue";
		context.fillRect(10, 10, 150, 100);
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<h2>Interactive Text Field</h2>
				<input
					type="text"
					value={inputFieldValue}
					onChange={(event) => setInputFieldValue(event.target.value)}
					placeholder="Type something here..."
				/>

				<p>You are typing: <strong>{inputFieldValue}</strong></p>

				<hr />

				<h2>Global Key Press Listener</h2>
				<p>
					Last key pressed anywhere on the page: <strong>{inputLastKey}</strong>
				</p>

				<hr />

				<h2>Drawing with Canvas</h2>
				<canvas
					ref={canvasRef}
					width="300"
					height="150"
					style={{ border: "1px solid white" }}
				/>
			</header>
		</div>
	);
}

export default App;