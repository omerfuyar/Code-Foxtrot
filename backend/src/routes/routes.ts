import { Router } from 'express';
import myAppRouter from './myApp/myApp';

const ROUTER = Router();

ROUTER.use('/myApp', myAppRouter);
//... other routes

export default ROUTER;
