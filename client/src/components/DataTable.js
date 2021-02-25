import { Component } from "react";
import { Table } from "antd";

export const DataTable = () => {
  const dataSource = [
    {
      key: '1',
      date: '2021-02-21',
      nb_pos: 3305,
      tx_std: 4.92,
    },
    {
      key: '2',
      date: '2021-02-20',
      nb_pos: 14008,
      tx_std: 20.87,
    },
    {
      key: '3',
      date: '2021-02-19',
      nb_pos: 24835,
      tx_std: 37.00,
    },
    {
      key: '4',
      date: '2021-02-18',
      nb_pos: 23121,
      tx_std: 34.44,
    },
    {
      key: '5',
      date: '2021-02-17',
      nb_pos: 22305,
      tx_std: 33.23,
    },
    {
      key: '6',
      date: '2021-02-16',
      nb_pos: 22426,
      tx_std: 33.41,
    },
    {
      key: '7',
      date: '2021-02-15',
      nb_pos: 28136,
      tx_std: 41.92,
    },
    {
      key: '8',
      date: '2021-02-14',
      nb_pos: 2857,
      tx_std: 4.25,
    },
    {
      key: '9',
      dataIndex: '2021-02-13',
      nb_pos: 12093,
      tx_std: 18.01,
    },
    {
      key: '10',
      date: '2021-02-12',
      nb_pos: 21372,
      tx_std: 31.84,
    },
  ];
  
  const columns = [
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
      title: "Taux d'incidence standardisé (100000 * nombre de cas positif / Population)",
      dataIndex: "tx_std",
      key: "tx_std",
  },
  ];
        return <Table dataSource={dataSource} columns={columns} />
    };
