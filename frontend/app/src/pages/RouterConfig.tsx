// import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Home from "./home";
import Graph from "./graph";
import Mission from "./mission";
import Library from "./library";

function RouterConfig() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/library" element={<Library />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouterConfig;
