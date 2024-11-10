import { FC } from 'react';
import { CompanyType } from '../../../types/CompanyType';
import { Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type CompanyListItemProps = {
    company: CompanyType;
};

export const CompanyListItem: FC<CompanyListItemProps> = ({ company }) => {
    const navigate = useNavigate();

    const goToCompanyDescPage = () => navigate(`/company/${company.Id}`);

    return (
        <Card sx={{ width: '100%', borderRadius: 2 }}>
            <CardActionArea onClick={goToCompanyDescPage}>
                <CardContent>
                    <Typography variant="h6">Компания: {company.CompanyName}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
