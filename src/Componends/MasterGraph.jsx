import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

function MasterGraph({ data }) {
    const chartRef = useRef(null);

    useEffect(() => {
        function generateGraphIns() {
            // console.log('data was',JSON.stringify(data))
            if (!chartRef.current || !data || data.datalength <= 0) {
                return;
            }
            const options = {
                series: [{ name: "Session Duration", data: data.ChartPoints }],
                chart: { height: 350, type: 'area', zoom: { enabled: true } },
                dataLabels: { enabled: false },
                stroke: { width: 2 }
            };
            const chart = new ApexCharts(chartRef.current, options);
            chart.render();
        }
        generateGraphIns();
        return () => {
            // Clean up the chart when the component unmounts
            if (chartRef.current) {
                chartRef.current.innerHTML = '';
            } 
        };
    }, [data]);

    return (
        <div>
            <h1>POC Graph {data.name} <strong>From ApexCharts</strong> </h1>
            <div ref={chartRef}></div>
            <div>Data Length: {data.datalength} from the Range between {data.startRange} - {data.endRange}</div>
        </div>
    );
}

export default MasterGraph;
