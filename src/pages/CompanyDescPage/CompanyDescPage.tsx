import { CircularProgress, Stack, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { CompanyType } from '../../types/CompanyType';
import { UserType } from '../../types/UserType';
import { $updateStore } from '../CompanyPage/CompanyList/model/updateStore';
import { CompanyDesc } from './CompanyDesc';
import { $companyDescStoreGetStatus, fetchCompanyByIdFx } from './model/companyDescStore';
import { $primaryCompanyStoreGetStatus, fetchPrimaryCompanyByIdFx } from './model/primaryCompanyStore';
import { $companyOwnerStoreGetStatus } from './model/userStore';
import { $companyWorkersStoreGetStatus } from './model/workersStore';

type CompanyDescPageProps = {
    currentUser: UserType;
};

export const CompanyDescPage: FC<CompanyDescPageProps> = ({ currentUser }) => {
    const id = useParams().id;

    const { data: companyDesc, loading: companyLoading } = useUnit($companyDescStoreGetStatus);
    const { data: companyOwner, loading: ownerLoading } = useUnit($companyOwnerStoreGetStatus);
    const { data: primaryCompany } = useUnit($primaryCompanyStoreGetStatus);
    const { data: companyWorkers } = useUnit($companyWorkersStoreGetStatus);
    const update = useUnit($updateStore);

    const companyWorkersFiltered = companyWorkers.filter((worker) => worker.CompanyInterest !== 0);

    useEffect(() => {
        id && fetchCompanyByIdFx({ orderId: id });
    }, [id, update]);

    useEffect(() => {
        companyDesc.PrimaryCompanyId &&
            fetchPrimaryCompanyByIdFx({ companyId: companyDesc.PrimaryCompanyId as string });
    }, [companyDesc.CompanyOwnerId, update]);

    return (
        <>
            {!companyLoading && !ownerLoading ? (
                <CompanyDesc
                    company={companyDesc as CompanyType}
                    owner={companyOwner as UserType}
                    primaryCompany={primaryCompany && (primaryCompany as CompanyType)}
                    companyWorkers={companyWorkersFiltered}
                />
            ) : (
                <CircularProgress />
            )}
        </>
    );
};
