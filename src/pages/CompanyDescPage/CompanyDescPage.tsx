import { FC, useEffect } from 'react';
import { UserType } from '../../types/UserType';
import { useParams } from 'react-router-dom';
import { $companyDescStoreGetStatus, fetchCompanyByIdFx } from './model/companyDescStore';
import { useUnit } from 'effector-react';
import { $companyOwnerStoreGetStatus } from './model/userStore';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { CompanyDesc } from './CompanyDesc';
import { CompanyType } from '../../types/CompanyType';
import { $primaryCompanyStoreGetStatus, fetchPrimaryCompanyByIdFx } from './model/primaryCompanyStore';
import { $companyWorkersStoreGetStatus } from './model/workersStore';
import { $updateStore } from '../CompanyPage/CompanyList/model/updateStore';

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
                    companyWorkers={companyWorkers}
                />
            ) : (
                <CircularProgress />
            )}
        </>
    );
};
