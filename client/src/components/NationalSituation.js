import { useEffect, useState } from "react";
import { Spin, Divider } from "antd";
import Columns from "react-columns";

import { fetchFromCoronavirusAPI } from "../lib/fetchFromCoronavirusAPI";

const DataItem = ({ totalNumber, text }) => {
    return (
        <div
            className="ant-statistic"
            style={{ textAlign: "center", margin: "0 10px" }}
        >
            <div className="ant-statistic-content">
                <span className="ant-statistic-content-value">
                    <span
                        className="ant-statistic-content-value-int"
                        style={{ fontSize: "40px" }}
                    >
                        {totalNumber}
                    </span>
                </span>
            </div>
            <p style={{ fontSize: "15px" }}>{text}</p>
        </div>
    );
};

export const NationalSituation = () => {
    const [latestData, setLatestData] = useState({});
    const [loaded, setLoaded] = useState(false);

    useEffect(async () => {
        try {
            const response = await fetchFromCoronavirusAPI();
            if (response["FranceGlobalLiveData"]) {
                setLatestData(response["FranceGlobalLiveData"][0]);
                setLoaded(true);
            }
        } catch (e) {
            console.log(e);
        }
    }, []);

    let lastUpdateDate = "NR";
    if (latestData.date) {
        const dateObject = new Date(latestData.date);
        lastUpdateDate = [dateObject.getDate(), dateObject.getMonth() + 1]
            .map((val) => val.toString().padStart(2, 0))
            .join("/");
    }

    return (
        <>
            <Spin spinning={!loaded}>
                <Divider style={{ whiteSpace: "normal" }}>
                    <h1>Indicateurs de suivi de l'épidémie Covid-19</h1>
                    <span
                        className="ant-typography ant-typography-secondary"
                        direction="ltr"
                    >
                        Les données sont actualisées chaque jours aux alentours
                        de 20h. <br />
                        {loaded ? `Source: ${latestData.source?.nom}` : ""},
                    </span>
                </Divider>
                <Columns
                    queries={[
                        { columns: 2, query: "min-width: 500px" },
                        { columns: 4, query: "min-width: 1000px" },
                    ]}
                >
                    <DataItem
                        totalNumber={latestData.hospitalises?.toLocaleString()}
                        text={
                            loaded
                                ? `Personnes hospitalisées soit +${latestData.nouvellesHospitalisations?.toLocaleString()} le ${lastUpdateDate}`
                                : ""
                        }
                    />
                    <DataItem
                        totalNumber={latestData.reanimation?.toLocaleString()}
                        text={
                            loaded
                                ? `Personnes en réanimation soit +${latestData.nouvellesReanimations?.toLocaleString()} le ${lastUpdateDate}`
                                : ""
                        }
                    />
                    <DataItem
                        totalNumber={latestData.deces?.toLocaleString()}
                        text={loaded ? `Décès jusqu'au ${lastUpdateDate}` : ""}
                    />
                    <DataItem
                        totalNumber={latestData.gueris?.toLocaleString()}
                        text={
                            loaded
                                ? `Personnes guéries jusqu'au ${lastUpdateDate}`
                                : ""
                        }
                    />
                </Columns>
            </Spin>
        </>
    );
};
