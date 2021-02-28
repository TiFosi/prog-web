import { Route } from "react-router-dom";
import { Layout, Tabs, Spin, Divider } from "antd";
import Columns from "react-columns";

import { NationalSituation } from "./NationalSituation.js";
import { Filters } from "./Filters.js";
import { Map } from "./Map.js";
import { DataTable } from "./DataTable.js";
import { Chart } from "./Chart.js";

const { Content } = Layout;
const { TabPane } = Tabs;

const style = {
    margin: "24px 50px",
    padding: 24,
    minHeight: 280,
};

export const Main = ({
    isTabDataLoaded,
    selectedRegion,
    selectedDepartement,
    tabData,
    isDarkMode,
}) => {
    return (
        <Content style={!isDarkMode ? { ...style, background: "#fff" } : style}>
            <Route path="/">
                <NationalSituation />
                <Map />
                <Filters />
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
                            <Columns
                                queries={[
                                    { columns: 2, query: "min-width: 1000px" },
                                ]}
                            >
                                <DataTable data={tabData} />
                                <Chart data={tabData} />
                            </Columns>
                        </TabPane>
                    </Tabs>
                </Spin>
            </Route>
        </Content>
    );
};
