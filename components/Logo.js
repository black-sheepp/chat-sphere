import React from "react";
import Style from './Logo.module.css'

const Logo = () => {
     return (
          <div className={Style.loader1}>
               <div className={Style.loader2} />
               <div className={Style.loader3} />
               <div className={Style.loader4} />
          </div>
     );
};

export default Logo;
