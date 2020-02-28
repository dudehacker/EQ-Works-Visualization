import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@material-ui/core";
import axios from "axios";
import Table from "./Table";
import Graph from "./Graph";

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function PopUp({ open, onClose, selected }) {
  const [poi, setPoi] = useState([]);
  const [stats, setStats] = useState([]);
  const [date, setDate] = useState(new Date("2017-01-05T00:00:00.000Z"));
  const [colors, setColors] = useState(selected.map(e => getRandomColor()));
  const [measure, setMeasure] = useState("clicks");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios(process.env.REACT_APP_DATA + "/poi");
        setPoi(result.data);
        const result2 = await axios(
          process.env.REACT_APP_DATA + "/stats/hourly"
        );
        setStats(result2.data);
      } catch (e) {
        alert(e.response.data);
      }
    }
    fetchData();
  }, []);

  const onRowClick = (event, rowData) => {
    setDate(new Date(rowData.date));
  };

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth="xl"
      fullWidth
    >
      <DialogContent>
        <Graph
          poi={poi}
          stats={stats}
          selected={selected}
          selectedDate={date}
          colors={colors}
          measure={measure}
        />
        <Table
          poi={poi}
          stats={stats}
          selected={selected}
          onRowClick={onRowClick}
          onCellClick={setMeasure}
        />
      </DialogContent>
    </Dialog>
  );
}
