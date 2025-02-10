import React from 'react';
import '../CSS/loading.css';

function Loading(Component) {
  return (
    <div className='lds-ring'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loading;
