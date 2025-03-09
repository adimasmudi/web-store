export type SuccessResponse<T> = {
  status: string;
  statusCode: number;
  message: string;
  data?: T;
};

export type ErrorResponse<T> = {
  status: string;
  statusCode: number;
  message: string;
  data?: T;
};
