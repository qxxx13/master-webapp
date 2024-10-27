export const OrdersPage: React.FC<OrdersPageProps> = ({ currentUser }) => {
    const [status, setStatus] = useState<MasterOrderStatusEnum>(MasterOrderStatusEnum.all);

    const MenuItems = Object.values(MasterOrderStatusEnum).map((status, index) => (
        <MenuItem key={index} value={status}>
            {translate(status)}
        </MenuItem>
    ));

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setStatus(event.target.value as MasterOrderStatusEnum);
    };

    const BackBTN = Telegram.WebApp.BackButton;
    BackBTN.hide();

    useEffect(() => {
        Telegram.WebApp.ready();
    }, []);

    return (
        <>
            <Stack gap={2} sx={{ p: 2, position: 'absolute', top: 0, width: '100%' }}>
                <Typography variant="h4" sx={{ textAlign: 'center' }}>
                    Заявки
                </Typography>
                <FormControl fullWidth>
                    <InputLabel id="status-select"></InputLabel>
                    <Select labelId="status-select" value={status} onChange={handleChangeStatus}>
                        {MenuItems}
                    </Select>
                </FormControl>
            </Stack>
            <OrdersList page={1} currentUser={currentUser} status={status} />
        </>
    );
};
