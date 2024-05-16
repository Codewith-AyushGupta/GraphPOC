import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

function MasterGraphD3({ data }) {
  const svgRef = useRef();
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    if (!data) return;

    const svg = d3.select(svgRef.current);
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    svg.selectAll('*').remove();

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const area = d3.area()
      .x(d => x(d.x))
      .y0(height)
      .y1(d => y(d.y))
      .curve(d3.curveMonotoneX);

    const line = d3.line()
      .x(d => x(d.x))
      .y(d => y(d.y))
      .curve(d3.curveMonotoneX);

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xDomain = d3.extent(data.ChartPoints, d => d.x);
    x.domain(xDomain);

    y.domain([0, d3.max(data.ChartPoints, d => d.y)]);

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    g.append('g')
      .call(d3.axisLeft(y));

    // Create linear gradient
    const gradient = g.append("defs").append("linearGradient")
      .attr("id", "areaGradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", y(0))
      .attr("x2", 0).attr("y2", y(d3.max(data.ChartPoints, d => d.y)));

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "steelblue");
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "lightsteelblue");

    if (data.ChartPoints.length > 0) {
      g.append('path')
        .datum(data.ChartPoints)
        .attr('fill', 'url(#areaGradient)')
        .attr('stroke', 'none')
        .attr('d', area);

      g.append('path')
        .datum(data.ChartPoints)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', line);

      g.selectAll('circle')
        .data(data.ChartPoints)
        .enter().append('circle')
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y))
        .attr('r', 4)
        .attr('fill', 'steelblue')
        .on('mouseover', (event, d) => {
          setTooltip(d);
        })
        .on('mouseout', () => {
          setTooltip(null);
        });
    }

  }, [data]);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h1>Graph: {data.name} from D3 Charts</h1>
      <svg ref={svgRef} width={800} height={400}></svg>
      {tooltip && (
        <div style={{ position: 'absolute', top: tooltip.y, left: tooltip.x + 10, background: 'white', padding: '5px', border: '1px solid black' }}>
          <p>X: {tooltip.x}</p>
          <p>Y: {tooltip.y}</p>
        </div>
      )}
      <div>Data Length: {data.datalength} from the Range between {data.startRange} - {data.endRange}</div>
    </div>
  );
}

export default MasterGraphD3;
