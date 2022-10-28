import React, {useState} from "react";
import PageLoader from "../pageLoader";

const useLoader = () => {
    const [loading, setLoading] = useState(false);

    return [
        loading ? <PageLoader/> : null,
        () => setLoading(true), //Show loader
        () => setLoading(false) //Hide Loader
    ];
};

export default useLoader;
