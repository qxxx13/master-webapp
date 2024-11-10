import { ChangeEvent, FC, useState } from 'react';
import { CompanyType } from '../../types/CompanyType';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { UserChip } from '../../components/UserChip/UserChip';
import { UserType } from '../../types/UserType';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { sumToSend } from './helper/sumToSend';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import { instance } from '../../config/apiConfig/apiConfig';
import { useRubFormat } from '../../hooks/useRubFormat';
import { setUpdate } from '../CompanyPage/CompanyList/model/updateStore';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';

type CompanyDescProps = {
    company: CompanyType;
    owner: UserType;
    primaryCompany?: CompanyType;
    companyWorkers: UserType[];
};

export const CompanyDesc: FC<CompanyDescProps> = (props) => {
    const { company, owner, primaryCompany, companyWorkers } = props;
    const navigate = useNavigate();

    const [isIncomeOpen, setIsIncomeOpen] = useState(false);
    const [isLossOpen, setIsLossOpen] = useState(false);
    const [income, setIncome] = useState<number | null>(null);
    const [loss, setLoss] = useState<number | null>(null);
    const [isOpenPaidDialog, setIsOpenPaidDialog] = useState(false);
    /* const [totalMoney, setTotalMoney] = useState(company.TotalCompanyMoney); */

    const salaryToPaid =
        companyWorkers.length > 0
            ? companyWorkers.reduce(
                  (prev, curr) => (prev += sumToSend(company.SalaryToSend, curr.CompanyInterest as number).sum),
                  0,
              )
            : 0;

    const goToAddWorkersToCompany = () => navigate(`/company/addNewWorkers/${company.Id}`);

    const toggleIsIncomeOpen = (state: boolean) => () => {
        setIsIncomeOpen(state);
    };

    const toggleIsLossOpen = (state: boolean) => () => {
        setIsLossOpen(state);
    };

    const toggleIsOpenPaidDialog = (state: boolean) => () => {
        setIsOpenPaidDialog(state);
    };

    const handleAddIncome = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setIncome(+event.target.value);
    };

    const handleAddLoss = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setLoss(+event.target.value);
    };

    const handleClosePaid = () => {
        instance
            .patch(`/company/toggleSalaryToSend?companyId=${company.Id}&sum=${salaryToPaid}`)
            .then(() => setUpdate())
            .catch((e) => console.log(e));
    };

    const saveTotalCompanyMoneyIncome = () => {
        if (income !== null) {
            const totalMoney = company.TotalCompanyMoney + income;
            instance
                .patch(`/company/toggleTotalCompanyMoney?companyId=${company.Id}&sum=${totalMoney}`)
                .then(() => setUpdate())
                .catch((e) => console.log(e));
        }
    };

    const saveTotalCompanyMoneyLoss = () => {
        if (loss !== null) {
            const totalMoney = company.TotalCompanyMoney - loss;
            instance
                .patch(`/company/toggleTotalCompanyMoney?companyId=${company.Id}&sum=${totalMoney}`)
                .then(() => setUpdate())
                .catch((e) => console.log(e));
        }
    };

    return (
        <Stack sx={{ p: 2, textAlign: 'center' }} gap={1}>
            <Typography variant="h5">
                <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} gap={1}>
                    {company.CompanyName} {company.Primary && <NewReleasesIcon />}
                </Stack>
                <IconButton sx={{ position: 'absolute', left: 6, top: 10 }} onClick={toggleIsLossOpen(true)}>
                    <MoneyOffIcon />
                </IconButton>

                <IconButton sx={{ position: 'absolute', right: 6, top: 10 }} onClick={toggleIsIncomeOpen(true)}>
                    <CreditScoreIcon />
                </IconButton>
            </Typography>
            <Typography variant="h6">
                Владелец: <UserChip user={owner} />
            </Typography>
            {!company.Primary && (
                <FormControl fullWidth>
                    <InputLabel id="primaryCompany">Головная компания</InputLabel>
                    <Select labelId="primaryCompany" value={company.CompanyOwnerId} label="Age" disabled>
                        <MenuItem value={company.CompanyOwnerId}>{primaryCompany?.CompanyName}</MenuItem>
                    </Select>
                </FormControl>
            )}
            <Stack>
                <Typography variant="body1">
                    Текущий баланс компании: {useRubFormat(company.TotalCompanyMoney).format}
                </Typography>
                <Typography variant="body1">
                    Сумма для выплаты:{' '}
                    {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(salaryToPaid)}
                </Typography>
            </Stack>
            <Stack>
                <Typography variant="h6">Сотрудники компании</Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Имя</TableCell>
                                <TableCell>Должность</TableCell>
                                <TableCell>Процент</TableCell>
                                <TableCell>Сумма к выплате</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {companyWorkers.length > 0 ? (
                                companyWorkers.map((worker) => (
                                    <TableRow
                                        key={worker.Id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell>{worker.UserName}</TableCell>
                                        <TableCell>{worker.Role}</TableCell>
                                        <TableCell>{worker.CompanyInterest}</TableCell>
                                        <TableCell>
                                            {
                                                sumToSend(company.SalaryToSend, worker.CompanyInterest as number)
                                                    .sumToDisplay
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <Stack sx={{ width: '100%' }}>
                                    <Typography>Данных нет</Typography>
                                </Stack>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* <Stack sx={{ mt: 2 }}>
                    <Button variant="contained" startIcon={<PersonAddIcon />} onClick={goToAddWorkersToCompany}>
                        Добавить пользователей
                    </Button>
                </Stack> */}

                <Stack sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<CurrencyExchangeIcon />}
                        onClick={toggleIsOpenPaidDialog(true)}
                    >
                        Рассчитать всех
                    </Button>
                </Stack>
                <Dialog open={isOpenPaidDialog} onClose={toggleIsOpenPaidDialog(false)}>
                    <DialogTitle id="alert-dialog-title">Вы уверены, что хотите закрыть расчет?</DialogTitle>
                    <DialogContent></DialogContent>
                    <DialogActions sx={{ justifyContent: 'space-between' }}>
                        <Button onClick={toggleIsOpenPaidDialog(false)} variant="contained" color="warning">
                            Отмена
                        </Button>
                        <Button onClick={handleClosePaid} autoFocus variant="contained" color="success">
                            Согласен
                        </Button>
                    </DialogActions>
                </Dialog>
            </Stack>

            <Dialog open={isIncomeOpen} onClose={toggleIsIncomeOpen(false)}>
                <DialogTitle>Добавить доход компании</DialogTitle>
                <DialogContent>
                    <TextField
                        type="number"
                        sx={{ width: '100%' }}
                        label="Доход компании"
                        value={income}
                        onChange={(e) => handleAddIncome(e)}
                        InputProps={{ inputProps: { min: 0 } }}
                    />
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button variant="contained" onClick={saveTotalCompanyMoneyIncome}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isLossOpen} onClose={toggleIsLossOpen(false)}>
                <DialogTitle>Добавить расход компании</DialogTitle>
                <DialogContent>
                    <TextField
                        type="number"
                        sx={{ width: '100%' }}
                        label="Расход компании"
                        value={loss}
                        onChange={(e) => handleAddLoss(e)}
                        InputProps={{ inputProps: { min: 0 } }}
                    />
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button variant="contained" onClick={saveTotalCompanyMoneyLoss}>
                        Сохранить
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};
