import AddIcon from '@mui/icons-material/Add';
import { Card, CardActions, CardContent, IconButton, Skeleton, Stack, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserType } from '../../types/UserType';
import { addNewPercentageGrid } from './api/api';
import { $percentageGridListGetStatus, fetchAllPercentageGridFx } from './model/PercentageGridStore';

type PercentageGridSettingsPageProps = {
    currentUser: UserType;
};

export const PercentageGridSettingsPage: FC<PercentageGridSettingsPageProps> = ({ currentUser }) => {
    const { data, error, loading } = useUnit($percentageGridListGetStatus);

    const navigate = useNavigate();

    const goToEditPercentageGrid = (id: number) => {
        navigate(`/percentageGridSettings/${id}`);
    };

    const handleCreateNewPercentageGrid = () => {
        addNewPercentageGrid().then((res) => navigate(`/percentageGridSettings/${res.data.Id}`));
    };

    useEffect(() => {
        fetchAllPercentageGridFx();
    }, []);

    if (error) {
        return <Typography>{error.message}</Typography>;
    }

    if (loading) {
        return [1, 2, 3, 4, 5].map((item) => <Skeleton key={item} />);
    }

    return (
        <Stack sx={{ p: 2 }} gap={1}>
            <Typography variant="h4" textAlign={'center'}>
                Сетки процентов
            </Typography>
            <IconButton onClick={handleCreateNewPercentageGrid} sx={{ position: 'absolute', right: 16, top: 16 }}>
                <AddIcon />
            </IconButton>
            {data
                .sort((a, b) => a.Id - b.Id)
                .map((percentageGrid) => (
                    <Card key={percentageGrid.Id}>
                        <CardActions onClick={(_) => goToEditPercentageGrid(percentageGrid.Id)}>
                            <CardContent>
                                <Typography variant="body1">{percentageGrid.Name}</Typography>
                            </CardContent>
                        </CardActions>
                    </Card>
                ))}
        </Stack>
    );
};
