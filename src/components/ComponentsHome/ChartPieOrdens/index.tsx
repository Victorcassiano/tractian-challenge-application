import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from "highcharts/highstock";

type ChartDataProps = {
    closedWorkorders: number
    openedWorkorders: number
}

const ChartPieOrdens: React.FC<ChartDataProps> = ({ closedWorkorders, openedWorkorders }) => {

    const getChartOptions = () => {

        return {
            chart: {
                type: 'pie',
            },
            title: {
                text: '',
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    },
                },
            },
            series: [
                {
                    name: 'Quantidade',
                    data: [
                        { name: 'Abertos', y: closedWorkorders },
                        { name: 'Fechados', y: openedWorkorders },
                    ],
                },
            ],
        };
    };

    return (
        <div>
            <p className="text-gray-700 mb-3 text-2xl font-bold">Resumo das Ordens</p>
            <HighchartsReact highcharts={Highcharts} options={getChartOptions()} />
        </div>
    );
}

export default ChartPieOrdens;