import React, { useState, useEffect } from 'react';
import ApiCall from '../components/ApiCall';
import UserProfile from '../components/UserProfile';
import Loading from '../components/Loading';
import useInput from '../components/useInput';
import { Container, Col, UncontrolledAlert } from 'reactstrap';

const Profile = () => {
  const [data, setData] = useState({ user: '', isFetching: false });
  const [input, handleChange] = useInput();
  const [result, setResult] = useState('');
  const { password } = input || {};

  useEffect(() => {
    let isLoggedInn = true;
    const getProfile = async () => {
      try {
        setData({ user: [], isFetching: true });
        const response = await ApiCall('me', 'GET');
        if (isLoggedInn) {
          setData({ user: response.result, isFetching: false });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProfile({});
    return () => (isLoggedInn = false);
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await ApiCall('users/' + data.user.user_id, 'PUT', {
      password,
    });
    setResult(response.message);
  }

  return (
    <Container>
      <div className='jumbotron mt-5'>
        <Col>
          <h1 className='text-center'>DIN PROFIL</h1>
          {data.isFetching ? (
            <Loading />
          ) : (
              <UserProfile
                user={data.user}
                handleChange={handleChange}
                password={password}
                onSubmit={onSubmit}
              />
            )}
          {result && result.message ? (<UncontrolledAlert color='success'>{result.message}</UncontrolledAlert>
          ) : undefined
          }
          {result && result.error ? (<UncontrolledAlert color='danger'>{result.error}</UncontrolledAlert>) : undefined}
        </Col>
      </div>
    </Container>
  );
};
export default Profile;
