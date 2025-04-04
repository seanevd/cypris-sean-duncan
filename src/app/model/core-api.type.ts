export type CoreEntity = {
    limit: number;
    offset: number;
    results: Work[];
}

export type Work = {
    id: number;
    title: string;
}