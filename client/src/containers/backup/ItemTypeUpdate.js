import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import ApiCall from '../components/ApiCall';
import Loading from '../components/Loading';
import useInput from '../components/useInput';

const ItemTypesUpdate = (props) => {
  const [inputs, handleChange] = useInput;
  const { item_type_id, item_type_name, description } = inputs;
  const loading = false;
  useEffect(() => {
    const getItemType = async () => {
      try {
        const itemtype = await ApiCall(
          'singleitemtype/' + props.match.params.id,
          'GET'
        );
        handleChange(itemtype);
      } catch (error) {
        console.log(error);
      }
    };
    getItemType();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const test = await ApiCall('updateitemtype', 'POST', inputs);
      console.log('hei' + test);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Row>
            <Col sm='12' md={{ size: 6, offset: 3 }}>
              <h3>Oppdater varetype med id: {item_type_id}</h3>
              <form onSubmit={onSubmit}>
                <div className='form-group'>
                  <label>Navn: </label>
                  <input
                    className='form-control'
                    defaultValue={item_type_name}
                    onChange={handleChange}
                    name='item_type_name'
                  />
                </div>

                <div className='form-group'>
                  <label htmlFor='description'>Beskrivelse</label>
                  <input
                    type='text'
                    className='form-control'
                    name='description'
                    defaultValue={description}
                    onChange={handleChange}
                  />
                </div>

                <div className='form-group'>
                  <Button type='submit' size='sm' value='Lagre'>
                    Lagre
                  </Button>
                </div>
              </form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ItemTypesUpdate;
