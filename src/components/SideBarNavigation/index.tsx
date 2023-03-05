import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

const SideBarNavigation: React.FC = () => {
    const path = usePathname();
    const navigationRouter = useRouter()

    const [open, setOpen] = useState(false)

    const navigationBar = [
        { name: 'Inicio', navigation: () => navigationRouter.push('/dashboard/home'), href: '/dashboard/home' },
        { name: 'Equipe', navigation: () => navigationRouter.push('/dashboard/team'), href: '/dashboard/team' },
        { name: 'Máquinas', navigation: () => navigationRouter.push('/dashboard/machines'), href: '/dashboard/machines' },
        { name: 'Ordens de trabalho', navigation: () => navigationRouter.push('/dashboard/workorders'), href: '/dashboard/workorders' },
        { name: 'Sair', navigation: () => navigationRouter.push('/'), href: '/' },
    ]

    const userNavigation = [
        { name: 'Perfil', navigation: () => navigationRouter.push('/dashboard/profile'), href: '/dashboard/profile' },
        { name: 'Sair', navigation: () => navigationRouter.replace('/'), href: '/' },
    ]

    return (
        <div className='w-full bg-gray-800'>
            <nav className="max-w-7xl mx-auto px-2 py-2.5">
                <div className="flex items-center justify-between mx-auto">
                    <img src="/assets/Logo.svg" className="h-3 mr-3 sm:h-6" alt="Logo" />
                    <button type="button" onClick={() => setOpen(!open)} className="bg-transparent items-center p-2 rounded-lg outline-none sm:hidden">
                        {open ? (<X color='#fff' className="block h-6 w-6" aria-hidden="true" />) : (<Menu color='#fff' className="block h-6 w-6" aria-hidden="true" />)}
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:border-gray-700">
                            {navigationBar.map((item, index) => (
                                <div key={index}>
                                    <li>
                                        <Link href={item.href} aria-current={item.href === path ? 'page' : undefined} className={classNames(
                                            item.href === path ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'px-3 py-2 rounded-md text-sm font-medium cursor-pointer'
                                        )}>{item.name}</Link>
                                    </li>
                                </ div>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className={classNames(
                open ? 'visible' : 'invisible h-0', "sm:hidden"
            )}>
                <ul className="flex flex-col space-y-3 p-2 h-auto">
                    {navigationBar.map((item, index) => (
                        <>
                            <li key={index} className={classNames(
                                item.href === path ? 'bg-gray-900' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'w-full rounded-md p-2'
                            )}>
                                <Link href={item.href} Linkria-current={item.href === path ? 'page' : undefined} className="text-white">{item.name}</Link>
                            </li>
                        </>
                    ))}
                </ul>
            </div>
        </div>
    )
}


export default SideBarNavigation