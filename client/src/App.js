import { Route, useRouteMatch, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMediaPredicate } from "react-media-hook";
import { Layout, Switch as SwitchBtn, Tabs, Spin, Divider } from "antd";
import { Row, Col } from "antd";

// import "antd/dist/antd.dark.css";
import "antd/dist/antd.compact.css";

import { NationalSituation } from "./components/NationalSituation.js";
import { Filters } from "./components/Filters.js";
import { Map } from "./components/Map.js";
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
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedDepartement, setSelectedDepartement] = useState(null);

    const location = useLocation();
    const isHome = useRouteMatch("/");
    const isByReg = useRouteMatch("/reg/:id");
    const isByDep = useRouteMatch("/dep/:id");

    const preferredTheme = useMediaPredicate("(prefers-color-scheme: dark)")
        ? "dark"
        : "light";

    useEffect(async () => {
        try {
            const [regionData, departementData] = await Promise.all([
                isByReg?.params?.id
                    ? fetchFromBackend("region/" + isByReg?.params?.id)
                    : null,
                isByDep?.params?.id
                    ? fetchFromBackend("departement/" + isByDep?.params?.id)
                    : null,
            ]);

            setSelectedRegion(regionData);
            setSelectedDepartement(departementData);

            const routeApi = regionData
                ? "taux-incidence/std-quot-reg/" + regionData._id
                : departementData
                ? "taux-incidence/std-quot-dep/" + departementData._id
                : "taux-incidence/std-quot-fra";

            const response = await fetchFromBackend(routeApi);
            setTabData(
                response.length
                    ? response.map((row, index) => ({ ...row, key: index + 1 }))
                    : []
            );
            setIsTabDataLoaded(true);
        } catch (err) {
            console.log(`### ${err}`);
        }
    }, [location]);

    return (
        <Layout>
            <Header>
                <div style={{ float: "right" }}>
                    <SwitchBtn
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                    />
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
                <Route path="/">
                    <Filters />
                    <NationalSituation />
                    <Route path={["/reg", "/dep"]}>
                        <Map />
                    </Route>
                    <Spin spinning={!isTabDataLoaded} tip="Chargement...">
                        <Divider>
                            <h1 style={{ fontSize: "60px" }}>
                                {selectedRegion
                                    ? selectedRegion.name
                                    : selectedDepartement
                                    ? selectedDepartement.name
                                    : "France"}
                            </h1>
                        </Divider>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Taux d'incidence standardisé" key="1">
                                <Row gutter={16}>
                                    <Col md={24} lg={11}>
                                        <DataTable data={tabData} />
                                    </Col>
                                    <Col md={24} lg={13}>
                                        <Chart data={tabData} />
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Spin>
                </Route>
            </Content>
            <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
    );
}

export default App;
