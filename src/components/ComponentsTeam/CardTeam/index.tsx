import { Card } from 'flowbite-react'
import { Mail, Trash2 } from 'lucide-react'

interface CardTeamProps {
    name: string;
    email: string;
}

const CardTeam: React.FC<CardTeamProps> = ({ name, email }) => {
    return (
        <Card className='container bg-white w-full max-w-sm border border-gray-200 rounded-lg shadow'>
            <div className="flex flex-col items-center p-5">
                <img src='/assets/profile_default.jpg' className='w-16 mb-6 rounded-md' />
                <h5 className="mb-1 text-xl font-medium text-black">{name}</h5>
                <span className="text-sm text-gray-400">{email}</span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <a href={`mailto:${email}`} className="flex flex-row  justify-between items-center px-2 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">
                        <Mail size={18} className='mr-2' />
                        Mensagem
                    </a>
                    <a href={`#`} className="flex flex-row justify-between items-center px-4 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800">
                        <Trash2 size={18} className='mr-2' />
                        Deletar
                    </a>
                </div>
            </div>
        </Card>
    )
}

export default CardTeam