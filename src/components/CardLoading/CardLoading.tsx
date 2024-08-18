import { Skeleton, Stack } from '@mui/material';
import React from 'react';

export const CardLoading: React.FC<{ height: number }> = ({ height }) => {
    return (
        <Stack gap={1} sx={{ p: 2 }}>
            <Skeleton variant="rectangular" height={height} />
            <Skeleton variant="rectangular" height={height} />
            <Skeleton variant="rectangular" height={height} />
            <Skeleton variant="rectangular" height={height} />
        </Stack>
    );
};
