'use client';

import { Toaster } from 'react-hot-toast';

export const ToasterProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: 'white',
          color: '#000'
        }
      }}
    />
  );
};

export default ToasterProvider;
