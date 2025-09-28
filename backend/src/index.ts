import express, { Express } from 'express';
//import dotenv from 'dotenv';

//dotenv.config();

const APP: Express = express();
const PORT: number = Number(process.env.PORT) || 3001;

APP.use(express.json());

APP.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
});