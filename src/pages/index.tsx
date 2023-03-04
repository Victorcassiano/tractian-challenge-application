'use client'
import { NextPage } from 'next'
import { Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCallback } from 'react'
import Head from 'next/head'
import { Card } from 'flowbite-react'

const Index: NextPage = () => {
  const navigator = useRouter()

  const onSubmit = useCallback(async () => {
    navigator.replace('/dashboard/home')
  }, [navigator])

  return (
    <>
      <Head>
        <title>Tractian: Plataforma</title>
      </Head>
      <div className='container flex justify-center items-center h-screen mx-auto'>
        <Card>
          <div className="mx-auto items-center justify-center py-6 px-6">
            <div className="w-full max-w-sm space-y-8">
              <div>
                <img
                  className="mx-auto h-10 w-auto"
                  src='/assets/Logo-blue.png'
                  alt="Tractian"
                />
                <h2 className="mt-6 text-center text-lg font-bold tracking-tight text-gray-900">
                  Faça login em sua conta
                </h2>
              </div>
              <form className="mt-8 space-y-6">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="E-mail"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Senha
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Senha"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Lembrar
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Esqueceu sua senha?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={onSubmit}
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Lock className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </span>
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}

export default Index