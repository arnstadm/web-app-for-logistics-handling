import { useState } from 'react';

const useInput = () => {
  const [input, setInput] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((input) => ({ ...input, [name]: value }));
  };

  const initializeInput = (object) => {
    setInput(object);
  };

  return [input, handleChange, initializeInput];
};
export default useInput;
