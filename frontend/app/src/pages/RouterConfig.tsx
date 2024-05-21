import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import Home from "./home";
import Graph from "./graph";
import Mission from "./mission";
import Library from "./library";
import Login from "./login";
import Signup from "./signup";

function RouterConfig() {
  console.log("RouterConfig rendered");
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        {/* <Route path="/" element={<Header />}> */}
        {/* <Route index element={<Home />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/library" element={<Library />} />
        {/* </Route> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterConfig;
