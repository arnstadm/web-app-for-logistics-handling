import React from 'react';
import {
  Button,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  Form,
  Container,
  FormGroup,
  Row,
  Col,
  Label,
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const LoginForm = (props) => {
  const { email, password, handleChange, onSubmit, token } = props;

  return (
    <Container>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col sm='12' md={{ size: 6, offset: 3 }}>
            <FormGroup>
              <Label>E-post adresse</Label>
              <InputGroup>
                <InputGroupAddon addonType='append'>
                  <InputGroupText>
                    <FontAwesomeIcon icon={faUser} />
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type='email'
                  name='email'
                  placeholder='Din e-post'
                  defaultValue={email}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm='12' md={{ size: 6, offset: 3 }}>
            <Label>Passord</Label>
            <InputGroup>
              <InputGroupAddon addonType='append'>
                <InputGroupText>
                  <FontAwesomeIcon icon={faLock} />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type='password'
                name='password'
                placeholder='Passord'
                defaultValue={password}
                onChange={handleChange}
              />
            </InputGroup>
          </Col>
        </Row>
        <br />
        <Row>
          <Col sm='12' md={{ size: 6, offset: 3 }}>
            <Button type='submit' color='primary'>
              Logg inn
            </Button>{' '}
            <Link to='/signup'>
              <Button outline color='primary'>
                Registrer deg
              </Button>
            </Link>
            {token.data.message ? (
              <p>
                <font color='red'>{token.data.message}</font>
              </p>
            ) : undefined}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default LoginForm;
