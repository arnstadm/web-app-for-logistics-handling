import { useState } from 'react';
const PostHook = (endpoint, method, object) => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);
  const apiURL = 'http://localhost:5000/api/';

  const fetchUrl = async () => {
    setLoading(true);
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
    //if (!response.ok) throw response.statusText;
    await response
      .json()
      .then((response) => setData(response))
      .catch((err) => console.log(err));
    setLoading(false);
  };

  return [data, loading, fetchUrl];
};

export default PostHook;
