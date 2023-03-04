interface HealthHistoryProps {
    status: string;
    timestamp: Date;
}

interface MetricsProps {
    lastUptimeAt: string;
    totalCollectsUptime: number;
    totalUptime: number;
}

interface SpecificationsProps {
    maxTemp: number;
}

type MachineHistoryProps = {
    healthHistory: HealthHistoryProps[];
    healthscore: number;
    image: string;
    model: string;
    name: string;
    metrics: MetricsProps;
    sensors: string[];
    status: string;
    specifications: SpecificationsProps;
}

export default MachineHistoryProps