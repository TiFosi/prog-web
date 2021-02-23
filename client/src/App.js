import { BrowserRouter as Router } from "react-router-dom";
import { useMediaPredicate } from "react-media-hook";
import { Layout, Switch } from "antd";

// import "antd/dist/antd.dark.css";
import "antd/dist/antd.compact.css";

import { NationalSituation } from "./components/NationalSituation.js";
import Filters from "./components/filters.component.js";
import Map from "./components/map.component.js";
import Table from "./components/table.component.js";
import Graph from "./components/graph.component.js";

const { Header, Content, Footer } = Layout;

function App() {
    const preferredTheme = useMediaPredicate("(prefers-color-scheme: dark)")
        ? "dark"
        : "light";

    return (
        <Layout>
            <Header>
                <div style={{ float: "right" }}>
                    <Switch checkedChildren="Dark" unCheckedChildren="Light" />
                </div>
            </Header>
            <Content
                style={{
                    margin: "24px 50px",
                    padding: 24,
                    minHeight: 280,
                    background: "#fff",
                }}
            >
                <Router>
                    <NationalSituation />
                    <Filters />
                    <Map />
                    <Table />
                    <Graph />
                </Router>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                ©2021 Created by Ant UED
            </Footer>
        </Layout>
    );
}

export default App;
