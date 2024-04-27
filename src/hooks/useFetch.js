import { useCallback, useState } from "react";

/**
 * Custom hook for fetching data asynchronously.
 * @returns {Object} An object containing data, isLoading, error, and fetchData function.
 */
export const useFetch = () => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  /**
   * Fetches text data from the specified URL asynchronously.
   * @param {string} url - The URL to fetch the data from.
   * @returns {Promise} A promise that resolves to null.
   */
  const fetchTextAsync = async (url) => {
    setData(null);
    setIsLoading(true);
    setError(undefined);
    try {
      const response = await fetch(url);
      const res = await response.text();
      setData(res);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
    return null;
  };

  const fetchData = useCallback((url) => fetchTextAsync(url), []);

  return {
    data,
    isLoading,
    error,
    fetchData,
  };
};
