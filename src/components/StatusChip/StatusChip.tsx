import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BuildIcon from '@mui/icons-material/Build';
import DoneIcon from '@mui/icons-material/Done';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { Chip } from '@mui/material';

import { OrderStatusEnum } from '../../types/OrderType';

export const StatusChip: React.FC<{ status: OrderStatusEnum }> = ({ status }) => {
    return (
        <>
            {(() => {
                switch (status) {
                    case 'pending': {
                        return <Chip icon={<AccessTimeIcon />} label="Ожидает" />;
                    }
                    case 'fulfilled': {
                        return <Chip icon={<DoneIcon />} label="Закрыта" />;
                    }
                    case 'takeToSD': {
                        return <Chip icon={<BuildIcon />} label="Забрал на СД" />;
                    }
                    case 'active': {
                        return <Chip icon={<AssignmentIcon />} label="Активна" />;
                    }
                    case 'atWork': {
                        return <Chip icon={<EngineeringIcon />} label="В работе" />;
                    }
                }
            })()}
        </>
    );
};
