import { BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMediaPredicate } from "react-media-hook";
import { Layout, Switch, Tabs, Spin } from "antd";
import { Row, Col } from "antd";

// import "antd/dist/antd.dark.css";
import "antd/dist/antd.compact.css";

import { NationalSituation } from "./components/NationalSituation.js";
import { Filters } from "./components/Filters.js";
import Map from "./components/map.component.js";
import { DataTable } from "./components/DataTable.js";
import { Chart } from "./components/Chart.js";

import { fetchFromBackend } from "./lib/fetchFromBackend";

const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

/**
 * comment
 */
function App() {
    const [tabData, setTabData] = useState([]);
    const [isTabDataLoaded, setIsTabDataLoaded] = useState(false);

    const preferredTheme = useMediaPredicate("(prefers-color-scheme: dark)")
        ? "dark"
        : "light";

    useEffect(async () => {
        try {
            const response = await fetchFromBackend(
                "taux-incidence/std-quot-fra"
            );
            setTabData(
                response.map((row, index) => ({ ...row, key: index + 1 }))
            );
            setIsTabDataLoaded(true);
        } catch (e) {
            console.log(e);
        }
    }, []);

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
                    <Filters />
                    <NationalSituation />
                    <Map />
                    <Tabs defaultActiveKey="1" centered>
                        <TabPane tab="Taux d'incidence standardisé" key="1">
                            <Spin
                                spinning={!isTabDataLoaded}
                                tip="Chargement..."
                            >
                                <Row gutter={16}>
                                    <Col md={24} lg={11}>
                                        <DataTable data={tabData} />
                                    </Col>
                                    <Col md={24} lg={13}>
                                        <Chart data={tabData} />
                                    </Col>
                                </Row>
                            </Spin>
                        </TabPane>
                    </Tabs>
                </Router>
            </Content>
            <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
    );
}

export default App;
