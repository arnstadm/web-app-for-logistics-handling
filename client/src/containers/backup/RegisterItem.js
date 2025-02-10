import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import { Container, FormGroup, Button, Form, Label, Input } from 'reactstrap';
import ApiCall from '../components/ApiCall';
import useInput from '../components/useInput';

const RegisterForm = () => {
  const [inputs, handleChange] = useInput();

  const { name, item_type_id, amount } = inputs || {};
  const [results, setResults] = useState('');
  const [typename, setTypename] = useState([]);

  const registerItem = async (event) => {
    event.preventDefault();
    try {
      const response = await ApiCall('register-item', 'POST', inputs);
      setResults(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getItemTypesName = async () => {
      try {
        const type = await ApiCall('itemtypesname', 'GET');
        setTypename({ type });
        console.log(type);
      } catch (error) {
        console.log(error);
      }
    };
    getItemTypesName();
  }, []);

  return (
    <Container>
      <Form onSubmit={registerItem}>
        <FormGroup>
          <Label>Navn</Label>
          <Input
            placeholder='Navn'
            required
            name='name'
            type='text'
            defaultValue={name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Antall</Label>
          <Input
            placeholder='12345'
            required
            name='amount'
            type='number'
            defaultValue={amount}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='item_type_id'>Varetype</Label>
          <Input
            type='select'
            name='item_type_id'

            //  defaultValue={typename.item_type_name}
            onChange={handleChange}
          >
            <option>Velg her..</option>
            {typename.type &&
              typename.type.map((item) => (
                <option key={item.item_type_id} value={item.item_type_id}>
                  {item.item_type_name}
                </option>
              ))}
          </Input>
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
