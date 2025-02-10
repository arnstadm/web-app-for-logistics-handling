import React, { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import InputDetections from '../components/Forms/InputDetections';
import ApiCall from '../components/ApiCall';
import { Button } from 'reactstrap';
import { Container, Row, Col, Form } from 'reactstrap';
import DetectedImage from '../components/DetectedImage';
import Loading from './Loading';

const AddRemove = () => {
  const [usePicture, setUsePicture] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [response, setResponse] = useState();
  const [projects, setProjects] = useState();
  const [fetching, setFetching] = useState(true);
  const [predictions, setPredictions] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [imageData, setImageData] = useState('');
  const [items, setItems] = useState();
  const [classes, setClasses] = useState();

  useEffect(() => {
    const getProjects = async () => {
      try {
        setFetching(true);
        const response = await ApiCall('projects', 'GET');
        setProjects(response.projects);
        setFetching(false);
      } catch (error) {
        console.log(error);
        setFetching(false);
      }
    };
    const getItems = async () => {
      try {
        setFetching(true);
        const response = await ApiCall('items', 'GET');
        setItems(response.items);
        setFetching(false);
      } catch (error) {
        console.log(error);
        setFetching(false);
      }
    };
    const getClasses = async () => {
      try {
        setFetching(true);
        const response = await ApiCall('classes', 'GET');
        setClasses(response.classes);
        setFetching(false);
      } catch (error) {
        console.log(error);
        setFetching(false);
      }
    };
    getProjects();
    getItems();
    getClasses();
  }, []);

  const generateTransaction = async (e) => {
    e.preventDefault();
    for (const transaction of transactions) {
      const results = await ApiCall('transactions', 'POST', transaction);
      setResponse(results);
    }
  };

  const handleTransactionChange = (index) => (e) => {
    let newArr = [...transactions];
    let newObject = { ...newArr[index] };
    newObject[e.target.name] = e.target.value;
    newArr[index] = newObject;
    setTransactions(newArr);
  };

  const initializePredictionObjects = (submittedPredictions) => {
    const values = submittedPredictions.map((prediction) => ({
      item_id: items.find((item) => item.name === prediction.class).item_id,
      amount: 1,
      project_id: projects[0]['project_id'],
      score: prediction.score,
      name: prediction.class,
    }));
    setTransactions(...transactions, values);
  };

  const submitPicture = async (e) => {
    e.preventDefault();
    const results = await ApiCall('images', 'POST', {
      imageData: imageData,
    });
    setPredictions(results);
    initializePredictionObjects(results);
  };

  const onChangePictureInput = (e) => {
    imageToBase64(e.target.files[0]);
  };

  const imageToBase64 = async (image) => {
    let file = image;
    setImageUrl(URL.createObjectURL(file));
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImageData(e.target.result);
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  };


  //add fields to form https://codesandbox.io/s/q555kp8jj
  const handleAddInput = (e) => {
    e.preventDefault();
    let object = {
      item_id: items[0]['item_id'],
      amount: 1,
      project: projects[0]['project_id'],
    };
    addField(object);
  };

  const handleRemove = (e) => (index) => {
    let transaction = [...transactions];
    transaction.splice(index, 1);
    setTransactions(transaction);
  };

  const addField = (object) => {
    let newArray = [...transactions, object];
    setTransactions(newArray);
  };

  return (
    <>
      {fetching ? (
        <Loading />
      ) : (
        <Container>
          <Row>
            <Col>
              <h1 className='h3 mb-3  font-weight-normal'>
                Legg til eller ta ut varer
              </h1>
            </Col>
          </Row>

          <Row>
            <Button
              onClick={() => setUsePicture(!usePicture)}
              color='primary'
              size='sm'
            >
              {!usePicture ? 'Last opp bilde' : 'Ta bort bildeopplastingen'}
            </Button>
          </Row>
          <br />
          <Row>
            {usePicture ? (
              <ImageUpload
                submitPicture={submitPicture}
                onChangePictureInput={onChangePictureInput}
                generateTransaction={generateTransaction}
                handleTransactionChange={handleTransactionChange}
                imageUrl={imageUrl}
                imageData={imageData}
                predictions={predictions}
                transactions={transactions}
                response={response}
                projects={projects}
                items={items}
              />
            ) : undefined}
            {predictions ? (
              <DetectedImage image={imageUrl} predictions={predictions} />
            ) : undefined}
          </Row>

          <Form onSubmit={generateTransaction}>
            {transactions &&
              transactions.map((transaction, index) => {
                return (
                  <InputDetections
                    key={'manualinput' + index}
                    index={index}
                    handleChange={handleTransactionChange}
                    projects={projects}
                    items={items}
                    handleRemove={handleRemove()}
                    defaultItem={
                      (transaction && transaction.item_id) || undefined
                    }
                    score={(transaction && transaction.score) || undefined}
                    name={(transaction && transaction.name) || undefined}
                  />
                );
              })}
            <br />
            <Row>
              <Button
                color='secondary'
                outline
                size='sm'
                onClick={handleAddInput}
              >
                Legg til felt
              </Button>
            </Row>
            <br />
            <Row>
              <Button type='submit' color='success'>
                Send inn
              </Button>
            </Row>
          </Form>
        </Container>
      )}
    </>
  );
};

export default AddRemove;
