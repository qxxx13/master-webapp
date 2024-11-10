import { instance } from '../../../../config/apiConfig/apiConfig';
import { CompanyType } from '../../../../types/CompanyType';

export const getAllCompanies = (): Promise<CompanyType[]> => {
    return instance.get('company').then((res) => res.data);
};
