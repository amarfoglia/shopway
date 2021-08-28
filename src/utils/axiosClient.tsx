import axios from 'axios';

const connectionError = {
  message: 'The shopway server in unreachable',
  status: 500,
};

const client = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
  validateStatus: function (status: number) {
    return status <= 302; // Reject only if the status code is greater than 302
  },
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(!error.response ? connectionError : error.response.data);
  },
);

export default client;
