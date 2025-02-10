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
const RegisterUser = (props) => {
  const { first_name, last_name, email, password, user_level, phone_number } =
    props.inputs || {};
  const { onSubmit, handleChange, result } = props;
  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Fornavn</Label>
          <Input
            placeholder='Fornavn'
            required
            name='first_name'
            type='text'
            defaultValue={first_name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Etternavn</Label>
          <Input
            placeholder='Etternavn'
            required
            name='last_name'
            type='text'
            defaultValue={last_name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>E-post</Label>
          <Input
            placeholder='adresse@eksempel.no'
            required
            name='email'
            type='email'
            defaultValue={email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>E-Telefon</Label>
          <Input
            placeholder='12 12 12 12'
            required
            pattern='[0-9]{8}'
            name='phone_number'
            type='tel'
            defaultValue={phone_number}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Passord (minst 5 tegn)</Label>
          <Input
            pattern='.{5,}'
            title='Passordet skal inneholde minst 5 tegn'
            required
            placeholder='*****'
            name='password'
            type='password'
            defaultValue={password}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Tilgangsnivå</Label>
          <Input
            required
            type='select'
            onChange={handleChange}
            defaultValue={user_level}
            name='user_level'
          >
            <option>Velg her..</option>
            <option value='Bruker'>Bruker</option>
            <option value='Admin'>Admin</option>
          </Input>
        </FormGroup>
        <Button size='sm' type='submit' color='primary'>
          Register
        </Button>{' '}
        <BackButton />
      </Form><br />
      {result.message ? (
        <Alert color='success'>{result.message}</Alert>
      ) : undefined}
    </Container>
  );
};
export default RegisterUser;
