import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Toast() {
  return (
    <ToastContainer position="top-center" autoClose={2000} 
    hideProgressBar 
    newestOnTop={false} 
    closeOnClick 
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
/>
  )
}

export default Toast