import { Avatar, Chip } from '@mui/material';
import { instance } from '../../config/apiConfig/apiConfig';
import { UserType } from '../../types/UserType';

export const UserChip: React.FC<{ user: UserType }> = ({ user }) => {
    const avatarUrl = user.AvatarId ? `${instance.defaults.baseURL}files/${user.AvatarId}` : '';
    return (
        <Chip
            variant="outlined"
            avatar={<Avatar src={avatarUrl} sx={{ border: 'thick', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />}
            label={user?.UserName}
        />
    );
};
