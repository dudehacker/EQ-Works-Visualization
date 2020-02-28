import React from "react";
import moment from "moment";
import {
  ResponsiveContainer,
  ZAxis,
  Scatter,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

const prepData = ({ poi, stats, selected, selectedDate }) => {
  if (stats.length === 0 || poi.length === 0) return [];

  let name = poi.find(p => p.poi_id === selected).name;
  let data = stats
    .filter(
      e =>
        e.poi_id === selected &&
        moment(e.date).format("L") === moment(selectedDate).format("L")
    )
    .map(e => {
      return Object.assign( e, { name: name, revenue: Number(e.revenue) });
    });
  return { name: name, data: data };
};



export default function Graph(props) {

  return (
    <div style={{ textAlign: "center" }}>
      <h4>Daily {props.measure} stats: {props.selectedDate.toDateString()}</h4>
      <h6>Click on the table cells to filter the X and Y metrics</h6>
      <ResponsiveContainer width={"100%"} height={300}>
        <ScatterChart margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          {/* <Line type="monotone" dataKey={measure} stroke="red" /> */}
          <CartesianGrid />
          <XAxis
            name="Time"
            dataKey="hour"
            type="number"
            unit=":00"
            allowDuplicatedCategory={false}
          />
          <YAxis name={props.measure} type="number" dataKey={props.measure} />
          <ZAxis range={[100]} />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          {props.selected.map((s,i) => {
            let serie = prepData({
              poi: props.poi,
              stats: props.stats,
              selected: s,
              selectedDate: props.selectedDate
            });
            return (
              <Scatter
                fill={props.colors[i]}
                dataKey={props.measure}
                data={serie.data}
                name={serie.name}
                line
                shape="circle"
                key={s}
              />
            );
          })}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
