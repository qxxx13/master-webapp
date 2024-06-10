import { useParams } from 'react-router-dom';

import { OrderType } from '../../types/OrderType';

export const OrderDescPage = () => {
    const id = useParams().id as string;
    return <>Заявка №{id}</>;
};
