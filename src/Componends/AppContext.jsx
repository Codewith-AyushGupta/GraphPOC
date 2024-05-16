import React, { useEffect, useState, createContext, useContext,lazy } from 'react';
import sampleData from '..//SampData/data.json';
// const sampleData =  lazy(()=>import('..//SampData/dummy_sales_data.json'))
const DataContext = createContext();
function AppContext({ children }) {
    const [data, setData] = useState([]);
    useEffect(() => {
        setData(sampleData);
        console.log('data',data);
    }, []);
    return (
        <DataContext.Provider value={data}>
            {children}
        </DataContext.Provider>
    );
}
export const useData = () => useContext(DataContext);
export default AppContext;
