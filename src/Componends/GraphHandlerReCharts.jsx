import React, { lazy, useEffect, useState } from 'react';
// import dummyData from '../SampData/data.json';
import { useData } from '../Componends/AppContext';
import Spinner from './Spinner';
const MasterGraphRechart = React.lazy(() => import('./MasterGraphRechart'));

function GraphHandlerReCharts() {
    const [loading, setLoading] = useState(Array(6).fill(true));

    useEffect(() => {
        setLoading(Array(6).fill(false));
    }, []);
    const data = useData();

    const processdata = (dataStartRange, dataEndRange, chartName) => {
        // const filtered = dummyData
        if (data.length > 0) {
            const filtered = data
                .flatMap(record => record.sales_description)
                .filter(sale => sale.amount >= dataStartRange && sale.amount <= dataEndRange)
                .map(sale => sale.amount);
            if (filtered) {
                return {
                    'name': 'Chart number ' + chartName,
                    'ChartPoints': filtered,
                    'datalength': filtered.length,
                    'startRange': dataStartRange,
                    'endRange': dataEndRange
                };
            } else {
                return null;
            }
        }
    }

    return (
        <div>
            <div className="GraphContainer">
                <span className='graphHandlerHeading'>
                    <h1>The Graphs...........</h1>
                </span>
                {[0].map((startRange, index) => (
                    <div key={index} className="graph">
                        <React.Suspense fallback={<Spinner />}>
                            {loading[index] ? <Spinner /> : <MasterGraphRechart data={processdata(startRange, startRange + (index + 1) * 500, index + 1)} />}
                        </React.Suspense>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GraphHandlerReCharts;
