import {
    Button,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { translate } from '../../common/translate/translate';
import { OrderStatusEnum } from '../../types/OrderType';
import { RoleEnum } from '../../types/UserType';
import { closeOrder } from './api/closingAtZeroDialogApi';

type ClosingAtZeroDialogProps = {
    orderId: string;
    chatId: string;
    messageId: string;
    closerId: string;
    masterRole: RoleEnum;
};

export const ClosingAtZeroDialog: React.FC<ClosingAtZeroDialogProps> = ({
    chatId,
    closerId,
    messageId,
    orderId,
    masterRole,
}) => {
    const [reason, setReason] = useState('rejectedByClient');
    const navigate = useNavigate();

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setReason(event.target.value);
    };

    const handleCloseOrder = () => {
        closeOrder(orderId, chatId, messageId, closerId, reason as OrderStatusEnum)
            .then(() => {
                enqueueSnackbar('Заявка закрыта, ожидает сдачи', { variant: 'success' });
                navigate('/');
            })
            .catch((e: Error) => enqueueSnackbar(`Заявка не закрыта, ${e.message}`, { variant: 'error' }));
    };

    return (
        <>
            <DialogTitle>Укажите причину закрытия в 0</DialogTitle>
            <DialogContent>
                <DialogContentText>Укажите причину закрытия заявки в 0</DialogContentText>
                <DialogActions>
                    <Stack sx={{ width: '100%' }} gap={1}>
                        <Select value={reason} onChange={handleChangeSelect}>
                            {(masterRole === RoleEnum.admin || masterRole === RoleEnum.disp) && (
                                <MenuItem value={'missedCall'}>{translate('missedCall')}</MenuItem>
                            )}
                            <MenuItem value={'rejectedByClient'}>{translate('rejectedByClient')}</MenuItem>
                            {(masterRole === RoleEnum.admin || masterRole === RoleEnum.disp) && (
                                <MenuItem value={'cancelByClient'}>{translate('cancelByClient')}</MenuItem>
                            )}
                        </Select>
                        <Button variant="contained" onClick={handleCloseOrder}>
                            Отправить
                        </Button>
                    </Stack>
                </DialogActions>
            </DialogContent>
        </>
    );
};
