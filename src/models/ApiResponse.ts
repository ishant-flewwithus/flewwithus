interface ApiResponse<T> {
  success: boolean;
  StatusMsg: string;
  ResponseType: string;
  data: T;
}

export default ApiResponse;
