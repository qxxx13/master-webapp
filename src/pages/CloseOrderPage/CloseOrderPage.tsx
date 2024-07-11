import { Button, Stack, TextField, Typography } from '@mui/material';
import { useUnit } from 'effector-react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { CloseOrderType } from '../../types/OrderType';
import { closeOrder, getInterestRate, getMasterId } from './api/CloseOrderApi';
import { $closeOrderGetStatus, $closeOrderStore } from './model/closeOrderStore';

export const CloseOrderPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [masterId, setMasterId] = useState('');
    const [interestRate, setInterestRate] = useState(0);
    const { data: order, loading } = useUnit($closeOrderGetStatus);

    const [userId, setUserId] = useState<number>();

    const chatId = params.chatId as string;
    const messageId = params.messageId as string;
    const orderId = params.orderId as string;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CloseOrderType>();

    const onSubmit: SubmitHandler<CloseOrderType> = (data) => calcOrderPrice(data);

    const calcOrderPrice = async (data: CloseOrderType) => {
        const price = +data.TotalPrice - +data.Expenses;
        const masterSalary = price * (interestRate / 100);

        const companyShare = price - masterSalary;

        await closeOrder(
            orderId,
            {
                Price: String(price),
                MasterSalary: String(masterSalary),
                CompanyShare: String(companyShare),
                Expenses: data.Expenses,
                TotalPrice: data.TotalPrice,
                Comments: data.Comments,
                Debt: data.Debt,
            },
            chatId,
            messageId,
        );

        navigate('/');
    };

    const getData = async () => {
        const masterId = await getMasterId(orderId);
        const interestRate = await getInterestRate(masterId);

        setMasterId(String(masterId));
        setInterestRate(interestRate);
    };

    const goBack = () => navigate(-1);

    const BackBTN = Telegram.WebApp.BackButton;
    BackBTN.isVisible = true;
    BackBTN.onClick(goBack);

    useEffect(() => {
        Telegram.WebApp.ready();
        getData();
    }, []);

    return (
        <Stack>
            <Typography variant="h5" sx={{ p: 2, textAlign: 'center' }}>
                Закрытие заявки №{orderId}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={1} sx={{ p: 2 }}>
                    <TextField
                        {...register('TotalPrice', { required: true })}
                        placeholder="Забрал"
                        color={errors.TotalPrice ? 'error' : 'primary'}
                        type="number"
                        defaultValue={order.Total as number}
                    />
                    <TextField
                        {...register('Expenses')}
                        placeholder="Расход"
                        type="number"
                        color="primary"
                        defaultValue={order.Expenses as number}
                    />
                    <TextField
                        {...register('Debt')}
                        placeholder="Долг"
                        defaultValue={order.Debt as number}
                        type="number"
                        color="primary"
                    />
                    <TextField
                        {...register('Comments')}
                        placeholder="Комментарии"
                        defaultValue={order.Comments as string}
                        type="text"
                        color="primary"
                    />

                    <Button variant="outlined" type="submit">
                        Закрыть
                    </Button>
                </Stack>
            </form>
        </Stack>
    );
};
