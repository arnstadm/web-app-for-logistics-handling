import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import { Container, FormGroup, Button, Form, Label, Input } from 'reactstrap';
import ApiCall from '../components/ApiCall';
import useInput from '../components/useInput';

const RegisterForm = () => {
  const [inputs, handleChange] = useInput();

  const { item_type_name, description } = inputs || {};
  const [results, setResults] = useState('');

  const registerItemType = async (event) => {
    event.preventDefault();
    try {
      const response = await ApiCall('register-item-type', 'POST', inputs);
      setResults(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Form onSubmit={registerItemType}>
        <FormGroup>
          <Label>Navn</Label>
          <Input
            placeholder='Navn'
            required
            name='item_type_name'
            type='text'
            defaultValue={item_type_name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Beskrivelse</Label>
          <Input
            placeholder='Beskrivelse'
            required
            name='description'
            type='textarea'
            defaultValue={description}
            onChange={handleChange}
          />
        </FormGroup>
        {results.message ? (
          <p>
            <font color='red'>{results.message}</font>
          </p>
        ) : undefined}
        <Button size='sm' type='submit' color='primary'>
          Registrer
        </Button>{' '}
        <BackButton />
      </Form>
    </Container>
  );
};

export default RegisterForm;
