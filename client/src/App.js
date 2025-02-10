import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './containers/Navbar';
import UnauthRouter from './routes/UnauthRouter';
import AdminRouter from './routes/AdminRouter';
import UserRouter from './routes/UserRouter';
import Loading from './containers/Loading';
import ApiCall from './components/ApiCall';

const App = () => {
  const [data, setData] = useState({
    user: undefined,
    isFetching: false,
    validated: false,
  });

  useEffect(() => {
    const validateUser = async () => {
      try {
        setData({ user: undefined, isFetching: true, validated: false });
        const response = await ApiCall('validate', 'GET');
        if (response.token) {
          setData({
            user: response.token,
            isFetching: false,
            validated: true,
          });
        } else {
          setData({
            user: undefined,
            isFetching: false,
            validated: false,
          });
        }
      } catch (error) {
        console.log(error);
        setData({ user: undefined, isFetching: false, validated: false });
      }
    };
    validateUser();
  }, []);

  return (
    <>
      {data.isFetching ? (
        <Loading />
      ) : (
          <Router>
            <Navbar />
            {data.validated ? (
              data.user.user_level === 'Admin' ? (
                <AdminRouter />
              ) : (
                  <UserRouter />
                )
            ) : (
                <UnauthRouter />
              )}
          </Router>
        )}
    </>
  );
};

export default App;
