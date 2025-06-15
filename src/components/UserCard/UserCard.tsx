import { Box, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { UserType } from '../../types/UserType';
import { bgHandler } from './bgHandler';

export const UserCard: React.FC<{ user: UserType }> = ({ user }) => {
    const navigate = useNavigate();

    const handleCLick = () => {
        navigate(`/user/${user.Id}`);
    };

    return (
        <Card sx={{ width: '100%', border: '2px solid white' }} elevation={5}>
            <CardActionArea onClick={handleCLick}>
                <CardContent>
                    <Stack flexDirection="row" justifyContent="space-between">
                        <Box>
                            <Typography variant="body1">{user.UserName}</Typography>
                            <Typography variant="body1" color="text.secondary">
                                Роль: {user.Role}
                            </Typography>
                            <Typography variant="body1" color="gold">
                                Звезды: {user?.ContestStars || 0}
                            </Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body1">Процент: {user.InterestRate}%</Typography>
                            <Typography variant="body1" color="text.secondary">
                                {user.Region}
                            </Typography>
                        </Box>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
