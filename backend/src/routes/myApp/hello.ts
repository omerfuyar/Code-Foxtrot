import { Router } from 'express';
import getHelloMessage from '../../controllers/myApp/hello';

const ROUTER = Router();

ROUTER.get('/', getHelloMessage);
//... other commands

export default ROUTER;