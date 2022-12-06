import React from "react";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/**
 * BAR CHARTS PROPS
 * @param { props } activity - Activity data
 */
const BarsChart = ({ activity }) => {
  // Median Calculation Formule
  let arr = activity?.map((ret) => {
    return ret.pv;
  });
  const tes = [];
  let arr2 = [80, 76, 81, 78];
  if (arr === undefined) arr = arr2;
  arr.sort((a, b) => b - a);
  let median;
  if (arr.length / 2 !== 0) {
    let middleIndex = Math.floor(arr?.length / 2);
    median = arr[middleIndex];
  } else {
    let middleIndex = Math.floor(arr?.length / 2);
    median = arr[middleIndex] + arr[middleIndex + 1];
  }
  const results = [arr[0], median, arr[arr.length - 1]];
  tes.push(results);

  /**
   * BARS CHART TOOLTIP SPECIFIC PROPS
   * @param { props } payload - bars data
   * @param { props } active - bars hover state, boolean
   */
  const CustomTooltip = ({ payload, active }) => {
    if (active) {
      return (
        <div className="custom-tooltip-bar">
          <p className="label">{`${payload[0]?.value}kg`}</p>
          <p className="label">{`${payload[1]?.value}Kcal`}</p>
        </div>
      );
    }
    return null;
  };

  if (activity) {
    return (
      <>
        <ResponsiveContainer width="100%" height="80%">
          <BarChart data={activity} width={150} height={40}>
            <CartesianGrid strokeDasharray={2} vertical={false} />
            <Tooltip
              wrapperStyle={{
                lineHeight: "0",
                border: 0,
                outline: "none",
              }}
              content={<CustomTooltip />}
            />
            <XAxis
              dataKey="name"
              padding={{ left: 0, right: 0 }}
              tickCount={3}
              tick={3}
            />
            <YAxis
              orientation="right"
              height={10}
              tickCount={3}
              tick={3}
              hide
            />
            <Bar
              minPointSize={5}
              padding={{ left: 10, right: 20 }}
              dataKey="pv"
              barSize={7}
              radius={[3, 3, 0, 0]}
              fill="#282D30"
              labelLine={false}
            />
            <Bar
              padding={{ left: 10, right: 20 }}
              dataKey="uv"
              barSize={7}
              radius={[3, 3, 0, 0]}
              fill="#E60000"
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="barcharts-median">{tes}</div>
      </>
    );
  }
};

BarsChart.propTypes = {
  activity: PropTypes.array,
  payload: PropTypes.object,
  active: PropTypes.bool,
};

export default BarsChart;
