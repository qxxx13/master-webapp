import {
    Box,
    Button,
    Divider,
    Grid,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useUnit } from 'effector-react';
import moment from 'moment';
import { FC, useEffect } from 'react';

import {
    $filters,
    $orderStats,
    $users,
    fetchOrderStats,
    fetchUsersFx,
    resetFilters,
    setDateRange,
    setDispId,
    setTotalRange,
} from './model/statOrderStore';

export const StatOrderPage: FC = () => {
    const orderStats = useUnit($orderStats);
    const users = useUnit($users);
    const filters = useUnit($filters);

    useEffect(() => {
        fetchOrderStats({
            dispId: filters.dispId,
            startDate: filters.startDate,
            endDate: filters.endDate,
            minTotal: filters.minTotal,
            maxTotal: filters.maxTotal,
        });
    }, [filters]);

    const handleDateChange = (type: 'start' | 'end', value: moment.Moment | null) => {
        const dateStr = value ? value.format('YYYY-MM-DD') : null;
        if (type === 'start') {
            setDateRange({ startDate: dateStr, endDate: filters.endDate });
        } else {
            setDateRange({ startDate: filters.startDate, endDate: dateStr });
        }
    };

    const handleTotalChange = (type: 'min' | 'max', value: string) => {
        const numValue = value ? parseInt(value) : null;
        if (type === 'min') {
            setTotalRange({ minTotal: numValue, maxTotal: filters.maxTotal });
        } else {
            setTotalRange({ minTotal: filters.minTotal, maxTotal: numValue });
        }
    };

    const handleDispChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value === '' ? null : parseInt(event.target.value);
        setDispId(value);
    };

    const handleReset = () => {
        resetFilters();
    };

    useEffect(() => {
        fetchUsersFx();
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box sx={{ p: 3, mb: '53px' }}>
                <Typography variant="h4" gutterBottom>
                    Статистика заявок
                </Typography>

                <Paper sx={{ p: 3, mb: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <DatePicker
                                label="Начальная дата"
                                value={filters.startDate ? moment(filters.startDate) : null}
                                onChange={(value) => handleDateChange('start', value)}
                                /* renderInput={(params) => <TextField {...params} fullWidth />} */
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DatePicker
                                label="Конечная дата"
                                value={filters.endDate ? moment(filters.endDate) : null}
                                onChange={(value) => handleDateChange('end', value)}
                                /* renderInput={(params) => <TextField {...params} fullWidth />} */
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                select
                                label="Диспетчер"
                                value={filters.dispId || ''}
                                onChange={handleDispChange}
                                fullWidth
                            >
                                <MenuItem value="">
                                    <em>Все диспетчеры</em>
                                </MenuItem>
                                {users.map((user) => (
                                    <MenuItem key={user.Id} value={user.Id}>
                                        {user.UserName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Минимальная сумма"
                                type="number"
                                value={filters.minTotal || ''}
                                onChange={(e) => handleTotalChange('min', e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Максимальная сумма"
                                type="number"
                                value={filters.maxTotal || ''}
                                onChange={(e) => handleTotalChange('max', e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid container flexDirection={'column'} sx={{ p: '24px 0 0 24px' }} gap={1}>
                            <Button variant="outlined" onClick={handleReset}>
                                Сбросить фильтры
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() =>
                                    fetchOrderStats({
                                        dispId: filters?.dispId,
                                        startDate: filters?.startDate,
                                        endDate: filters?.endDate,
                                        minTotal: filters?.minTotal,
                                        maxTotal: filters?.maxTotal,
                                    })
                                }
                            >
                                Обновить
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>

                {orderStats && (
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Результаты
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontWeight="bold">Количество заявок:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{orderStats.count}</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontWeight="bold">Общая сумма:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{orderStats.totalSum} ₽</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontWeight="bold">Общий расход:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{orderStats.totalExpenses} ₽</Typography>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <Typography fontWeight="bold">Сдача в компанию:</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{orderStats.totalCompanyShare} ₽</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                )}
            </Box>
        </LocalizationProvider>
    );
};
