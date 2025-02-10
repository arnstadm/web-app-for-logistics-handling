import React from 'react';
import { Button } from 'reactstrap';
import { Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
const ImageUpload = (props) => {
  const { submitPicture, onChangePictureInput } = props;
  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={submitPicture}>
            <h3 className='h3 mb-3 font-weight-normal'>Last opp bilde</h3>
            <FormGroup>
              <Input
                type='file'
                accept='image/jpeg, image/png'
                className='form-control'
                name='imageData'
                onChange={onChangePictureInput}
              />
            </FormGroup>
            <Button type='submit' color='primary' size='sm'>
              Last opp
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default ImageUpload;