import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BuildIcon from '@mui/icons-material/Build';
import CloseIcon from '@mui/icons-material/Close';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import DoneIcon from '@mui/icons-material/Done';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PaidIcon from '@mui/icons-material/Paid';
import PhoneDisabledIcon from '@mui/icons-material/PhoneDisabled';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { Chip } from '@mui/material';

import { OrderStatusEnum } from '../../types/OrderType';

export const StatusChip: React.FC<{ status: OrderStatusEnum }> = ({ status }) => {
    return (
        <>
            {(() => {
                switch (status) {
                    case 'pending': {
                        return <Chip color="warning" icon={<AccessTimeIcon color="action" />} label="Ожидает" />;
                    }
                    case 'fulfilled': {
                        return <Chip color="success" icon={<DoneIcon color="action" />} label="Закрыта" />;
                    }
                    case 'takeToSD': {
                        return <Chip color="secondary" icon={<BuildIcon color="action" />} label="Забрал на СД" />;
                    }
                    case 'active': {
                        return <Chip color="primary" icon={<AssignmentIcon color="action" />} label="Активна" />;
                    }
                    case 'atWork': {
                        return <Chip color="primary" icon={<EngineeringIcon color="action" />} label="В работе" />;
                    }
                    case 'masterWentForSparePart': {
                        return <Chip color="secondary" icon={<ElectricCarIcon color="action" />} label="Уехал за ЗЧ" />;
                    }
                    case 'awaitingPayment': {
                        return <Chip color="success" icon={<PaidIcon color="action" />} label="Ожидает сдачи" />;
                    }
                    case 'distribution': {
                        return <Chip icon={<HelpOutlineIcon color="action" />} label="На распределении" />;
                    }
                    case 'rejectedByMaster': {
                        return <Chip color="error" icon={<CloseIcon color="action" />} label="Отклонена мастером" />;
                    }
                    case 'rejectedByClient': {
                        return (
                            <Chip
                                color="error"
                                icon={<ThumbDownAltOutlinedIcon color="action" />}
                                label="Отказ клиентом"
                            />
                        );
                    }
                    case 'debt': {
                        return <Chip color="warning" icon={<CurrencyExchangeIcon color="action" />} label="Долг" />;
                    }
                    case 'transfer': {
                        return (
                            <Chip color="info" icon={<TransferWithinAStationIcon color="action" />} label="Перенос" />
                        );
                    }
                    case 'missedCall': {
                        return <Chip color="error" icon={<PhoneDisabledIcon color="action" />} label="Недозвон" />;
                    }
                    case 'cancelByClient': {
                        return <Chip color="error" icon={<CloseIcon color="action" />} label="Отмена клиентом" />;
                    }
                }
            })()}
        </>
    );
};
