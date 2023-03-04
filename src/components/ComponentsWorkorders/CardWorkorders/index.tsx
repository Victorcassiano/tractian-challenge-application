import WorkordersProps from "@/models/ModelsWorkorders/WorkordersProps";
import translatedStatusPriority from "@/utils/translatedStatusPriority";
import translatedStatusWorkorders from "@/utils/translatedStatusWorkorders";
import { Badge } from "flowbite-react";

type StatusProps = {
    [key: string]: string
}

const CardWorkorders: React.FC<WorkordersProps> = ({ description, priority, status, title, checklist }) => {

    function getStatusToModelBadgeStatus(status: string): string {
        const keys: StatusProps = {
            'in progress': 'warning',
            completed: 'success',
        }

        return keys[status]
    }

    function getStatusToModelBadgePriority(status: string): string {
        const keys: StatusProps = {
            high: 'failure',
            medium: 'warning',
            low: 'success',
        }

        return keys[status]
    }

    return (
        <div className="w-full px-1 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 flex flex-col items-start">
                <h5 className="mb-2 text-lg font-bold self-center tracking-tight text-gray-900 dark:text-white">{title}</h5>
                <p className="mb-3 font-medium text-gray-600">
                    {description}
                </p>
                <section className="flex flex-row items-center text-lg font-medium whitespace-nowrap">
                    <span className="text-lg font-medium">
                        Prioridade:
                    </span>
                    <Badge className="ml-2" color={getStatusToModelBadgePriority(priority)}>
                        {translatedStatusPriority(priority)}
                    </Badge>
                </section>
                <section className="flex flex-row items-center text-lg font-medium mb-3">
                    <span className="text-lg font-medium">
                        Status:
                    </span>
                    <Badge className="ml-2" color={getStatusToModelBadgeStatus(status)}>
                        {translatedStatusWorkorders(status)}
                    </Badge>
                </section>
                <section className="space-y-1">
                    {checklist.map((item, index) => (
                        <div key={index}>
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                defaultChecked={item.completed}
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />
                            <span className='ml-3 font-medium'>{item.task}</span>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    )
}

export default CardWorkorders