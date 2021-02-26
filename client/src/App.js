import { BrowserRouter as Router } from "react-router-dom";
import { useMediaPredicate } from "react-media-hook";
import { Layout, Switch, Tabs } from "antd";
import Columns from "react-columns";

// import "antd/dist/antd.dark.css";
import "antd/dist/antd.compact.css";

import { NationalSituation } from "./components/NationalSituation.js";
import Filters from "./components/filters.component.js";
import Map from "./components/map.component.js";
import { DataTable } from "./components/DataTable.js";
import { Chart } from "./components/Chart.js";

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

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
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane
                            tab="Taux d'incidence standardisé"
                            key="1"
                            style={{ paddingTop: "20px" }}
                        >
                            <Columns
                                queries={[
                                    {
                                        columns: 2,
                                        query: "min-width: 1000px",
                                    },
                                ]}
                            >
                                <Chart />
                                <DataTable />
                            </Columns>
                        </TabPane>
                    </Tabs>
                </Router>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                ©2021 Created by Ant UED
            </Footer>
        </Layout>
    );
}

export default App;
