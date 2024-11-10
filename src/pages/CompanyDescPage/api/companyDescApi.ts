import { instance } from '../../../config/apiConfig/apiConfig';
import { fetchPrimaryCompanyByIdFx } from '../model/primaryCompanyStore';
import { fetchCompanyOwnerByIdFx } from '../model/userStore';
import { fetchCompanyWorkersByIdFx } from '../model/workersStore';

export const fetchCompanyById = async (companyId: string) => {
    const company = await instance.get(`/company/${companyId}`).then((res) => res.data);

    fetchCompanyOwnerByIdFx({ userId: company.CompanyOwnerId as number });
    fetchCompanyWorkersByIdFx({ companyId: +companyId });

    return company;
};

export const fetchUserById = (userId: number) => {
    const user = instance.get(`/user/${userId}`).then((res) => res.data);

    return user;
};

export const fetchWorkers = (companyId: number) => {
    const workers = instance.get(`/user?companyId=${companyId}`).then((res) => res.data);

    return workers;
};
