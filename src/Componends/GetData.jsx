import React, { useEffect } from 'react';
import { useData } from '../Componends/AppContext'; 

const GetData = () => {
    const data = useData();
    useEffect(()=>{
        if(data.length >0) {console.log('Data from Context API',data);}
    })
    return (
        <div>
            {/* {data} */}
        </div>  
    );
}

export default GetData;
