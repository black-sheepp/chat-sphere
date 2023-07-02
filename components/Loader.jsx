import React from "react";
import Style from "./Loader.module.css"

const Loader = () => {
     return (
          <div>
               <div className={Style.loading}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
               </div>
               {/* <h1>ChatSphere</h1> */}
          </div>
     );
};

export default Loader;
