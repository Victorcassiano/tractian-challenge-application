type CheckListProps = {
    completed: boolean;
    task: string;
}

type WorkordersProps = {
    title: string;
    description: string;
    priority: string;
    status: string;
    assignedUserIds?: number[];
    checklist: CheckListProps[]
}

export default WorkordersProps