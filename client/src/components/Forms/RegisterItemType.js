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
const RegisterItemType = (props) => {
  const { item_type_name, description } = props.inputs || {};
  const { onSubmit, handleChange, result } = props;
  return (
    <Container>
      <Form onSubmit={onSubmit}>
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
        <Button size='sm' type='submit' color='primary'>
          Registrer
        </Button>{' '}
        <BackButton />
      </Form><br />
      {result.message ? (
        <Alert color='success'>{result.message}</Alert>
      ) : undefined}
    </Container>
  );
};
export default RegisterItemType;
