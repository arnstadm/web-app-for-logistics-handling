import React, { useState, useEffect } from 'react';
import UserList from '../components/Lists/UserList';
import { Button, Container, UncontrolledAlert } from 'reactstrap';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import ApiCall from '../components/ApiCall';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Users = () => {
  const [userToDelete, setUserToDelete] = useState('');
  const [userList, setUserList] = useState({ users: [], isFetching: false });
  const [modal, setModal] = useState(false);
  const [id, setId] = useState('');
  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);
  const [result, setResult] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUserList({ users: [], isFetching: true });
        const response = await ApiCall('users', 'GET');
        setUserList({ users: response.result, isFetching: false });
      } catch (error) {
        console.log(error);
        setUserList({ users: [], isFetching: false });
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const deleteUser = async () => {
      try {
        setUserList({ users: [], isFetching: true });
        const response = await ApiCall('users/' + userToDelete, 'DELETE');
        const newUserList = userList.users.filter(
          (user) => user.user_id !== userToDelete
        );
        setUserList({ users: newUserList, isFetching: false });
        setResult(response.message);
      } catch (error) {
        console.log(error);
        setUserList({ users: [], isFetching: false });
      }
    };
    deleteUser();
  }, [userToDelete]);

  return (
    <Container>
      <br />
      <Link to='/register/user'>
        <Button color='primary' size='sm'>
          <FontAwesomeIcon icon={faPlus} /> Ny bruker
        </Button>
      </Link>
      <br />
      <h2>Oversikt over brukere</h2>
      {result && result ? (<UncontrolledAlert color='success'>{result}</UncontrolledAlert>
      ) : undefined
      }
      {result && result.error ? (<UncontrolledAlert color='danger'>{result.error}</UncontrolledAlert>) : undefined}
      {userList.isFetching ? (
        <Loading />
      ) : (
          <UserList
            setUserToDelete={setUserToDelete}
            userList={userList}
            setId={setId}
            id={id}
            handleClose={handleClose}
            handleShow={handleShow}
            modal={modal}
            setModal={setModal}
          />
        )}
    </Container>
  );
};

export default Users;
