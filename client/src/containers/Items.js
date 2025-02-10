import React, { useState, useEffect } from 'react';
import ItemList from '../components/Lists/ItemList';
import { Button, Container, UncontrolledAlert } from 'reactstrap';
import { Link } from 'react-router-dom';
import ApiCall from '../components/ApiCall';
import Loading from '../components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Items = () => {
  const [itemList, setItemList] = useState({ items: [], isFetching: false });
  const [itemToDelete, setItemToDelete] = useState('');
  const [modal, setModal] = useState(false);
  const [id, setId] = useState('');
  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);
  const [result, setResult] = useState();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setItemList({ items: [], isFetching: true });
        const response = await ApiCall('items', 'GET');
        setItemList({ items: response.result, isFetching: false });
      } catch (error) {
        console.log(error);
        setItemList({ items: [], isFetching: false });
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const deleteItem = async () => {
      try {
        //setItemList({ items: [], isFetching: false });
        const response = await ApiCall('items/' + itemToDelete, 'DELETE');
        if (response.result) {
          const newItemList = itemList.items.filter(
            (item) => item.item_id !== itemToDelete
          );
          setItemList({ items: newItemList, isFetching: false });
        }
        setResult(response.message);
      } catch (error) {
        console.log(error);
        // setItemList({ items: [], isFetching: false });
      }
    };
    deleteItem();
  }, [itemToDelete]);

  return (
    <Container>
      <br />
      <Link to='/register/item'>
        <Button color='primary' size='sm'>
          <FontAwesomeIcon icon={faPlus} /> Ny vare
        </Button>
      </Link>
      <br />
      <h2>Oversikt over varer</h2>
      {result ? (
        <UncontrolledAlert color='success'>{result}</UncontrolledAlert>
      ) : undefined}
      {itemList.isFetching ? (
        <Loading />
      ) : (
          <ItemList
            setItemToDelete={setItemToDelete}
            itemList={itemList}
            setId={setId}
            id={id}
            handleClose={handleClose}
            handleShow={handleShow}
            modal={modal}
            setModal={setModal}
          />
        )}
    </Container>
  );
};

export default Items;
