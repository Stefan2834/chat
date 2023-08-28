import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TestComponent = () => {
  const showNotification = () => {
    toast.success('Test Notification', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <div>
      <button onClick={showNotification}>Show Test Notification</button>
      <ToastContainer />
    </div>
  );
};

export default TestComponent;
