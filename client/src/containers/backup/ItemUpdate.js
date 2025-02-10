import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Container, FormGroup, Button, Form, Label, Input } from 'reactstrap';
import Loading from './Loading';
import ApiCall from '../components/ApiCall';
import useInput from '../components/useInput';

const ItemUpdate = () => {
  const [inputs, handleChange] = useInput();
  const { name, item_type_id, amount } = inputs || {};
  const [results, setResults] = useState('');
  const [typename, setTypename] = useState([]);
  const [item, setItem] = useState({ name, item_type_id, amount });

  const updateItem = async (event) => {
    event.preventDefault();
    try {
      const response = await ApiCall('update-item', 'POST', inputs);
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
      <Form onSubmit={updateItem}>
        <FormGroup>
          <Label>Navn</Label>
          <Input
            placeholder='Navn'
            required
            name='name'
            type='text'
            defaultValue={item.name}
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
            required
            // defaultValue={item_type_name}
            onChange={handleChange}
          >
            {typename.type &&
              typename.type.map((items) => (
                <option key={items.item_type_id} value={items.item_type_id}>
                  {items.item_type_name}
                </option>
              ))}
          </Input>
        </FormGroup>
      </Form>
    </Container>
  );
};
export default ItemUpdate;
