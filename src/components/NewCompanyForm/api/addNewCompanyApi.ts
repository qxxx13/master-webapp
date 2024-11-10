import { instance } from '../../../config/apiConfig/apiConfig';
import { NewCompanyType } from '../../../types/CompanyType';

export const postNewCompany = (newCompany: NewCompanyType): Promise<NewCompanyType> => {
    const addNewCompany = instance.post('company', newCompany).then((res) => res.data);

    return addNewCompany;
};
