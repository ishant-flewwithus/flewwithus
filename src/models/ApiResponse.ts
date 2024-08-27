interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: string;
  data: T;
}

export default ApiResponse;
