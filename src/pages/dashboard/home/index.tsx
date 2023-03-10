import Head from "next/head";
import { MapPin, Mail, Phone, Building2 } from 'lucide-react'
import { GetServerSideProps, NextPage } from "next";
import SideBarNavigation from "@/components/SideBarNavigation";
import { Card } from "flowbite-react";
import api from "@/services/api";
import AssetsProps from "../../../models/ModelsMachines/AssetsProps";
import ChartColumnTemperatureMachines from "../../../components/ComponentsHome/ChartColumnTemperatureMachines";
import ChartPieOrdens from "@/components/ComponentsHome/ChartPieOrdens";

interface CompaniesProps {
    id: number;
    name: string;
}

interface UnitsProps {
    id: number;
    name: string;
}

type HomePageProps = {
    data: {
        assets: AssetsProps[];
        companies: CompaniesProps[]
        units: UnitsProps[];
    }
    amountTeam: number;
    openedWorkorders: number;
    closedWorkorders: number;
    stoppedMachines: number;
}

const Home: NextPage<HomePageProps> = ({ data, amountTeam, openedWorkorders, closedWorkorders, stoppedMachines }) => {
    return (
        <>
            <Head>
                <title>Tractian: Inicio</title>
            </Head>
            <SideBarNavigation />
            <div className="min-h-full mb-10">
                <header className="bg-gray-100 shadow">
                    <div className="mx-auto max-w-7xl py-5 px-2">
                        <h1 className="text-3xl font-medium tracking-tight text-gray-900">Dashboard</h1>
                    </div>
                </header>
                <main>
                    <div className="px-4 max-w-7xl mx-auto item-center justify-items-center grid lg:grid-cols-2 sm:grid-rows-1 gap-4 mt-10 mb-10">
                        <Card className="container mx-auto">
                            <ChartColumnTemperatureMachines data={data.assets} />
                        </Card>
                        <Card className="container mx-auto">
                            <ChartPieOrdens closedWorkorders={closedWorkorders} openedWorkorders={openedWorkorders} />
                        </Card>
                        <Card className="container mx-auto">
                            <div className="container flex flex-col rounded-md h-full w-full flex flex-col space-y-5">
                                <p className="text-gray-700 text-2xl font-bold">Unidades</p>
                                {data.units.map((item, index) => (
                                    <div className="flex flex-row" key={index}>
                                        <Building2 className="mr-3" color="#7a7a7a" />
                                        <span className=" text-gray-700 text-lg font-medium">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <div className="container mx-auto flex flex-col justify-between space-y-4">
                            <Card className="h-full container mx-auto">
                                <div className="container flex flex-col rounded-md h-full w-full flex flex-col space-y-5">
                                    <p className="text-gray-700 text-2xl font-bold">Empresa: {data.companies[0].name}</p>
                                    <div className="flex flex-row">
                                        <MapPin className="mr-3" color="#7a7a7a" />
                                        <span className=" text-gray-700 text-lg font-medium">S??o Paulo, SP, Brasil</span>
                                    </div>
                                    <div className="flex flex-row">
                                        <Mail className="mr-3" color="#7a7a7a" />
                                        <span className="text-gray-700 text-lg font-medium">email@email.com</span>
                                    </div>
                                    <div className="flex flex-row">
                                        <Phone className="mr-3" color="#7a7a7a" />
                                        <span className="text-gray-700 text-lg font-medium">(99) 9 9999-999</span>
                                    </div>
                                </div>
                            </Card>
                            <Card className="h-full container mx-auto">
                                <div className="container rounded-md h-full w-full flex flex-col space-y-2">
                                    <p className="text-gray-700 text-2xl font-bold">Informa????es</p>
                                    <section className="flex flex-row items-center space-x-2 whitespace-nowrap">
                                        <span className="text-gray-700 text-lg font-medium">Quantidades de m??quinas: </span>
                                        <span className="text-gray-700 text-lg font-medium">
                                            {data.assets.length}
                                        </span>
                                    </section>
                                    <section className="flex flex-row items-center space-x-2 whitespace-nowrap">
                                        <span className="text-gray-700 text-lg font-medium">M??quinas paradas: </span>
                                        <span className="text-gray-700 text-lg font-medium">
                                            {stoppedMachines}
                                        </span>
                                    </section>
                                    <section className="flex flex-row items-center space-x-2 whitespace-nowrap">
                                        <span className="text-gray-700 text-lg font-medium">Servi??os abertos: </span>
                                        <span className="text-gray-700 text-lg font-medium">
                                            {openedWorkorders}
                                        </span>
                                    </section>
                                    <section className="flex flex-row items-center space-x-2 whitespace-nowrap">
                                        <span className="text-gray-700 text-lg font-medium">Colaboradores: </span>
                                        <span className="text-gray-700 text-lg font-medium">
                                            {amountTeam}
                                        </span>
                                    </section>
                                </div>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )

}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await api.get('/db')

    const openedWorkorders = data.workorders.filter((item: any) => item.status === 'in progress')
    const closedWorkorders = data.workorders.filter((item: any) => item.status === 'completed')
    const stoppedMachines = data.assets.filter((item: any) => item.status === 'inDowntime')


    return {
        props: {
            data: data,
            openedWorkorders: openedWorkorders.length,
            closedWorkorders: closedWorkorders.length,
            stoppedMachines: stoppedMachines.length,
            amoutTeam: data.users.length
        },
    }
}
