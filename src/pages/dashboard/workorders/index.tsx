import { GetServerSideProps, NextPage } from "next";
import api from "@/services/api";
import CardWorkorders from "@/components/ComponentsWorkorders/CardWorkorders";
import WorkordersProps from "../../../models/ModelsWorkorders/WorkordersProps";
import { useState } from "react";
import TeamProps from "../../../models/ModelsTeam/TeamProps";
import SideBarNavigation from "@/components/SideBarNavigation";
import Head from "next/head";

type WorkordersPageProps = {
    workorders: WorkordersProps[]
    users: TeamProps[]
}


const Workorders: NextPage<WorkordersPageProps> = ({ workorders, users }) => {
    const [search, setSearch] = useState('')

    function onSearch(search: string): WorkordersProps[] {
        if (search) {
            return workorders.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
        }

        return workorders
    }

    const searchCollaborator = (id: number): string => {
        const individuo = users.find(element => element.id === id)
        return individuo!.name
    }

    return (
        <>
            <Head>
                <title>Tractian: Ordens de trabalho</title>
            </Head>
            <SideBarNavigation />
            <div className="min-h-full mb-10">
                <header className="bg-gray-100 shadow">
                    <div className="mx-auto max-w-7xl py-5 px-2">
                        <h1 className="text-3xl font-medium tracking-tight text-gray-900">Ordens de trabalho</h1>
                    </div>
                    <div className="mx-auto max-w-7xl py-5 px-2">
                        <input
                            id="search"
                            name="search"
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            className="max-w-md relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Pesquise por: titulo, modelo ou motor"
                        />
                    </div>
                </header>
                <main>
                    <div className='px-4 mx-auto max-w-7xl item-center justify-items-center w-screen grid lg:grid-cols-4 sm:grid-rows-1 gap-4 mt-10 mb-10'>
                        {onSearch(search).map((item, index) => (
                            <>
                                <CardWorkorders
                                    key={index}
                                    title={item.title}
                                    description={item.description}
                                    priority={item.priority}
                                    status={item.status}
                                    checklist={item.checklist}
                                />

                            </>
                        ))}
                    </div>
                </main>
            </div>

        </>
    )
}

export default Workorders


export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await api.get('/workorders')
    const { data: users } = await api.get('/users')

    return {
        props: { workorders: data, users: users },
    }
}
