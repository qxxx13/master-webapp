import { Skeleton, Stack } from '@mui/material';

export const DescLoading = () => {
    return (
        <Stack gap={1} sx={{ p: 2 }}>
            <Skeleton variant="text" height={32} />
            <Skeleton variant="text" height={32} />
            <Skeleton variant="text" height={32} />
            <Skeleton variant="rectangular" height={352} />
        </Stack>
    );
};
