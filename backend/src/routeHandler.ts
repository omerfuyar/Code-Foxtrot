/* eslint-disable indent */

import { HttpsResponse } from './common/types.js';

class RouteHandler {
    private static handler: { [url: string]: (method: string) => HttpsResponse<unknown>; } = {};

    static registerRoute(url: string, callback: (method: string) => HttpsResponse<unknown>): void {
        RouteHandler.handler[url] = callback;
    }
    static accessRoute(url: string, method: string): HttpsResponse<unknown> | null {
        return RouteHandler.handler[url]?.(method) || null;
    }
}

export { RouteHandler };