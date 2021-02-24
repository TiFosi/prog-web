import { useEffect, useState } from "react";
import { Divider } from "antd";
import Columns from "react-columns";

import { fetchFromCoronavirusAPI } from "../lib/fetchFromCoronavirusAPI";

const DataItem = ({ totalNumber, text }) => {
    return (
        <div className="ant-statistic" style={{ textAlign: "center" }}>
            <div className="ant-statistic-content">
                <span className="ant-statistic-content-value">
                    <span className="ant-statistic-content-value-int">
                        {totalNumber}
                    </span>
                </span>
            </div>
            <p>{text}</p>
        </div>
    );
};

export const NationalSituation = () => {
    const [latestData, setLatestData] = useState({});

    useEffect(async () => {
        try {
            const response = await fetchFromCoronavirusAPI();
            if (response["FranceGlobalLiveData"]) {
                setLatestData(response["FranceGlobalLiveData"][0]);
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
            <Divider style={{ whiteSpace: "normal" }}>
                <h1>Indicateurs de suivi de l'épidémie Covid-19</h1>
                <span
                    className="ant-typography ant-typography-secondary"
                    direction="ltr"
                >
                    Les données sont actualisées chaque jours aux alentours de
                    20h. <br />
                    Source: {latestData.source?.nom},
                </span>
            </Divider>
            <Columns
                queries={[
                    { columns: 2, query: "min-width: 500px" },
                    { columns: 4, query: "min-width: 1000px" },
                ]}
            >
                <DataItem
                    totalNumber={latestData.deces?.toLocaleString()}
                    text={`personnes hospitalisées soit + ${latestData.nouvellesHospitalisations?.toLocaleString()} le ${lastUpdateDate}`}
                />
                <DataItem
                    totalNumber={latestData.reanimation?.toLocaleString()}
                    text={`personnes réanimation soit + ${latestData.nouvellesReanimations?.toLocaleString()} le ${lastUpdateDate}`}
                />
                <DataItem
                    totalNumber={latestData.deces?.toLocaleString()}
                    text={`décès jusqu'au ${lastUpdateDate}`}
                />
                <DataItem
                    totalNumber={latestData.gueris?.toLocaleString()}
                    text={`personnes guéries jusqu'au ${lastUpdateDate}`}
                />
            </Columns>
        </>
    );
};
