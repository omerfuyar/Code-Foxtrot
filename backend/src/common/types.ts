interface HttpsResponse<T> {
    statusCode: number;
    body: T;
}

export { HttpsResponse };