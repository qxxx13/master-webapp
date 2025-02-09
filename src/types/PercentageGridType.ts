export type PercentageGrid = {
    Id: number;
    Name: string;
};

export type PercentageGridItem = {
    GridId: number;
    Name: string;
    Items: { Id: number; From: string; To: string; CheckAmount: string; PercentageGridId: number }[];
};
