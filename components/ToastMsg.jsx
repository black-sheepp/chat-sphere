import React from "react";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


const ToastMsg = () => {
     return (
          <ToastContainer
               position="top-center"
               hideProgressBar={false}
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="dark"
          />
     );
};

export default ToastMsg;
