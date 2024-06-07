import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const OrdersPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Button variant="outlined" onClick={() => navigate('/login')}>
                Go to login
            </Button>
        </>
    );
};
