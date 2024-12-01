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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { translate } from '../../common/translate/translate';
import { OrderStatusEnum } from '../../types/OrderType';
import { closeOrder } from './api/closingAtZeroDialogApi';

type ClosingAtZeroDialogProps = {
    orderId: string;
    chatId: string;
    messageId: string;
    closerId: string;
};

export const ClosingAtZeroDialog: React.FC<ClosingAtZeroDialogProps> = ({ chatId, closerId, messageId, orderId }) => {
    const [reason, setReason] = useState('missedCall');
    /* const [image, setImage] = useState<File | null>(null); */
    const navigate = useNavigate();

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setReason(event.target.value);
    };

    const handleCloseOrder = () => {
        closeOrder(orderId, chatId, messageId, closerId, reason as OrderStatusEnum);

        navigate('/');
    };

    return (
        <>
            <DialogTitle>Укажите причину закрытия в 0</DialogTitle>
            <DialogContent>
                <DialogContentText>Укажите причину закрытия заявки в 0</DialogContentText>
                <DialogActions>
                    <Stack sx={{ width: '100%' }} gap={1}>
                        <Select value={reason} onChange={handleChangeSelect}>
                            <MenuItem value={'rejectedByClient'}>{translate('rejectedByClient')}</MenuItem>
                            <MenuItem value={'missedCall'}>{translate('missedCall')}</MenuItem>
                            <MenuItem value={'cancelByClient'}>{translate('cancelByClient')}</MenuItem>
                        </Select>
                        {/* <input type="file" accept="image/png, image/jpeg" onChange={(e) => handleSetImage(e)} /> */}
                        <Button variant="contained" onClick={handleCloseOrder}>
                            Отправить
                        </Button>
                    </Stack>
                </DialogActions>
            </DialogContent>
        </>
    );
};
