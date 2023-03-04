import { Spinner } from 'flowbite-react';
import React from 'react';

const LazyLoading: React.FC = () => {
    return (
        <div className="container mx-auto justify-center items-center flex flex-col w-screen h-screen">
            <Spinner
                aria-label="Extra large spinner example"
                size="xl"
            />
            <span className='mt-4 font-medium text-lg'>
                Buscando informações
            </span>
        </div>
    );
}

export default LazyLoading;