/* eslint-disable indent */

import { HttpResponse } from './common/types.js';

class RouteHandler {
    private static handler: { [url: string]: (method: string) => HttpResponse<unknown>; } = {};

    static registerRoute(url: string, callback: (method: string) => HttpResponse<unknown>): void {
        RouteHandler.handler[url] = callback;
    }
    static accessRoute(url: string, method: string): HttpResponse<unknown> | null {
        return RouteHandler.handler[url]?.(method) || null;
    }
}

export { RouteHandler };