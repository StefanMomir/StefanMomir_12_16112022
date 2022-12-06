import React from "react";
import PropTypes from "prop-types";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

/**
 * LINE CHART PROPS
 * @param { props } session - Session data
 */
const LineCharts = ({ session }) => {
  /**
   * LINE CHARTS TOOLTIP SPECIFIC PROPS
   * @param { props } payload - bars data
   * @param { props } active - bars hover state, boolean
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${payload[0].value} min`}</p>
        </div>
      );
    }
  };
  if (session) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={session}
          height={800}
          width={800}
          margin={{
            top: 70,
            right: 15,
            left: 15,
            bottom: 15,
          }}
        >
          <Tooltip content={<CustomTooltip />} />
          <path
            stroke="#000000"
            strokeOpacity="0.1"
            strokeWidth={90}
            pointerEvents="none"
            type="linear"
            d="M 212 0 L 212 262 L 212 200 Z"
          ></path>
          <defs>
            <linearGradient id="myGradient">
              <stop offset="0%" stopColor="#AFABAB" />
              <stop offset="49%" stopColor="#EDEBEB" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
          <XAxis dataKey="pv" />
          <Area
            height={800}
            width={800}
            margin={{
              top: 20,
              right: 15,
              left: 15,
              bottom: 15,
            }}
            type="monotone"
            dataKey="uv"
            strokeOpacity={"0.8"}
            stroke="url(#myGradient)"
            fill="#ffffff"
            fillOpacity={"0.09"}
          ></Area>
        </AreaChart>
      </ResponsiveContainer>
    );
  }
};

LineCharts.propTypes = {
  session: PropTypes.array,
  payload: PropTypes.object,
  active: PropTypes.bool,
};

export default LineCharts;
