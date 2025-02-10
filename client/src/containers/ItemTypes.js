import React, { useState, useEffect } from 'react';
import ItemTypeList from '../components/Lists/ItemTypeList';
import { Container, Button, UncontrolledAlert } from 'reactstrap';
import { Link } from 'react-router-dom';
import ApiCall from '../components/ApiCall';
import Loading from '../components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ItemTypes = () => {
  const [itemTypeList, setItemTypeList] = useState({
    itemtypes: [],
    isFetching: false,
  });
  const [itemTypeToDelete, setItemTypeToDelete] = useState('');

  const [modal, setModal] = useState(false);
  const [id, setId] = useState('');

  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);
  const [result, setResult] = useState();

  useEffect(() => {
    const fetchItemtypes = async () => {
      try {
        setItemTypeList({ itemtypes: [], isFetching: true });
        const response = await ApiCall('itemtypes', 'GET');
        setItemTypeList({ itemtypes: response.result, isFetching: false });
      } catch (error) {
        console.log(error);
        setItemTypeList({ itemtypes: [], isFetching: false });
      }
    };
    fetchItemtypes();
  }, []);

  useEffect(() => {
    const deleteItem = async () => {
      try {
        setItemTypeList({ itemstypes: [], isFetching: false });
        const response = await ApiCall(
          'itemtype/' + itemTypeToDelete,
          'DELETE'
        );
        const newItemTypeList = itemTypeList.itemtypes.filter(
          (item) => item.item_type_id !== itemTypeToDelete
        );
        setItemTypeList({ itemtypes: newItemTypeList, isFetching: false });
        setResult(response.message);
      } catch (error) {
        console.log(error);
        setItemTypeList({ itemtypes: [], isFetching: false });
      }
    };
    deleteItem();
  }, [itemTypeToDelete]);

  return (
    <Container>
      <br />
      <Link to='/register/itemtype'>
        <Button color='primary' size='sm'>
          <FontAwesomeIcon icon={faPlus} /> Ny varetype
        </Button>
      </Link>
      <h2> Oversikt over varetyper</h2>
      {result ? (
        <UncontrolledAlert color='success'>{result}</UncontrolledAlert>
      ) : undefined}
      {ItemTypeList.isFetching ? (
        <Loading />
      ) : (
        <ItemTypeList
          setId={setId}
          id={id}
          setItemTypeToDelete={setItemTypeToDelete}
          itemTypeList={itemTypeList}
          handleClose={handleClose}
          handleShow={handleShow}
          modal={modal}
          setModal={setModal}
        />
      )}
    </Container>
  );
};

export default ItemTypes;
