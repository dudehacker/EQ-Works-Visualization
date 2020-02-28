import React from "react";
import MaterialTable from "material-table";
import {formatNumber} from './Map'
const columns = [
  { title: "Name", field: "name"},
  { title: "Clicks", field: "clicks" },
  { title: "Impressions", field: "impressions" },
  { title: "Revenue", field: "revenue" },
  { title: "Hour", field: "hour" },
  { title: "Date", field: "date", type:"date", defaultSort: "desc" }
];

const prepData = ({poi,stats,selected} ) => {

    let data =  stats.filter(e=>selected.includes(e.poi_id)).map(e=>{
        e.name = poi.find(p=>p.poi_id===e.poi_id).name
        e.revenue = formatNumber("revenue",e.revenue)
        return e
    })
    console.log(data)
    return data
};

export default function Table(props) {
  console.log(props);


  return (
    <MaterialTable
      title="Stats"
      columns={columns}
      data={prepData(props)}
      options={{
        search: true,
        grouping: true
      }}
    />
  );
}
