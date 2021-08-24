import { useEffect } from 'react';
import JSONResponse from '../model/http';

const REFRESH_TIME = 1000;

interface FetchProps<T> {
  jsonResponse?: JSONResponse<T>;
  isLoading: boolean;
}

function useFetch<T>(url: string, onFetch: (props: FetchProps<T>) => void): void {
  useEffect(() => {
    setTimeout(async () => {
      try {
        onFetch({ isLoading: true });
        const response = await fetch(url);
        const jsonResponse: JSONResponse<T> = await response.json();
        onFetch({ jsonResponse, isLoading: false });
      } catch (err) {
        console.log(`handled error: ${err}`);
      }
    }, REFRESH_TIME);
  }, [url]);
}

export default useFetch;
