import React, {useState,useEffect} from 'react';
import './App.css';
import Map from "./components/Map"
import axios from 'axios'

function App() {
  const [poi, setPoi] = useState(  [] );
  const [stats, setStats] = useState(  [] );

  useEffect(()=>{
    async function fetchData() {
      const result = await axios(
        process.env.REACT_APP_DATA+'/poi',
      );
      console.log(result.data)
      setPoi(result.data);
    }
    fetchData();
  },[]);

  useEffect(()=>{
    async function fetchData() {
      const result = await axios(
        process.env.REACT_APP_DATA+'/stats/daily',
      );
      console.log(result.data)
      setStats(result.data);
    }
    fetchData();
  },[]);


  return (
    <div className="App">
      <Map poi={poi} features={stats}/>
    </div>
  );
}

export default App;
