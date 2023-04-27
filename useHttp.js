import { useState, useCallback } from 'react';
import axios from 'axios';

const useHttpRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  console.log('http called');

  const ApiRequestHandler = useCallback(async (requestObject, dataHandler) => {
    setLoading(true);
    try {
      const response = await axios.get(requestObject.url);
      const resData = await response.data;
      setLoading(false);
      console.log(resData);
      dataHandler(resData);
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
    ///console.log(requestObject.url, data);
  }, []);

  return {
    loading,
    error,
    ApiRequestHandler,
  };
};

export default useHttpRequest;
