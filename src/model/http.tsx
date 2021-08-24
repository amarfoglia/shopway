export default interface JSONResponse<T> {
  status: string;
  statusText: string;
  message?: string;
  data?: { data: T };
  errors?: Array<{ message: string }>;
}

export interface AppError {
  message: string;
  status: string;
}
