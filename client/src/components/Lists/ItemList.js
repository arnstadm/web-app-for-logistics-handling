import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, UncontrolledTooltip, Container } from 'reactstrap';
import ModalComponent from '../Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const ItemList = (props) => {
  const {
    setItemToDelete,
    itemList,
    handleClose,
    handleShow,
    modal,
    setModal,
    id,
    setId,
  } = props;

  return (
    <Container>
      <div>
        <hr />
        {itemList.items &&
          itemList.items.map(({ item_id, name, item_type_name, amount }) => (
            <div key={item_id} className='userCard'>
              <Row>
                <Col xs='6' sm='4'>
                  <h3>{name}</h3>
                </Col>
              </Row>
              <Row>
                <Col xs='6' sm='4'>
                  Varetype: {item_type_name}
                </Col>
                <Col>Antall: {amount}</Col>
                <br />
                <Col xs='auto'>
                  <Link
                    to={{
                      pathname: '/Edit/item/' + item_id,
                    }}
                  >
                    <UncontrolledTooltip placement='left' target='Endre'>
                      Endre
                    </UncontrolledTooltip>
                    <Button id='Endre' color='info' size='sm'>
                      <FontAwesomeIcon icon={faPencilAlt} /> Endre
                    </Button>
                  </Link>{' '}
                  <UncontrolledTooltip placement='right' target='Slette'>
                    Slette
                  </UncontrolledTooltip>
                  <Button
                    id='Slette'
                    onClick={() => (setId(item_id), handleShow())}
                    outline
                    color='info'
                    size='sm'
                  >
                    <FontAwesomeIcon icon={faTrashAlt} /> Slette
                  </Button>
                </Col>
              </Row>
              <hr />
            </div>
          ))}
        <ModalComponent
          modal={modal}
          handleClose={handleClose}
          deleteFunction={setItemToDelete}
          setModal={setModal}
          id={id}
        />
      </div>
    </Container>
  );
};
export default ItemList;
