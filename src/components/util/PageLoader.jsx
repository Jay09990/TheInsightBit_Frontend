import React from 'react';
import Spinner from './Spinner';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
      <Spinner />
    </div>
  );
};

export default PageLoader;
