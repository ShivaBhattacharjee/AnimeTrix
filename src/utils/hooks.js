import { useEffect } from "react";

export const useFetchInitialData = (loading, data, fetchData, clientRef, container) => {
    useEffect(() => {
        if (clientRef && container && clientRef.current && !loading && (clientRef.current.clientHeight + 150 < container.innerHeight)) {
            fetchData();  
        }
    }, [loading, data, clientRef, fetchData, container]);
};
