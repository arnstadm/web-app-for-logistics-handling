import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import { Container, FormGroup, Button, Form, Label, Input } from 'reactstrap';
import ApiCall from '../components/ApiCall';
import useInput from '../components/useInput';

const RegisterForm = () => {
  const [inputs, handleChange] = useInput();

  const { first_name, last_name, email, password, user_level } = inputs || {};
  const [results, setResults] = useState('');

  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await ApiCall('register-user', 'POST', inputs);
      setResults(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={registerUser}>
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
          <Label>Passord (minst 5 tegn)</Label>
          <Input
            pattern='.{5,}'
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
        {results.message ? (
          <p>
            <font color='red'>{results.message}</font>
          </p>
        ) : undefined}
        <Button size='sm' type='submit' color='primary'>
          Register
        </Button>
        <BackButton />
      </Form>
    </Container>
  );
};

export default RegisterForm;
