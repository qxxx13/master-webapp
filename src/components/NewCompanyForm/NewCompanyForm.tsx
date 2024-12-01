import { Button, Stack } from '@mui/material';
import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useUnit } from 'effector-react';
import { FC, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { NewCompanyType } from '../../types/CompanyType';
import { UserType } from '../../types/UserType';
import { CompanySelect, CompanyTextField, OwnerSelect, PrimaryCompanySwitch } from './FieldsForForm';
import { $companyListStoresGetStatus, fetchAllCompanyFx } from './model/companyListStore';
import { initialValues } from './model/initialValues';
import { addNewCompanyFx } from './model/newOrderFormStore';

type NewCompanyFormProps = {
    isLoading: boolean;
    users: UserType[];
};

export const NewCompanyForm: FC<NewCompanyFormProps> = ({ isLoading, users }) => {
    const [isPrimaryCompany, setIsPrimaryCompany] = useState(false);
    const navigate = useNavigate();

    const { handleSubmit, reset, control, getValues, watch } = useForm<NewCompanyType>({
        defaultValues: initialValues,
    });

    const { data, loading } = useUnit($companyListStoresGetStatus);

    const handleCreateNewCompany: SubmitHandler<NewCompanyType> = (data) => {
        if (data.Primary) {
            const { PrimaryCompanyId, ...init } = data;
            addNewCompanyFx(init);
            navigate(`/company`);
        } else {
            addNewCompanyFx(data);
            navigate(`/company`);
        }
    };

    const isPrimary = watch('Primary');

    useEffect(() => {
        setIsPrimaryCompany(!!isPrimary);
    }, [isPrimary]);

    useEffect(() => {
        fetchAllCompanyFx();
    }, []);

    return (
        <form>
            <Stack sx={{ p: 2, gap: 1, mb: '56px' }}>
                {CompanyTextField(control, isLoading)}
                {!isPrimaryCompany && CompanySelect(control, data, isLoading)}
                {PrimaryCompanySwitch(control, isLoading)}
                {OwnerSelect(control, users, isLoading)}
                <Button
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit((newCompany) => handleCreateNewCompany(newCompany))}
                >
                    Создать новую компанию
                </Button>
                <MainButton
                    text="Создать новую компанию"
                    onClick={handleSubmit((newCompany) => handleCreateNewCompany(newCompany))}
                />
            </Stack>
        </form>
    );
};
