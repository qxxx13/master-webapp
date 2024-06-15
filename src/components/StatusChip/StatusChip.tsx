import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BuildIcon from '@mui/icons-material/Build';
import DoneIcon from '@mui/icons-material/Done';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PaidIcon from '@mui/icons-material/Paid';
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
                    case 'masterWentForSparePart': {
                        return <Chip icon={<ElectricCarIcon />} label="Уехал за ЗЧ" />;
                    }
                    case 'awaitingPayment': {
                        return <Chip icon={<PaidIcon />} label="Ожидает сдачи" />;
                    }
                }
            })()}
        </>
    );
};
