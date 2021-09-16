import { AxiosResponse } from 'axios';

type payload = 'user' | 'article';

export default interface JSONResponse<T> {
  status: string;
  statusText: string;
  message?: string;
  nameT: string;
  data?: {
    [x in payload]: T;
  };
  errors?: Array<{ message: string }>;
}

export interface AppError {
  message: string;
  status: string;
}

type Response<T> = AxiosResponse<JSONResponse<T>>;
type DataConsumer<T> = (res: JSONResponse<T>) => void;
type ErrorConsumer = (error: AppError) => void;

export type { Response, DataConsumer, ErrorConsumer };
