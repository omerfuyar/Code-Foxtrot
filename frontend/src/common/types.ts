interface HttpResponse<T> {
    statusCode: number;
    body: T;
}

export { HttpResponse as HttpsResponse };