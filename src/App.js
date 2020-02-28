import React, { useState, useEffect } from "react";
import "./App.css";
import Map from "./components/Map";
import axios from "axios";

function App() {
  const [poi, setPoi] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios(process.env.REACT_APP_DATA + "/stats/daily");
        setStats(result.data);
        const result2 = await axios(process.env.REACT_APP_DATA + "/poi");
        setPoi(result2.data);
      } catch (e) {
        alert(e.response.data);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Map poi={poi} features={stats} />
    </div>
  );
}

export default App;
