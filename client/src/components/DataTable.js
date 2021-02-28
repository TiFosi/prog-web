import { Table } from "antd";

export const DataTable = ({ data }) => {
    return (
        <Table
            dataSource={data}
            columns={[
                {
                    title: "Date",
                    dataIndex: "date",
                    key: "date",
                    render: (date) =>
                        new Date(date).toLocaleDateString("fr-FR", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        }),
                    sorter: (a, b) => new Date(a.date) - new Date(b.date),
                },
                {
                    title: "Nombre de test positifs",
                    dataIndex: "nb_pos",
                    key: "nb_pos",
                    render: (text) => text.toLocaleString(),
                    sorter: (a, b) => a.nb_pos - b.nb_pos,
                },
                {
                    title: "Taux d'incidence",
                    dataIndex: "tx_std",
                    key: "tx_std",
                    render: (text) => parseFloat(text).toFixed(2),
                    sorter: (a, b) => a.tx_std - b.tx_std,
                },
            ]}
        />
    );
};
