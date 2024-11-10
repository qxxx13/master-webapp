import { Button, Stack, Typography } from '@mui/material';

import { UserType } from '../../types/UserType';
import { MainButton } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router-dom';
import { CompanyList } from './CompanyList/CompanyList';

export const CompanyPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();

    const goToCreateCompanyPage = () => {
        navigate('/createCompany');
    };

    return (
        <Stack sx={{ p: 2 }}>
            <Typography variant="h4" textAlign="center">
                Компания
            </Typography>
            <CompanyList />
            {/* <Button onClick={goToCreateCompanyPage}>Создать</Button> */}
            <MainButton text="Создать компанию" onClick={goToCreateCompanyPage} />
        </Stack>
    );
};
