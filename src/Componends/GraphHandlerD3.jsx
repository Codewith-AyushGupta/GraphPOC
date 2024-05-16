import React, { lazy, useEffect, useState } from 'react';
// import dummyData from '../SampData/data.json';
import { useData } from '../Componends/AppContext';

import Spinner from './Spinner';
const MasterGraphD3 = React.lazy(() => import('./MasterGraphD3'));

function GraphHandlerD3() {
    const [loading, setLoading] = useState(Array(6).fill(true));

    useEffect(() => {
        setLoading(Array(6).fill(false));
    }, []);
    const data = useData();
    const processdata = (dataStartRange, dataEndRange, chartName) => {
        const filtered = data
            .flatMap(record => record.sales_description)
            .filter(sale => sale.amount >= dataStartRange && sale.amount <= dataEndRange)
            .map(sale => sale.amount);
        if (filtered) {
            const data = {
                'name': 'Chart number ' + chartName,
                'ChartPoints': filtered,
                'datalength': filtered.length,
                'startRange': dataStartRange,
                'endRange': dataEndRange,
            };
            const chartData = {
                ...data,
                ChartPoints: data.ChartPoints.map((y, index) => ({ x: index, y }))
            };
            return chartData;
        } else {
            return null;
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
                            {loading[index] ? <Spinner /> : <MasterGraphD3 data={processdata(startRange, startRange + (index + 1) * 500, index + 1)} />}
                        </React.Suspense>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GraphHandlerD3;
