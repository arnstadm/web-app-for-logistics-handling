import React, { useState, useEffect } from 'react';
import useInput from '../components/useInput';
import ApiCall from '../components/ApiCall';
import EditUser from '../components/Forms/EditUser';
import EditItem from '../components/Forms/EditItem';
import EditItemType from '../components/Forms/EditItemType';
import EditProject from '../components/Forms/EditProject';
import Loading from '../components/Loading';
import chooseEntity from '../functions/chooseEntity';
import getItemTypesName from '../functions/getItemTypesName';

const Edit = (props) => {
  const [inputs, handleChange, initializeInput] = useInput();
  const { type, id } = props.match.params;
  const [entity, setEntity] = useState('');
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState('');
  const [typename, setTypeName] = useState([]);

  console.log(inputs);

  useEffect(() => {
    const getContent = async () => {
      try {
        setLoading(true);
        const data = await ApiCall(entity + '/' + id, 'GET');
        setApiData(data.result);
        delete data.result.password;
        initializeInput(data.result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getContent();
  }, [entity, id]);

  useEffect(() => {
    const populateItemTypes = async () => {
      const types = await getItemTypesName();
      setTypeName(types);
    };
    populateItemTypes();
  }, []);

  useEffect(() => {
    setEntity(chooseEntity(type));
  }, [type]);

  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await ApiCall(entity + '/' + id, 'PUT', inputs);
    setResult(response);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        (entity === 'users' && (
          <EditUser
            handleChange={handleChange}
            user={apiData}
            inputs={inputs}
            onSubmit={onSubmit}
            result={result}
          />
        )) ||
        (entity === 'items' && (
          <EditItem
            handleChange={handleChange}
            item={apiData}
            inputs={inputs}
            onSubmit={onSubmit}
            result={result}
            typename={typename.itemtypes}
          />
        )) ||
        (entity === 'itemtypes' && (
          <EditItemType
            handleChange={handleChange}
            itemType={apiData}
            inputs={inputs}
            onSubmit={onSubmit}
            result={result}
          />
        )) ||
        (entity === 'projects' && (
          <EditProject
            handleChange={handleChange}
            project={apiData}
            inputs={inputs}
            onSubmit={onSubmit}
            result={result}
          />
        ))
      )}
    </>
  );
};

export default Edit;
