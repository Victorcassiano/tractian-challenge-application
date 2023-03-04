type StatusProps = {
    [key: string]: string
}

const translatedStatusPriority = (status: string): string => {

    const keys: StatusProps = {
        high: 'Alta',
    }

    return keys[status]
}

export default translatedStatusPriority