interface SpecificationsProps {
    maxTemp: 80;
}

type AssetsProps = {
    name: string;
    image: string;
    status: string;
    model: string;
    sensors: string[];
    specifications: SpecificationsProps;
}

export default AssetsProps