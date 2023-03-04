type StatusProps = {
    [key: string]: string
}

const translatedStatusMachine = (status: string): string => {

    const keys: StatusProps = {
        inAlert: 'Em Alerta',
        inDowntime: 'Em Parada',
        inOperation: 'Em Operação',
        unplannedStop: 'Parada inesperada'
    }

    return keys[status]
}

export default translatedStatusMachine