import React, { useState } from 'react';
import {
  Button,
  Container,
  Form,
  Input,
  Label,
  FormGroup,
  Row,
  Col,
  UncontrolledAlert,
} from 'reactstrap';
import ApiCall from '../components/ApiCall';
import useInput from '../components/useInput';

const SignUp = () => {
  const [inputs, handleChange] = useInput();
  const { first_name, last_name, email, name, erp_system, password } =
    inputs || {};
  const [result, setResult] = useState();

  const registerCompany = async (event) => {
    event.preventDefault();
    try {
      const response = await ApiCall('signup', 'POST', inputs);
      console.log(response);
      setResult(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={registerCompany}>
            <h1 className='h3 mb-3 font-weight-normal'>Register</h1>
            <FormGroup>
              <Label htmlFor='first_name'>Fornavn</Label>
              <Input
                required
                type='text'
                className='form-control'
                name='first_name'
                placeholder='Skriv ditt fornavn'
                defaultValue={first_name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='last_name'>Etternavn</Label>
              <Input
                required
                type='text'
                className='form-control'
                name='last_name'
                placeholder='Skriv ditt etternavn'
                defaultValue={last_name}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor='email'>E-post adresse</Label>
              <Input
                required
                type='email'
                className='form-control'
                name='email'
                placeholder='Skriv e-post her'
                defaultValue={email}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='name'>Bedrift navn</Label>
              <Input
                required
                type='text'
                className='form-control'
                name='name'
                placeholder='Bedrift navn'
                defaultValue={name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor='erp_system'>ERP system</Label>
              <Input
                required
                type='text'
                className='form-control'
                name='erp_system'
                placeholder='ERP system'
                defaultValue={erp_system}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor='password'>Password</Label>
              <Input
                pattern='.{5,}'
                required
                title='Må inneholde minst 5 tegn'
                type='password'
                className='form-control'
                name='password'
                placeholder='Passord'
                defaultValue={password}
                onChange={handleChange}
              />
            </FormGroup>
            {result ? (
              <UncontrolledAlert color='success'>{result}</UncontrolledAlert>
            ) : undefined}
            <FormGroup>
              <Button type='submit' color='primary'>
                Register
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
