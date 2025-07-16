import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

// This line loads the environment variables from your .env file.
dotenv.config();

// This line initializes a new Express application.
// 'app' is the main object you'll use to define routes and configure your server.
const APP: Express = express();

// This line retrieves the port number from your environment variables.
// If it's not defined, it defaults to 3001.
const PORT_BACK = process.env.PORT || 3001;

// This line applies the CORS middleware.
// It allows your frontend (running on a different port) to make requests to this backend.
APP.use(cors());

// This defines a GET route. When a GET request is made to '/api/hello',
// the callback function will execute.
APP.get("/api/hello", (request: Request, response: Response) => {
	// This sends a JSON response back to the client with a message.
	response.json({ message: "Hello from the backend!" });
});

// This starts the server and makes it listen for incoming requests on the specified port.
APP.listen(PORT_BACK, (error) => {
	// This logs a message to the console once the server is successfully running.
	if (error) {
		console.error(`[server]: Error starting server : ${error.message}`);
	} else {
		console.log(`[server]: Server is running at http://localhost:${PORT_BACK}`);
	}
});
