import React from "react";
import PropTypes from "prop-types";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const dataFull = [{ name: "Middle", value: 1 }];
const COLORS = ["red", "transparent"];

/**
 * RADIAL CHARTS LABEL PROPS
 * @param { props } score - Customize Label data
 */
const renderCustomizedLabel = (score) => {
  return (
    <>
      <text className="top-left" x={25} y={40} fill="black">
        {`Score`}
      </text>
      <text className="top" x={105} y={120} fill="black">
        {`${score[0].value * 100}%`}
      </text>
      <text
        className="bottom"
        x={99}
        y={142}
        fill="black"
        dominantBaseline="central"
      >
        {`de votre`}
      </text>
      <text
        className="bottom2"
        x={101}
        y={168}
        fill="black"
        dominantBaseline="central"
      >
        {`objectif`}
      </text>
    </>
  );
};

/**
 * RADIAL CHARTS PROPS
 * @param { props } score - Score data
 */
const RadialChart = ({ score }) => {
  if (score) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart barSize={2} width={500} height={500}>
          <Pie
            data={dataFull}
            dataKey="value"
            cx="52%"
            cy="53%"
            fill="white"
            innerRadius="6%"
            outerRadius="60%"
          />
          <Pie
            data={score}
            cx="52%"
            cy="53%"
            labelLine={false}
            label={renderCustomizedLabel(score)}
            dataKey="value"
            innerRadius="66%"
            outerRadius="75%"
            cornerRadius="12"
            startAngle={80}
          >
            {score.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }
};

RadialChart.propTypes = {
  score: PropTypes.array,
};

export default RadialChart;
