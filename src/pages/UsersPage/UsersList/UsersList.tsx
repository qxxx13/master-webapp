import { Stack } from '@mui/material';
import React from 'react';

import { UserCard } from '../../../components/UserCard/UserCard';
import { UserType } from '../../../types/UserType';

export const UsersList: React.FC<{ users: UserType[] }> = ({ users }) => {
    const usersList = users.map((user, index) => <UserCard user={user} key={index} />);

    return (
        <Stack gap={1} sx={{ mb: '62px' }}>
            {usersList}
        </Stack>
    );
};
