import { useState, useEffect } from 'react';

const useFetch = (endpoint, method, object) => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const apiURL = 'http://localhost:5000/api/';

  async function fetchUrl(endpoint, method, object) {
    const response = await fetch(apiURL + endpoint, {
      method: method,
      headers: {
        Authorization: localStorage.getItem('usertoken')
          ? `Basic ${localStorage.getItem('usertoken')}`
          : undefined,
        'Content-Type': 'application/json',
      },
      body: object ? JSON.stringify(object) : undefined,
    });
    if (!response.ok) throw response.statusText;
    await response
      .json()
      .then((response) => setData(response))
      .catch((err) => console.log(err));
    setLoading(false);
  }

  //should include arguments in dependency list of useEffect
  useEffect(() => {
    fetchUrl(endpoint, method, object);
  }, [endpoint, method, object]);
  return [data, loading, fetchUrl];
};

export default useFetch;