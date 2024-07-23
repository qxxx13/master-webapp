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
import { closeOrder, closingOrderAtZero } from './api/closingAtZeroDialogApi';

type ClosingAtZeroDialogProps = {
    orderId: string;
    chatId: string;
    messageId: string;
    closerId: string;
};

export const ClosingAtZeroDialog: React.FC<ClosingAtZeroDialogProps> = ({ chatId, closerId, messageId, orderId }) => {
    const [reason, setReason] = useState('missedCall');
    const [image, setImage] = useState<File | null>(null);
    const navigate = useNavigate();

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setReason(event.target.value);
    };

    const handleSetImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImage(event.target.files![0]);
    };

    const handleCloseOrder = () => {
        if (image !== null) {
            closingOrderAtZero(orderId, image);
            closeOrder(orderId, chatId, messageId, closerId, reason as OrderStatusEnum);

            navigate('/');
        }
    };

    return (
        <>
            <DialogTitle>Укажите причину закрытия в 0</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Укажите причину закрытия заявки в 0. И прикрепите фото-подтверждение
                </DialogContentText>
                <DialogActions>
                    <Stack sx={{ width: '100%' }} gap={1}>
                        <Select value={reason} onChange={handleChangeSelect}>
                            <MenuItem value={'missedCall'}>{translate('missedCall')}</MenuItem>
                            <MenuItem value={'rejectedByClient'}>{translate('rejectedByClient')}</MenuItem>
                        </Select>
                        <input type="file" onChange={(e) => handleSetImage(e)} />
                        <Button variant="contained" onClick={handleCloseOrder}>
                            Отправить
                        </Button>
                    </Stack>
                </DialogActions>
            </DialogContent>
        </>
    );
};
