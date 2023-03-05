import { GetServerSideProps, NextPage } from 'next'
import api from '@/services/api'

import Head from 'next/head'
import CardMachines from '@/components/ComponentsMachines/CardMachines'
import AssetsProps from '../../../models/ModelsMachines/AssetsProps'
import SideBarNavigation from '@/components/SideBarNavigation'
import { useState } from 'react'

type MachinesPageProps = {
    assets: AssetsProps[]
}

const Machines: NextPage<MachinesPageProps> = ({ assets }) => {
    const [search, setSearch] = useState('')

    function onSearch(search: string): AssetsProps[] {
        if (search) {
            return assets.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        return assets
    }

    return (
        <>
            <Head>
                <title>Tractian: Máquinas</title>
            </Head>
            <SideBarNavigation />
            <div className="min-h-full">
                <header className="bg-gray-100 shadow">
                    <div className="mx-auto max-w-7xl py-5 px-2">
                        <h1 className="text-3xl font-medium tracking-tight text-gray-900">Motores</h1>
                    </div>
                    <div className="mx-auto max-w-7xl py-5 px-2">
                        <input
                            id="search"
                            name="search"
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            className="max-w-md relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Digite o nome da máquina"
                        />
                    </div>
                </header>
                <main>
                    <div className='px-4 mx-auto max-w-7xl item-center justify-items-center w-screen grid lg:grid-cols-4 sm:grid-rows-1 gap-6 mt-10 mb-10'>
                        {onSearch(search).map((item, index) => (
                            <CardMachines key={index} id={item.id} image={item.image} name={item.name} sensors={item.sensors} status={item.status} model={item.model} />
                        ))}
                    </div>
                </main>
            </div>
        </>
    )
}

export default Machines

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await api.get('/assets')

    return {
        props: { assets: data },
    }
}
