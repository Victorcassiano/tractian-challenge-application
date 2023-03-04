import React from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from "highcharts/highstock";
import AssetsProps from '@/pages/dashboard/machines/models/AssetsProps';

type ChartDataProps = {
    data: AssetsProps[]
}

const ChartColumnTemperatureMachines: React.FC<ChartDataProps> = ({ data }) => {

    const getChartOptions = () => {
        return {
            chart: {
                type: 'column',
            },
            colors: ["#325ef6"],
            title: {
                text: '',
            },
            xAxis: {
                categories: data.map(item => item.name),
            },
            yAxis: {
                title: {
                    text: 'Temperatura',
                },
            },
            series: [
                {
                    name: 'Máquinas',
                    type: "column",
                    data: data.map(item => item.specifications.maxTemp),
                },
            ],
        };
    };

    return (
        <div>
            <p className="text-gray-700 mb-3 text-2xl font-bold">Resumo da Temperatura</p>
            <HighchartsReact highcharts={Highcharts} options={getChartOptions()} />
        </div>
    );
}

export default ChartColumnTemperatureMachines;