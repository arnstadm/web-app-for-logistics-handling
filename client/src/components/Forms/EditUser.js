import React from 'react';

import {
  Container,
  FormGroup,
  Button,
  Form,
  Label,
  Input,
  Alert,
} from 'reactstrap';
import BackButton from '../BackButton';

const EditUser = (props) => {
  const {
    user_id,
    first_name,
    last_name,
    email,
    user_level,
    phone_number,
    password,
  } = props.inputs || {};

  const { onSubmit, handleChange, result } = props;

  return (
    <Container>
      <h3>Endring for bruker {user_id}</h3>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Fornavn</Label>
          <Input
            name='first_name'
            type='text'
            defaultValue={first_name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Etternavn</Label>
          <Input
            name='last_name'
            type='text'
            defaultValue={last_name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>E-post</Label>
          <Input
            name='email'
            type='email'
            defaultValue={email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Telefon</Label>
          <Input
            name='phone_number'
            pattern='[0-9]{8}'
            type='tel'
            defaultValue={phone_number}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Passord</Label>
          <Input
            pattern='.{5,}'
            name='password'
            type='password'
            onChange={handleChange}
            defaultValue={password}
          />
        </FormGroup>
        <FormGroup>
          <Label>Tilgangsnivå</Label>
          <Input
            type='select'
            onChange={handleChange}
            value={user_level}
            name='user_level'
          >
            <option value='Bruker'>Bruker</option>
            <option value='Admin'>Admin</option>
          </Input>
        </FormGroup>
        <Button size='sm' type='submit' color='primary'>
          Lagre
        </Button>{' '}
        <BackButton />
      </Form>
      <br />
      {result.message ? (
        <Alert color='success'>{result.message}</Alert>
      ) : undefined}
    </Container>
  );
};
export default EditUser;
