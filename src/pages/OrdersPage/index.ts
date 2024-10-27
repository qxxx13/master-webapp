import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { translate } from '../../common/translate/translate';
import { MasterOrderStatusEnum } from '../../types/OrderType';
import { UserType } from '../../types/UserType';
import { OrdersList } from './OrdersList/OrdersList';

type OrdersPageProps = {
    currentUser: UserType;
};
