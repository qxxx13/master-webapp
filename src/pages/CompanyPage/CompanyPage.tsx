import { Stack, Typography } from '@mui/material';
import { UserType } from '../../types/UserType';

export const CompanyPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    return (
        <Stack sx={{ p: 2 }}>
            <Typography variant="h4" textAlign="center">
                Компания
            </Typography>
        </Stack>
    );
};
