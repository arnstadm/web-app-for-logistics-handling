import React from 'react';
import { Button, Input, Form } from 'reactstrap';

const ChangePassword = (props) => {
  const { handleChange, password, onSubmit } = props;
  return (
    <Form onSubmit={onSubmit}>
      <Input
        type='password'
        required
        onChange={handleChange}
        name='password'
        defaultValue={password}
        pattern='.{5,}'
        title='Passord skal bestå av minst 5 tegn'
      />
      <Button size='sm' type='submit' color='danger' >
        Bytt passord
      </Button>
    </Form>
  );
};
export default ChangePassword;
