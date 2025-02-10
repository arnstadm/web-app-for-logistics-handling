import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import ApiCall from '../components/ApiCall';
import Loading from '../components/Loading';
import useInput from '../components/useInput';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const [inputs, handleChange] = useInput();
  const [token, setToken] = useState({ data: '', isFetching: false });
  const { email, password } = inputs;

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      setToken({ data: '', isFetching: true });
      const response = await ApiCall('signin', 'POST', inputs);
      setToken({ data: response, isFetching: false });
    } catch (error) {
      console.log(error);
      setToken({ data: '', isFetching: false });
    }
  };

  useEffect(() => {
    const setTokenAndRedirect = () => {
      if (token.data.token) {
        localStorage.setItem('usertoken', token.data.token);
        history.push('/profile');
      }
    };
    setTokenAndRedirect();
  }, [token.data, history]);

  return (
    <>
      {token.isFetching ? (
        <Loading />
      ) : (
        <LoginForm
          email={email}
          password={password}
          handleChange={handleChange}
          onSubmit={onSubmit}
          token={token}
        />
      )}
    </>
  );
};

export default Login;
