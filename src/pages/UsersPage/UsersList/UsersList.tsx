import React from 'react';
import { UserType } from '../../../types/UserType';
import { UserCard } from '../../../components/UserCard/UserCard';
import { Stack } from '@mui/material';

export const UsersList: React.FC<{ users: UserType[] }> = ({ users }) => {
    const usersList = users.map((user, index) => <UserCard user={user} key={index} />);

    return <Stack gap={1}>{usersList}</Stack>;
};
