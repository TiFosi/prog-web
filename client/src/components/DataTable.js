import { Component } from "react";
import { useEffect, useState } from "react";
import { Table, Spin, Typography } from "antd";
import { fetchFromBackend } from "../lib/fetchFromBackend";


export const DataTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    try {
        const response = await fetchFromBackend(
            "taux-incidence/std-quot-fra"
        );
        setDataSource(
            response.map((row, index) => ({
                key: index + 1,
                date: new Date(row["date"]).toLocaleDateString("fr-FR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                }),
                nb_pos: row["nb_pos"].toLocaleString(),
                tx_std: parseFloat(row["tx_std"]).toFixed(2),
            }))
        );
        setLoaded(true);
    } catch (e) {
        console.log(e);
    }
}, []);



  
  return (
  <Spin spinning={!loaded}>
  <Table
      dataSource={dataSource}
      columns={[
          {
              title: "Date",
              dataIndex: "date",
              key: "date",
          },
          {
              title: "Nombre de test positifs",
              dataIndex: "nb_pos",
              key: "nb_pos",
          },
          {
              title: (
                  <Typography.Text>
                      Taux d'incidence standardisé <br /> (100000 *
                      nombre de cas positif / Population)
                  </Typography.Text>
              ),
              dataIndex: "tx_std",
              key: "tx_std",
          },
      ]}
  />
</Spin>
);
    };
