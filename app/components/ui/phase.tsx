"use client"

import { useMemo, useState, useEffect } from "react";
import * as d3 from "d3";
import { data, currentDay } from "./data";

type DonutChartProps = {
  width: number;
  height: number;
};

const MARGIN_X = 150; // Adjust these margins proportionally if needed
const MARGIN_Y = 50; // Adjust these margins proportionally if needed
const INFLEXION_PADDING = 15; // Space between donut and label inflexion point

const colors = ["#ea404e", "#1a5c56", "#f87c00", "#0092bb"];

export const DonutChart = ({ width, height }: DonutChartProps) => {
  const [menstrualPhase, setMenstrualPhase] = useState<string | null>(null)

  useEffect(() => {
    fetch('https://moonsync.api/api/biometrics', {
      method: 'POST',
      body: JSON.stringify({ key: '42' }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('biodata', data)
        setMenstrualPhase('Late Luteal'.toLowerCase().replace(/ /g,''))
      });
  }, [])

  const adjustedWidth = width * 2;
  const adjustedHeight = height * 2;
  const phaseToPositionMap = {
    follicular: 16,
    earlyluteal: 25,
    lateluteal: 33,
    menstruation: 36,
    midluteal: 29,
    ovulation: 5, //TODO
  }
  const radius =
    Math.min(adjustedWidth - 2 * MARGIN_X, adjustedHeight - 2 * MARGIN_Y) / 2;
  const innerRadius = radius / 1.1;

  const pie = useMemo(() => {
    const pieGenerator = d3
      .pie<any, (typeof data)[number]>()
      .sort(null) // Disable sorting to maintain the order of the data
      .value((d) => d.value);
    return pieGenerator(data);
  }, []);

  const arcGenerator = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(radius)
    .cornerRadius(15); // Set corner radius for all arcs

  const labelArc = d3
    .arc()
    .innerRadius(radius + INFLEXION_PADDING) // Move labels outside the donut
    .outerRadius(radius + INFLEXION_PADDING);

  const totalDays = d3.sum(data, (d) => d.value);
  const currentDayAngleStart =
    (phaseToPositionMap[menstrualPhase] / totalDays) * 2 * Math.PI - Math.PI / 2;
  const currentDayAngleEnd =
    currentDayAngleStart + (1 / totalDays) * 2 * Math.PI;
  let currentDayColor  = "#ea404e";
  pie.forEach((slice, i) => {
    if (
      currentDayAngleStart >= slice.startAngle &&
      currentDayAngleStart <= slice.endAngle
    ) {
      currentDayColor = colors[i % colors.length];
    }
  });

  const currentDayArc = d3
    .arc()
    .innerRadius(radius - 50)
    .outerRadius(radius + 25)
    .startAngle(currentDayAngleStart)
    .endAngle(currentDayAngleEnd)
    .cornerRadius(50); // Set cornerRadius for current day arc

  const shapes = pie.map((grp, i) => {
    const slicePath = arcGenerator(grp);
    const labelPosition = labelArc.centroid(grp);
    const isRightLabel = labelPosition[0] > 0;
    const textAnchor = isRightLabel ? "start" : "end";

    return (
      <g key={i}>
        <path d={slicePath} fill={colors[i % colors.length]} />
        <text
          x={labelPosition[0]}
          y={labelPosition[1]}
          textAnchor={textAnchor}
          dominantBaseline="middle"
          fontSize="30"
          fill={colors[i % colors.length]}
          style={{ fontFamily: "Public Sans, sans-serif", fontStyle: "italic" }}
        >
          {grp.data.name}
        </text>
      </g>
    );
  });

  return (
    <svg
    
      width={adjustedWidth}
      height={adjustedHeight}
      style={{ display: "inline-block" }}
      className="-mt-24"
    >
      <g transform={`translate(${width}, ${height})`}>
        {shapes}
        <path
          className="animate-pulse"
          d={currentDayArc()}
          fill={currentDayColor} // Dynamically set color for the current day
        />
        {/* Adding image in the center */}
        <image
          href={"/centerLogo.png"}
          x={-innerRadius * 0.75} // Center the image
          y={-innerRadius * 0.75}
          height={innerRadius * 1.5} // Set the image size to fit within the inner radius
          width={innerRadius * 1.5} // Maintain aspect ratio
        />
        {/* Add the Late Luteal image with transparency */}
        <image
          href={"/LateLuteal.png"}
          x={-width / 1.5} // Adjust this value to position correctly
          y={-height / 1.7} // Adjust this value to position correctly
          height="100" // Set as needed
          width="155" // Set as needed
          opacity="0.98" // Set transparency
        />

        {/* Add the Early Luteal image with transparency */}
        <image
          href={"/EarlyLuteal.png"}
          x={-width / 1.3} // Adjust this value to position correctly
          y={-height / 5} // Adjust this value to position correctly
          height="200" // Set as needed
          width="150" // Set as needed
          opacity="0.95" // Set transparency
        />

        {/* Add the Follicular image with transparency */}
        <image
          href={"/Follicular.png"}
          x={width / 3.6} // Adjust this value to position correctly
          y={-height / 2} // Adjust this value to position correctly
          height="200" // Set as needed
          width="130" // Set as needed
          opacity="0.95" // Set transparency
        />
      </g>
    </svg>
  );
};
