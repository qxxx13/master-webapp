import { Stack } from '@mui/material';
import { FC, useEffect } from 'react';
import { $companyListStoreGetStatus, fetchAllCompanyFx } from './model/companyListStore';
import { useUnit } from 'effector-react';
import { CompanyListItem } from './CompanyItem';

export const CompanyList: FC = () => {
    const { data, error, loading } = useUnit($companyListStoreGetStatus);

    const list = data.map((company) => <CompanyListItem company={company} key={company.Id} />);

    useEffect(() => {
        fetchAllCompanyFx();
    }, []);

    return <Stack gap={2}>{list}</Stack>;
};
