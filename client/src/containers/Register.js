import React, { useState, useEffect } from 'react';
import ApiCall from '../components/ApiCall';
import useInput from '../components/useInput';
import RegisterUser from '../components/Forms/RegisterUser';
import RegisterItem from '../components/Forms/RegisterItem';
import RegisterItemType from '../components/Forms/RegisterItemType';
import RegisterProject from '../components/Forms/RegisterProject';
import Loading from '../components/Loading';
import chooseEntity from '../functions/chooseEntity';
import getItemTypesName from '../functions/getItemTypesName';

const Register = (props) => {
  const [inputs, handleChange] = useInput();
  const { type } = props.match.params;
  const [entity, setEntity] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [typename, setTypeName] = useState([]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await ApiCall(entity, 'POST', inputs);
      setResult(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
          (entity === 'users' && (
            <RegisterUser
              handleChange={handleChange}
              inputs={inputs}
              onSubmit={onSubmit}
              result={result}
            />
          )) ||
          (entity === 'items' && (
            <RegisterItem
              handleChange={handleChange}
              inputs={inputs}
              onSubmit={onSubmit}
              result={result}
              typename={typename.itemtypes}
            />
          )) ||
          (entity === 'itemtypes' && (
            <RegisterItemType
              handleChange={handleChange}
              inputs={inputs}
              onSubmit={onSubmit}
              result={result}
            />
          )) ||
          (entity === 'projects' && (
            <RegisterProject
              handleChange={handleChange}
              inputs={inputs}
              onSubmit={onSubmit}
              result={result}
            />
          ))
        )}
    </>
  );
};

export default Register;
