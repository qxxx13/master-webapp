export type CompanyType = {
    Id: number;
    CompanyName: string;
    TotalCompanyMoney: number;
    PastTotalCompanyMoney: number;
    SalaryToSend: number;
    Primary?: boolean;
    PrimaryCompanyId?: number;
    CompanyOwnerId?: number;
};

export type NewCompanyType = Omit<CompanyType, 'Id'>;
