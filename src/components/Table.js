import React from "react";
import MaterialTable from "material-table";
import { formatNumber } from "./Map";


const prepData = ({ poi, stats, selected }) => {
  if (stats.length === 0 || poi.length === 0) return [];
  let data = stats
    .filter(e => selected.includes(e.poi_id))
    .map(e => {
      let name = poi.find(p => p.poi_id === e.poi_id).name;
      let revenue = formatNumber("revenue", e.revenue);
      return Object.assign({name: name, revenue: revenue},e);
    });
  return data;
};

export default function Table(props) {

  const columns = [
    { title: "Name", field: "name" },
    { title: "Clicks", field: "clicks", render: rowData => <div onClick={()=>props.onCellClick("clicks")}>{rowData.clicks}</div>  },
    { title: "Impressions", field: "impressions", render: rowData => <div onClick={()=>props.onCellClick("impressions")}>{rowData.impressions}</div> },
    { title: "Revenue", field: "revenue", render: rowData => <div onClick={()=>props.onCellClick("revenue")}>{Number(rowData.revenue)}</div>},
    { title: "Hour", field: "hour" },
    { title: "Date", field: "date", type: "date", defaultSort: "desc" }
  ];

  return (
    <MaterialTable
      title="All Stats"
      columns={columns}
      data={prepData(props)}
      options={{
        search: true,
        grouping: true
      }}
      onRowClick={props.onRowClick}
    />
  );
}
