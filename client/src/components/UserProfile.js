import React from 'react';
import ChangePassword from './ChangePassword';
import { Table } from 'reactstrap';

const UserProfile = (props) => {
  const {
    user_id,
    first_name,
    last_name,
    email,
    user_level,
    phone_number,
  } = props.user;
  const { handleChange, password, onSubmit } = props;
  console.log(props)

  return (
    <Table borderless>
      <tbody>
        <tr>
          <td>ID</td>
          <td>{user_id}</td>
        </tr>
        <tr>
          <td>Fornavn</td>
          <td>{first_name}</td>
        </tr>
        <tr>
          <td>Etternavn</td>
          <td>{last_name}</td>
        </tr>
        <tr>
          <td>E-post</td>
          <td>{email}</td>
        </tr>
        <tr>
          <td>Telefon</td>
          <td>{phone_number}</td>
        </tr>
        <tr>
          <td>Tilgangsnivå</td>
          <td>{user_level}</td>
        </tr>
        <tr>
          <td>Nytt passord:</td>
          <td>
            <ChangePassword
              handleChange={handleChange}
              password={password}
              onSubmit={onSubmit}
            />
          </td>
        </tr>
      </tbody>
    </Table>
  );
};
export default UserProfile;
