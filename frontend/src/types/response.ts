export type SuccessResponse<T> = {
  status: string;
  statusCode: number;
  message: string;
  data?: T;
};

export type ErrorResponse = {
  status: string;
  statusCode: number;
  message: string;
  data?: any;
};
