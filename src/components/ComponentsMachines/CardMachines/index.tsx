import translatedStatusMachine from "@/utils/translatedStatusMachine";
import { Badge } from "flowbite-react";


import Link from "next/link";

interface CardMachinesProps {
    id: number;
    image: string;
    name: string;
    status: string;
    model: string;
    sensors: string[]
}

type StatusProps = {
    [key: string]: string
}



const CardMachines: React.FC<CardMachinesProps> = ({ id, image, name, sensors, status, model }) => {

    function getStatusToModelBadge(status: string): string {
        const keys: StatusProps = {
            inAlert: 'warning',
            inDowntime: 'failure',
            inOperation: 'success',
        }

        return keys[status]
    }

    return (
        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="object-cover rounded-t-md w-full h-56" src={image} alt="image" />
            <div className="p-4 flex flex-col items-start">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                <section>
                    <span className="mr-1 text-lg font-bold">
                        Modelo:
                    </span>
                    <span className="text-lg font-medium">{model.toUpperCase()}</span>
                </section>

                <section>
                    <span className="mr-1 text-lg font-bold">
                        Sensores:
                    </span>
                    <span>
                        {sensors.map((item, index) => {
                            const sensor = index === sensors.length - 1 ? item : item + ", "
                            return (
                                <span className="text-lg font-medium" key={index}>{item}</span>
                            )
                        })}
                    </span>
                </section>
                <section className="mb-5 flex flex-row items-center text-lg font-medium whitespace-nowrap">
                    <span className="text-lg font-bold">
                        Status:
                    </span>
                    <Badge className="ml-2" color={getStatusToModelBadge(status)}>
                        {translatedStatusMachine(status)}
                    </Badge>
                </section>
                <Link href={`/dashboard/detailsmachine/${id}`} className="flex flex-row  justify-between items-center px-2 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                    Detalhes
                </Link>
            </div>
        </div>
    )
}

export default CardMachines