export class ApiError extends Error {
  constructor(
    readonly statusCode: number,
    message: string,
  ) {
    super(`[ApiError] ${statusCode} ${message}`);
  }
}
