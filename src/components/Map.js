import React, { useState } from "react";
import MapGL, { Marker } from "@urbica/react-map-gl";
import Cluster from "@urbica/react-map-gl-cluster";
import "mapbox-gl/dist/mapbox-gl.css";
import { AppBar, Paper, Tabs, Tab } from "@material-ui/core";
import numeral from "numeral";
import PopUp from "./PopUp";

const initialState = {
  viewport: {
    latitude: 0,
    longitude: 0,
    zoom: 0
  }
};

var style = {
  width: "50px",
  height: "50px",
  padding: "40px",
  color: "#fff",
  background: "#1978c8",
  borderRadius: "100px",
  textAlign: "center"
};

const distance = (x1, x2, y1, y2) => {
  return Math.sqrt((x1 - x2) ^ (2 + (y1 - y2)) ^ 2);
};

const formatNumber = (key, value) => {
  switch (key) {
    case "revenue":
      return numeral(value).format("$ 0.00 a");

    default:
      return numeral(value).format("0.0a");
  }
};

export default function Map({ poi, features }) {
  const [state, setState] = useState(initialState);
  const [filter, setFilter] = useState("revenue");
  const [showPopup, setShowPopup] = useState(false);
  const [selected, setSelected] = useState([]);
  const [hover, setHover] = useState(false);

  const handleChange = (event, newValue) => {
    setFilter(newValue);
  };

  const ClusterMarker = props => {
    let sorted = poi
      .slice()
      .sort(
        (a, b) =>
          distance(a.lat, props.latitude, a.lon, props.longitude) -
          distance(b.lat, props.latitude, b.lon, props.longitude)
      );
    let filtered = sorted.slice(0, props.pointCount);
    let clusterPoiIds = filtered.map(e => e.poi_id);
    let value = features
      .filter(e => clusterPoiIds.includes(e.poi_id))
      .reduce((acc, cur) => acc + Number(cur[filter]), 0);

    const onClusterClick = props => {
      console.log("clicked on cluster");
      setSelected(clusterPoiIds);
      setShowPopup(true);
    };
    let newStyle = Object.assign({cursor: hover?"pointer":"default"},style)
    return (
      <Marker longitude={props.longitude} latitude={props.latitude}>
        <div
          onClick={onClusterClick}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{ ...newStyle, background: "#f28a25" }}
        >
          {formatNumber(filter, value)}
        </div>
      </Marker>
    );
  };

  return (
    <div>
      <AppBar position="static">
        <Paper square>
          <Tabs
            value={filter}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="Filters"
            centered
          >
            <Tab label="Revenue" value="revenue" />
            <Tab label="Impressions" value="impressions" />
            <Tab label="Clicks" value="clicks" />
          </Tabs>
        </Paper>
      </AppBar>
      {showPopup && <PopUp
        open={showPopup}
        selected={selected}
        onClose={() => setShowPopup(false)}
      />}
      <MapGL
        style={{ width: "100%", height: "900px" }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        accessToken={process.env.REACT_APP_MAPBOX_GL_TOKEN}
        onViewportChange={viewport => setState({ viewport })}
        {...state.viewport}
        latitude={37.78}
        longitude={-122.41}
        zoom={3}
      >
        <Cluster
          radius={40}
          extent={512}
          nodeSize={64}
          component={cluster => <ClusterMarker {...cluster} />}
        >
          {poi.map((point, i) => {
            let value = features
              .filter(e => e.poi_id === point.poi_id)
              .reduce((acc, cur) => acc + Number(cur[filter]), 0);
              let newStyle = Object.assign({cursor: hover?"pointer":"default"},style)
            return (
              <Marker
                key={filter + i}
                longitude={point.lon}
                latitude={point.lat}
              >
                <div
                  onClick={() => {
                    console.log("clicked on single");
                    setSelected([point.poi_id]);
                    setShowPopup(true);
                  }}
                  onMouseEnter={() => setHover(true)}
                  onMouseLeave={() => setHover(false)}
                  style={newStyle}
                >
                  {formatNumber(filter, value)}
                </div>
              </Marker>
            );
          })}
        </Cluster>
      </MapGL>
    </div>
  );
}
