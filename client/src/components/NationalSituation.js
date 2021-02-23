import { useEffect, useState } from "react";
import { Row, Col, Divider } from "antd";

import { fetchFromCoronavirusAPI } from "../lib/fetchFromCoronavirusAPI";

const DataItem = ({ totalNumber, text }) => {
    return (
        <Col span={6}>
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
        </Col>
    );
};

DataItem.defaultProps = {
    totalNumber: null,
    text: null,
};

export const NationalSituation = () => {
    const [data, setData] = useState({});

    useEffect(async () => {
        try {
            const response = await fetchFromCoronavirusAPI();
            if (response["FranceGlobalLiveData"]) {
                setData(response["FranceGlobalLiveData"][0]);
            }
        } catch (e) {
            console.log(e);
        }
    }, []);

    console.log(data);

    return (
        <>
            <Divider>
                <h1>Indicateurs de suivi de l'épidémie Covid-19</h1>
                <span
                    className="ant-typography ant-typography-secondary"
                    direction="ltr"
                >
                    Les données sont actualisées chaque jours aux alentours de
                    20h. <br />
                    Source: {data.source?.nom},
                </span>
            </Divider>

            <Row gutter={32}>
                <DataItem
                    totalNumber={data.deces?.toLocaleString()}
                    text={`personnes hospitalisées soit + ${data.nouvellesHospitalisations?.toLocaleString()} le ${
                        data.date
                    }`}
                />
                <DataItem
                    totalNumber={data.reanimation?.toLocaleString()}
                    text={`personnes réanimation soit + ${data.nouvellesReanimations?.toLocaleString()} le ${
                        data.date
                    }`}
                />
                <DataItem
                    totalNumber={data.deces?.toLocaleString()}
                    text={`décès jusqu'au ${data.date}`}
                />
                <DataItem
                    totalNumber={data.gueris?.toLocaleString()}
                    text={`personnes guéries jusqu'au ${data.date}`}
                />
            </Row>
        </>
    );
};
