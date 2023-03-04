import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ChartLineHistoryHealth: React.FC = () => {
    function gerarNumerosAleatorios(): number[] {
        let numeros = [];

        for (let i = 0; i < 12; i++) {
            const numeroAleatorio = Math.floor(Math.random() * 41) + 50;
            numeros.push(numeroAleatorio);
        }

        return numeros;
    }

    function gerarDatas(): string[] {
        const datas = [];

        for (let i = 0; i < 12; i++) {
            const data = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000));
            const dia = data.getDate().toString().padStart(2, '0');
            const mes = (data.getMonth() + 1).toString().padStart(2, '0');
            const ano = data.getFullYear().toString();
            datas.push(`${dia}/${mes}/${ano}`);
        }

        return datas;
    }

    const getChartOptionsLine = () => {
        return {
            chart: {
                type: 'line',
            },
            colors: ["#325ef6"],
            title: {
                text: '',
            },
            xAxis: {
                categories: gerarDatas(),
            },
            yAxis: {
                title: {
                    text: 'Saúde',
                },
            },
            series: [
                {
                    name: 'Porcentagem',
                    data: gerarNumerosAleatorios(),
                }
            ],
        };
    };

    return (
        <>
            <p className="text-xl font-bold">
                Histórico de saúde
            </p>
            <HighchartsReact highcharts={Highcharts} options={getChartOptionsLine()} />
        </>
    );
}

export default ChartLineHistoryHealth;