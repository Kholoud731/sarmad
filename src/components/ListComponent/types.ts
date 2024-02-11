export interface RecordDetails {
    id: string;
    name: string;
    des: string;
    birth: string;
    score: number;
    nat: string;
}

export type ListProps = {
results: RecordDetails[]
}