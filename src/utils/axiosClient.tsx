import axios, { AxiosInstance } from 'axios';
import JSONResponse from '../model/http';

const connectionError = {
  message: 'The shopway server in unreachable',
  status: 500,
};

const BACKEND_URL = 'http://localhost:5000';

export { BACKEND_URL };

type ContentType = 'multipart/form-data' | 'application/json';

const AxiosClient = (type: ContentType = 'application/json'): AxiosInstance => {
  const client = axios.create({
    baseURL: BACKEND_URL + '/api/v1',
    headers: {
      'Content-type': type,
    },
    withCredentials: true,
    validateStatus: function (status: number) {
      return status <= 302; // Reject only if the status code is greater than 302
    },
  });

  client.interceptors.response.use(
    function (response) {
      return response.data;
    },
    function (error) {
      return Promise.reject(!error.response ? connectionError : error.response.data);
    },
  );

  return client;
};

const toFormData = (obj: any): FormData => {
  const formData = new FormData();
  for (const k in obj) {
    formData.append(k, obj[k]);
  }
  return formData;
};

type Payload<T> = JSONResponse<T>;

export type { Payload };

const formDataClient = AxiosClient('multipart/form-data');
const jsonClient = AxiosClient('application/json');

export { formDataClient, jsonClient, toFormData };

export default AxiosClient;
