interface HttpsResponse<T> {
    statusCode: number;
    data: T;
}

export { HttpsResponse };