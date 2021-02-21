import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// import logo from "./logo.svg";
// import "./App.css";

import FranceSituation from "./components/france-situation.component.js";
import Filters from "./components/filters.component.js";
import Map from "./components/map.component.js";
import Table from "./components/table.component.js";
import Graph from "./components/graph.component.js";

function App() {
    return (
        <Router>
            <FranceSituation />
            <Filters />
            <Map />
            <Table />
            <Graph />
        </Router>
    );
}

export default App;
