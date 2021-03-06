import { useRouteMatch, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMediaPredicate } from "react-media-hook";
import { Layout, Switch as SwitchBtn, Modal } from "antd";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { Main } from "./components/Main.js";
import { fetchFromBackend } from "./lib/fetchFromBackend";

const { Header, Footer } = Layout;
const { confirm } = Modal;

function App() {
    const [tabData, setTabData] = useState([]);
    const [isTabDataLoaded, setIsTabDataLoaded] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [selectedDepartement, setSelectedDepartement] = useState(null);

    const { switcher, currentTheme, status, themes } = useThemeSwitcher();
    const [isDarkMode, setIsDarkMode] = useState(currentTheme === "dark");

    const location = useLocation();
    const isHome = useRouteMatch("/");
    const isByReg = useRouteMatch("/reg/:id");
    const isByDep = useRouteMatch("/dep/:id");

    const preferredTheme = useMediaPredicate("(prefers-color-scheme: dark)")
        ? "dark"
        : "light";

    const toggleTheme = (isChecked) => {
        setIsDarkMode(isChecked);
        switcher({ theme: isChecked ? themes.dark : themes.light });
    };

    useEffect(() => {
        setIsDarkMode(currentTheme === "dark");
    }, [currentTheme]);

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

    useEffect(() => {
        if (currentTheme && preferredTheme != currentTheme) {
            showConfirm();
        }
    }, [preferredTheme, isDarkMode]);

    const showConfirm = () => {
        confirm({
            title: "Voulez-vous changer le thème ?",
            content: `Le thème de votre système d'exploitation est ${preferredTheme}`,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                toggleTheme();
            },
            onCancel() {},
        });
    };

    return (
        <Layout>
            <Header>
                <div style={{ float: "right" }}>
                    <SwitchBtn
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                        onChange={toggleTheme}
                        checked={isDarkMode}
                    />
                </div>
            </Header>
            <Main
                isTabDataLoaded={isTabDataLoaded}
                selectedRegion={selectedRegion}
                selectedDepartement={selectedDepartement}
                tabData={tabData}
                isDarkMode={isDarkMode}
            />
            <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
    );
}

export default App;
