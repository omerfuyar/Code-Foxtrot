import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import DBHandler from './handlers/DBHandler';
import routes from './routes/routes';

dotenv.config();

const APP: Express = express();
const PORT: number = Number(process.env.PORT) || 3001;

DBHandler.Connect();

APP.use(cors());
APP.use(express.json());

APP.use('/', routes);

APP.listen(PORT, () => {
	console.log(`[server]: Server is running at http://localhost:${PORT}`);
});