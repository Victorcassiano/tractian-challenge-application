import { GetServerSideProps, NextPage } from "next";
import api from "@/services/api";
import SideBarNavigation from "@/components/SideBarNavigation";
import Head from "next/head";
import { Badge } from "flowbite-react";
import MachineHistoryProps from "./models/MachineHistoryProps";
import translatedStatusMachine from "@/utils/translatedStatusMachine";
import minutesToHours from "@/utils/minutesToHours";
import formatDate from "@/utils/formatDate";
import ChartLineHistoryTemperature from "./components/ChartLineHistoryTemperature";
import ChartLineHistoryHealth from "./components/ChartLineHistoryHealth";

type DetailsMachinePageProps = {
    asset: MachineHistoryProps;
}

type StatusProps = {
    [key: string]: string
}

const DetailsMachine: NextPage<DetailsMachinePageProps> = ({ asset }) => {

    function getStatusToModelBadge(status: string): string {
        const keys: StatusProps = {
            inAlert: 'warning',
            inDowntime: 'failure',
            inOperation: 'success',
        }

        return keys[status]
    }

    function getStatusToModelColor(status: string): string {
        const keys: StatusProps = {
            inAlert: 'bg-orange-400',
            inDowntime: 'bg-red-400',
            inOperation: 'bg-emerald-400',
            unplannedStop: 'bg-red-600',
        }

        return keys[status]
    }

    return (
        <>
            <Head>
                <title>Tractian: Detalhes</title>
            </Head>
            <SideBarNavigation />
            <div className="min-h-full">
                <header className="bg-gray-100 shadow">
                    <div className="mx-auto max-w-7xl py-5 px-2">
                        <h1 className="text-3xl font-medium tracking-tight text-gray-900">Detalhes do {asset.name}</h1>
                    </div>
                </header>
                <main>
                    <div className="grid lg:grid-cols-2 gap-4 mx-auto max-w-7xl py-6 px-4 sm:grid-cols-1">
                        <div className="flex h-full rounded-lg flex-col justify-start gap-4 p-6 border border-gray-200">
                            <p className="text-xl font-bold">
                                Dados da máquina
                            </p>
                            <div className="flex flex-col">
                                <img src={asset.image} className="object-cover self-center sm:w-56 rounded-md" />
                                <div className="grid grid-cols-1 gap-2 mt-3">
                                    <section className="flex flex-row items-center space-x-2 whitespace-nowrap">
                                        <span className="text-lg font-bold">Sensor: </span>
                                        <span className="text-lg font-medium">
                                            {asset.sensors.map((item, index) => index === asset.sensors.length - 1 ? item : item + ", ")}
                                        </span>
                                    </section>
                                    <section className="flex flex-row items-center space-x-2 whitespace-nowrap">
                                        <span className="text-lg font-bold">
                                            Modelo:
                                        </span>
                                        <span className="text-lg font-medium">
                                            {asset.model}
                                        </span>
                                    </section>
                                    <section className="flex flex-row items-center text-lg font-medium whitespace-nowrap">
                                        <span className="text-lg font-bold">
                                            Status:
                                        </span>
                                        <Badge className="ml-2" color={getStatusToModelBadge(asset.status)}>
                                            {translatedStatusMachine(asset.status)}
                                        </Badge>
                                    </section>
                                    <section className="flex flex-row items-center space-x-2 whitespace-nowrap">
                                        <span className="text-lg font-bold">
                                            Saúde:
                                        </span>
                                        <span className="text-lg font-medium after:content-['%']">
                                            {asset.healthscore}
                                        </span>
                                    </section>
                                    <section className="flex flex-row items-center space-x-2 whitespace-nowrap">
                                        <span className="text-lg font-bold">
                                            Temperatura Máxima:
                                        </span>
                                        <span className="text-lg font-medium after:content-['°']">
                                            {asset.specifications.maxTemp}
                                        </span>
                                    </section>
                                    <section className="flex flex-row items-center space-x-2 whitespace-nowrap">
                                        <span className="text-lg font-bold">
                                            Potência:
                                        </span>
                                        <span className="text-lg font-medium">
                                            -
                                        </span>
                                    </section>
                                    <section className="flex flex-row items-center space-x-2 whitespace-nowrap">
                                        <span className="text-lg font-bold">
                                            Total de coletas:
                                        </span>
                                        <span className="text-lg font-medium">
                                            {asset.metrics.totalCollectsUptime}
                                        </span>
                                    </section>
                                    <section className="flex flex-row items-center space-x-2 whitespace-nowrap">
                                        <span className="text-lg font-bold">
                                            Total de horas coletadas:
                                        </span>
                                        <span className="text-lg font-medium">
                                            {minutesToHours(asset.metrics.totalUptime)}
                                        </span>
                                    </section>
                                    <section className="flex flex-row items-center space-x-2 whitespace-nowrap">
                                        <span className="text-lg font-bold">
                                            Última coleta:
                                        </span>
                                        <span className="text-lg font-medium">
                                            {formatDate(asset.metrics.lastUptimeAt)}
                                        </span>
                                    </section>
                                </div>
                            </div>
                        </div>
                        <div className="flex h-full rounded-lg flex-col justify-start gap-4 p-6 border border-gray-200">
                            <p className="text-xl font-bold">
                                Linha temporal da máquina
                            </p>
                            <ul className="flex flex-col space-y-4">
                                {asset.healthHistory.map((item, index) => (
                                    <>
                                        <li key={index}>
                                            <div className={`flex flex-row justify-between items-center p-4 ${getStatusToModelColor(item.status)} rounded-md`}>
                                                <span className="font-bold text-white text-lg">
                                                    {translatedStatusMachine(item.status)}
                                                </span>
                                                <br />
                                                <span className="font-medium text-white">
                                                    {formatDate(item.timestamp)}
                                                </span>
                                            </div>
                                        </li>
                                    </>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 mx-auto max-w-7xl py-6 px-2">
                        <div className="container mx-auto flex h-full rounded-lg flex-col justify-start gap-4 p-6 border border-gray-200">
                            <ChartLineHistoryTemperature />
                        </div>
                        <div className="flex h-full rounded-lg flex-col justify-start gap-4 p-6 border border-gray-200">
                            <ChartLineHistoryHealth />
                        </div>
                    </div>
                </main>
            </div >
        </>
    )
}

export default DetailsMachine

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const { data } = await api.get(`/assets/${query.id}`)

    return {
        props: { asset: data },
    }
}
