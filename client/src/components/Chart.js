import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

// import theme from "highcharts/themes/dark-unica";
import HC_more from "highcharts/highcharts-more";

// theme(Highcharts);
HC_more(Highcharts);

export const Chart = ({ data }) => {
    const options = {
        title: {
            text: "Taux d'incidence (depuis le 13/05/2020)",
        },
        subtitle: {
            text: "Source: data.gouv.fr",
        },
        yAxis: {
            title: {
                text: "Taux d'incidence",
            },
        },
        time: {
            useUTC: false,
        },
        chart: {
            zoomType: "x",
        },
        rangeSelector: {
            buttons: [
                {
                    type: "week",
                    count: 1,
                    text: "1w",
                },
                {
                    type: "month",
                    count: 1,
                    text: "1m",
                },
                {
                    type: "month",
                    count: 6,
                    text: "6m",
                },
                {
                    type: "all",
                    text: "All",
                },
            ],
            selected: 3,
        },
        series: [
            {
                name: "",
                data: data
                    .sort((a, b) => {
                        return new Date(a.date) - new Date(b.date);
                    })
                    .map((row) => {
                        const dateObj = new Date(row.date);
                        return [
                            Date.UTC(
                                dateObj.getUTCFullYear(),
                                dateObj.getUTCMonth(),
                                dateObj.getUTCDate()
                            ),
                            parseFloat(parseFloat(row.tx_std).toFixed(2)),
                        ];
                    }),
            },
        ],
    };

    return (
        <HighchartsReact
            constructorType={"stockChart"}
            highcharts={Highcharts}
            options={options}
        />
    );
};
