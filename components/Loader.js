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
          </div>
     );
};

export default Loader;
