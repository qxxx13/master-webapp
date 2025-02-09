import { Button, Dialog, Stack, TextField, Typography } from '@mui/material';
import { BackButton } from '@vkruglikov/react-telegram-web-app';
import { useUnit } from 'effector-react';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { CardLoading } from '../../components/CardLoading/CardLoading';
import { ClosingAtZeroDialog } from '../../components/ClosingAtZeroDialog/ClosingAtZeroDialog';
import { instance } from '../../config/apiConfig/apiConfig';
import { CloseOrderType, OrderStatusEnum } from '../../types/OrderType';
import { UserType } from '../../types/UserType';
import { closeOrder, getInterestRate, getMasterId } from './api/CloseOrderApi';
import { $closeOrderGetStatus, $closeOrderStore, fetchOrderFx } from './model/closeOrderStore';
import { $percentageGridGetStatus, fetchPercentageGridFx } from './model/percentageGridItemsStore';

export const CloseOrderPage: React.FC<{ currentUser: UserType }> = ({ currentUser }) => {
    const navigate = useNavigate();
    const params = useParams();
    const [masterId, setMasterId] = useState('');
    const [interestRate, setInterestRate] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const { data: order, loading } = useUnit($closeOrderGetStatus);
    const { data: percentageGrid, loading: percentageGridLoading } = useUnit($percentageGridGetStatus);

    const chatId = params.chatId as string;
    const messageId = params.messageId as string;
    const orderId = params.orderId as string;
    const companyId = params.companyId as string;

    const toggleSetOpenDialog = (openDialog: boolean) => () => {
        setOpenDialog(openDialog);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CloseOrderType>();

    const onSubmit: SubmitHandler<CloseOrderType> = (data) => calcOrderPrice(data);

    const calcOrderPrice = async (data: CloseOrderType) => {
        const price = +data.TotalPrice - +data.Expenses;

        let masterSalary = 0;

        const foundItem = percentageGrid?.Items.find((item) => {
            const from = parseFloat(item.From); // Преобразуем From в число
            const to = parseFloat(item.To); // Преобразуем To в число
            return price >= from && price <= to;
        });

        if (foundItem) {
            masterSalary = price * (+foundItem.CheckAmount / 100);
        } else {
            masterSalary = price * (interestRate / 100);
        }

        const debt = Number(data.Debt);

        const companyShare = price - masterSalary;

        if (+data.TotalPrice === 0) {
            toggleSetOpenDialog(true)();
        } else {
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
                String(currentUser.Id),
                debt !== 0 ? OrderStatusEnum.debt : OrderStatusEnum.awaitingPayment,
            )
                .then(() => {
                    if (companyId) {
                        instance
                            .patch(`/company/addMoneyToCompany?companyId=${companyId}&sum=${companyShare}`)
                            .catch((e) => console.log(e));
                    }
                    enqueueSnackbar('Заявка закрыта, ожидает сдачи', { variant: 'success' });
                    navigate('/');
                })
                .catch((e: Error) => {
                    enqueueSnackbar(`Заявка не закрыта, ${e.message}`, { variant: 'error' });
                });
        }
    };

    const getData = async () => {
        const masterId = await getMasterId(orderId);
        const interestRate = await getInterestRate(masterId);

        fetchPercentageGridFx({ masterId: String(masterId) });
        fetchOrderFx({ orderId: orderId });
        setMasterId(String(masterId));
        setInterestRate(interestRate);
    };

    const goBack = () => navigate(-1);

    useEffect(() => {
        Telegram.WebApp.ready();
        getData();
    }, []);

    return (
        <Stack>
            <BackButton onClick={goBack} />
            <Typography variant="h5" sx={{ p: 2, textAlign: 'center' }}>
                Закрытие заявки №{orderId}
            </Typography>
            <Dialog open={openDialog} onClose={toggleSetOpenDialog(false)}>
                <ClosingAtZeroDialog
                    chatId={chatId}
                    closerId={String(currentUser.Id)}
                    messageId={messageId}
                    orderId={orderId}
                    masterRole={currentUser.Role}
                />
            </Dialog>
            <form onSubmit={handleSubmit(onSubmit)}>
                {!loading && !percentageGridLoading ? (
                    <Stack gap={1} sx={{ p: 2 }}>
                        <TextField
                            {...register('TotalPrice', { required: true })}
                            placeholder="Забрал"
                            color={errors.TotalPrice ? 'error' : 'primary'}
                            type="number"
                            defaultValue={(order.Total as number) || null}
                        />
                        <TextField
                            {...register('Expenses')}
                            placeholder="Расход"
                            type="number"
                            color="primary"
                            defaultValue={(order.Expenses as number) || null}
                        />
                        <TextField
                            {...register('Debt')}
                            placeholder="Долг"
                            defaultValue={(order.Debt as number) || null}
                            type="number"
                            color="primary"
                        />
                        <TextField
                            {...register('Comments')}
                            placeholder="Комментарии"
                            defaultValue={(order.Comments as string) || null}
                            type="text"
                            color="primary"
                        />

                        <Button variant="contained" type="submit" color="success">
                            Закрыть
                        </Button>
                    </Stack>
                ) : (
                    <CardLoading height={140} />
                )}
            </form>
        </Stack>
    );
};
