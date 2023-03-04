'use client'
import { GetServerSideProps, NextPage } from 'next'
import CardTeam from '@/pages/dashboard/team/components/CardTeam'
import api from '@/services/api'
import TeamProps from './models/TeamProps'
import Head from 'next/head'
import SideBarNavigation from '@/components/SideBarNavigation'
import { useState } from 'react'

interface PageProps {
    team: TeamProps[]
}

const Team: NextPage<PageProps> = ({ team }) => {
    const [search, setSearch] = useState('')


    function onSearch(search: string): TeamProps[] {
        if (search) {
            return team.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        return team
    }

    return (
        <>
            <Head>
                <title>Tractian: Equipe</title>
            </Head>
            <SideBarNavigation />
            <div className="min-h-full">
                <header className="bg-gray-100 shadow">
                    <div className="mx-auto max-w-7xl py-5 px-2">
                        <h1 className="text-3xl font-medium tracking-tight text-gray-900">Equipe</h1>
                    </div>
                    <div className="mx-auto max-w-7xl py-5 px-2">
                        <input
                            id="search"
                            name="search"
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            className="max-w-md relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 sm:w-full focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="Digite um nome"
                        />
                    </div>
                </header>
                <main>
                    <div className='px-4 max-w-7xl mx-auto item-center justify-items-center grid lg:grid-cols-4 sm:grid-rows-1 gap-4 mt-10 mb-10'>
                        {onSearch(search).map((item, index) => (
                            <CardTeam
                                key={index}
                                email={item.email}
                                name={item.name}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </>
    )
}

export default Team

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await api.get('/users')

    return {
        props: { team: data },
    }
}
