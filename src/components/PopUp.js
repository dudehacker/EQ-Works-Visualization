import React, {useEffect, useState} from "react";
import {Dialog,DialogContent} from '@material-ui/core';
import axios from 'axios'
import Table from './Table'

export default function PopUp ({open,onClose,selected}) {

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
      },[open]);

      useEffect(()=>{
        async function fetchData() {
          const result = await axios(
            process.env.REACT_APP_DATA+'/stats/hourly',
          );
          console.log(result.data)
          setStats(result.data);
        }
        fetchData();
      },[]);

    return (<Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={open}
    maxWidth="xl" fullWidth>
        <DialogContent>
        <h1>Selected {selected}</h1>
        <Table />
        </DialogContent>
    </Dialog>)
}