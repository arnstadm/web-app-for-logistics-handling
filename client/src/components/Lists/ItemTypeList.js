import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, UncontrolledTooltip } from 'reactstrap';
import ModalComponent from '../Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
const ItemTypeList = (props) => {
  const {
    setItemTypeToDelete,
    itemTypeList,
    handleClose,
    handleShow,
    modal,
    setModal,
    id,
    setId,
  } = props;
  return (
    <>
      <div>
        <hr />
        {itemTypeList.itemtypes && itemTypeList.itemtypes.map(
          ({ item_type_id, item_type_name, description, total }) => (
            <div key={item_type_id} className='userCard'>
              <Row>
                <Col>
                  <h3>{item_type_name}</h3>
                </Col>
              </Row>
              <Row xs='1' sm='2' md='4'>
                <Col>Item type ID: {item_type_id} </Col>
                <Col>Beskrivelse: {description} </Col>
                <Col>Antall varer: {total}</Col>
                <Col>
                  <Link
                    to={{
                      pathname: '/Edit/itemtype/' + item_type_id,
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
                    onClick={() => (setId(item_type_id), handleShow())}
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
          )
        )}
        <ModalComponent
          modal={modal}
          handleClose={handleClose}
          deleteFunction={setItemTypeToDelete}
          setModal={setModal}
          id={id}
        />
      </div>
    </>
  );
};
export default ItemTypeList;