import React from "react";
import PropTypes from "prop-types";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Label,
} from "recharts";

/**
 * RADAR CHARTS PROPS
 * @param { props } performance - Performance data
 */
const RadarCharts = ({ performance }) => {
  if (performance) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="48%" cy="50%" outerRadius="63%" data={performance}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <Radar
            dataKey="A"
            stroke="#ff0000"
            fill="#ff0000"
            fillOpacity={0.6}
          />
          <Label />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
};

RadarCharts.propTypes = {
  performance: PropTypes.array,
};

export default RadarCharts;
