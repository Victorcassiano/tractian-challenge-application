interface SpecificationsProps {
    maxTemp: 80;
}

type AssetsProps = {
    id: number;
    name: string;
    image: string;
    status: string;
    model: string;
    sensors: string[];
    specifications: SpecificationsProps;
}

export default AssetsProps