import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BuildIcon from '@mui/icons-material/Build';
import CloseIcon from '@mui/icons-material/Close';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DoneIcon from '@mui/icons-material/Done';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import PaidIcon from '@mui/icons-material/Paid';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
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
                    case 'distribution': {
                        return <Chip icon={<HelpOutlineIcon />} label="На распределении" />;
                    }
                    case 'rejectedByMaster': {
                        return <Chip icon={<CloseIcon />} label="Отклонена мастером" />;
                    }
                    case 'rejectedByClient': {
                        return <Chip icon={<CloseIcon />} label="Отклонена клиентом" />;
                    }
                    case 'debt': {
                        return <Chip icon={<CurrencyExchangeIcon />} label="Долг" />;
                    }
                    case 'transfer': {
                        return <Chip icon={<TransferWithinAStationIcon />} label="Перенос" />;
                    }
                    case 'missedCall': {
                        return <Chip icon={<PhoneDisabledIcon />} label="Недозвон" />;
                    }
                }
            })()}
        </>
    );
};
