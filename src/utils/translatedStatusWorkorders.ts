type StatusProps = {
    [key: string]: string
}

const translatedStatusWorkorders = (status: string): string => {

    const keys: StatusProps = {
        'in progress': 'Em Progresso',
        completed: 'Finalizado',
    }

    return keys[status]
}

export default translatedStatusWorkorders