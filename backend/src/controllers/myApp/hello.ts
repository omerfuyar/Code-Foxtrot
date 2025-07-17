import { NextFunction, Request, Response } from 'express';
import { get } from 'http';

const getHelloMessage = (request: Request, response: Response, nextMWFunction: NextFunction) => {
    response.json({ message: 'Hello from the structured backend!' });
};

export default getHelloMessage;
