import React, { useEffect, useRef } from 'react';
import {
    AreaChart,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area,
} from 'recharts';
import ReactDOM from 'react-dom'; // Add this import


function MasterGraphRechart({ data }) {
    const chartRef = useRef(null);

    useEffect(() => {
        function generateGraphIns() {
            if (!chartRef.current || !data || data.ChartPoints.length <= 0) {
                return;
            }
            const chartData = data.ChartPoints.map((point, index) => ({
                name: index.toString(),
                value: point,
            }));
            // Adjusted data format to match Recharts' expected format

            const chart = (
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="value" fill="#8884d8" />
                    </AreaChart>
                </ResponsiveContainer>
            );

            // Set the chart content using ReactDOM
            ReactDOM.render(chart, chartRef.current);
        }

        generateGraphIns();

        return () => {
            // Clean up the chart when the component unmounts
            if (chartRef.current) {
                ReactDOM.unmountComponentAtNode(chartRef.current);
            }
        };
    }, [data]);

    return (
        <div>
            <h1>POC Graph {data.name} from <strong>Rechart</strong></h1>
            <div ref={chartRef}></div>
            <div>Data Length: {data.datalength} from the Range between {data.startRange} - {data.endRange}</div>
        </div>
    );
}

export default MasterGraphRechart;
