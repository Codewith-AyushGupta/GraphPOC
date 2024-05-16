import React, { lazy, useEffect, useState } from 'react';
import Spinner from '..//Componends/Spinner';
import { useData } from '../Componends/AppContext';
import { useSelector, useDispatch } from 'react-redux';
import { loadJsonData, filterData1 } from '..//redux/action/index';

const MasterGraph = lazy(() => import('..//Componends/MasterGraph'));

function GraphHandler() {
    const graphState = useSelector((state) => state.filteredData);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(Array(6).fill(true));
    const data = useData();

    useEffect(() => {
        setLoading(Array(6).fill(false)); 
    }, []);

    const fetchDataFromRedux = () => {
        const jsonData = require('..//SampData/data.json');
        dispatch(loadJsonData(jsonData));
    };

    // const processdata = (dataStartRange, dataEndRange, chartName) => {
    //     if (data.length > 0) {
    //         const filtered = data
    //             .flatMap(record => record.sales_description)
    //             .filter(sale => sale.amount >= dataStartRange && sale.amount <= dataEndRange)
    //             .map(sale => sale.amount);
    //         if (filtered) {
    //             return {
    //                 'name': 'Chart number ' + chartName,
    //                 'ChartPoints': filtered,
    //                 'datalength': filtered.length,
    //                 'startRange': dataStartRange,
    //                 'endRange': dataEndRange
    //             };
    //         } else {
    //             return null;
    //         }
    //     }
    // };

    return (
        <div>
            <div className="GraphContainer">
                <span className='graphHandlerHeading'>
                    <h1>The Graphs...........</h1>
                </span>
                {[0].map((startRange, index) => (
                    <div key={index} className="graph">
                        <React.Suspense fallback={<Spinner />}>
                            <button onClick={fetchDataFromRedux}>Get data from Redux</button>
                            {/* <MasterGraph data={processdata(0, 200, index + 1)} /> */}
                            <MasterGraph data={graphState} />
                        </React.Suspense>
                        <p>{JSON.stringify(graphState)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default GraphHandler;
