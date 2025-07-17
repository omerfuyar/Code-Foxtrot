import { Router } from 'express';
import helloRouter from './hello'

const ROUTER = Router();

ROUTER.use('/hello', helloRouter);
//... other routes

export default ROUTER;