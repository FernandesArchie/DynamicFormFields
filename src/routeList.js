import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import App from "./App";
import TestForm from "./TestForm";

function RouteList() {
  console.log("im inside");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestForm />} />
        {/* <Route path="/about" component={About}/> */}
      </Routes>
    </Router>
  );
}

export default RouteList;
