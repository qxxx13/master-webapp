import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { translate } from '../../common/translate/translate';
import { MasterOrderStatusEnum } from '../../types/OrderType';
import { UserType } from '../../types/UserType';
import { OrdersList } from './OrdersList/OrdersList';

type OrdersPageProps = {
    currentUser: UserType;
};

export const OrdersPage: React.FC<OrdersPageProps> = ({ currentUser }) => {
    /* const [status, setStatus] = useState<MasterOrderStatusEnum>(MasterOrderStatusEnum.all); */
    /* const [typeOfPage, setTypeOfPage] = useState('archive'); */
    /* const [searchParams] = useSearchParams(); */

    /* const typeOfPage = searchParams.get('type'); */

    /* const MenuItems = Object.values(MasterOrderStatusEnum).map((status, index) => (
        <MenuItem key={index} value={status}>
            {translate(status)}
        </MenuItem>
    ));

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatus(event.target.value as MasterOrderStatusEnum);
    };

    const handleChangeTypeOfPage = (event: SelectChangeEvent) => {
        setTypeOfPage(event.target.value);
    };
 */
    useEffect(() => {
        Telegram.WebApp.ready();
    }, []);

    return (
        <>
            <Stack gap={2} sx={{ p: 2 }}>
                <Typography variant="h4" sx={{ textAlign: 'center' }}>
                    Хронология
                </Typography>

                {/* <FormControl fullWidth>
                    <InputLabel id="status-select"></InputLabel>
                    <Select labelId="status-select" value={status} onChange={handleChangeStatus}>
                        {MenuItems}
                    </Select>
                </FormControl>
                <FormControl>
                    <InputLabel id="typeSelect">Тип</InputLabel>
                    <Select
                        labelId="typeSelect"
                        value={typeOfPage}
                        onChange={handleChangeTypeOfPage}
                        sx={{ height: 45 }}
                        label="Тип"
                    >
                        <MenuItem value="chronology">Хронология</MenuItem>
                        <MenuItem value="archive">Архив</MenuItem>
                    </Select>
                </FormControl> */}
            </Stack>
            <OrdersList page={1} currentUser={currentUser} status={MasterOrderStatusEnum.all} type={'chronology'} />
        </>
    );
};
