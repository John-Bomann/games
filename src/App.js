import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Clocks from "./Clock/Clocks";
import Dashboard from "./Dashboard";
import NavBar from "./NavBar";
import Tables from "./Tables/Tables";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Dashboard />} />
          <Route path="clocks" element={<Clocks />} />
          <Route path="tables" element={<Tables />} />
          <Route path="*" element={<div>No Match</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
