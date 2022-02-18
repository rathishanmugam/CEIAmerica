import React from "react";
import Spinner from "./Pinwheel.gif";

const PageLoader = () => {
    return (
        <div style={{display:"flex",justifyContent:"center"}} className="fp-container">
            <img src={Spinner}  className="fp-loader" alt="loading" />
        </div>
    );
};

export default PageLoader;
