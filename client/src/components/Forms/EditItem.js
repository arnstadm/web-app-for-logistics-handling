import React from 'react';

import {
  Container,
  FormGroup,
  Input,
  Button,
  Form,
  Label,
  Alert,
} from 'reactstrap';
import BackButton from '../BackButton';

const EditItem = (props) => {
  const { name, amount, item_type_name } = props.item || {};
  const { handleChange, typename, onSubmit, result } = props;
  return (
    <Container>
      <Form onSubmit={onSubmit}>
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
            required
            defaultValue={item_type_name}
            onChange={handleChange}
          >
            <option>Velg her..</option>
            {typename &&
              typename.map((items) => (
                <option key={items.item_type_id} value={items.item_type_id}>
                  {items.item_type_name}
                </option>
              ))}
          </Input>
        </FormGroup>
        <Button size='sm' type='submit' color='primary'>
          Register
        </Button>{' '}
        <BackButton />
      </Form><br />
      {result.message ? <Alert color='success'>{result.message}</Alert> : undefined}
    </Container>
  );
};
export default EditItem;
