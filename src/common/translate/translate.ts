const dictionary: Record<string, string> = {
    //?
    AddNewOrder: 'Создать новую заявку',
    Submit: 'Создать',
    AddNewUser: 'Добавить нового пользователя',
    CloseOrder: 'Закрыть заявку',
    Login: 'Войти',
    CreateNewOrder: 'Создать заявку',
    Search: 'Поиск',
    SearchForAnUser: 'Поиск пользователя',
    CreateNewUser: 'Добавить пользователя',
    More: 'Больше',
    Edit: 'Редактировать',
    Delete: 'Удалить',
    EditUser: 'Редактировать',
    DeleteUser: 'Удалить',
    SearchForAnOrder: 'Искать заявку',
    SearchBy: 'Искать по',
    FilterByStatus: 'Фильтр по статусу',
    NotFound: 'Не найдено',
    Orders: 'Заявки',
    Users: 'Пользователи',
    Home: 'Главная',
    Id: 'Номер',
    Date: 'Дата',
    Status: 'Статус',
    MasterId: 'Мастер',
    Warning: 'Осторожно',
    ActiveOrders: 'Активные заявки',
    specialized: 'Профильная',
    notSpecialized: 'Непрофильная',
    takeToSD: 'Забрал на СД',
    SDOrders: 'Заявки СД',
    PaymentOrdersPage: 'Сдача',
    goToActiveOrders: 'Перейти к активным заявкам',
    City: 'Город',
    Save: 'Сохранить',
    DebtOrdersPage: 'Долги КЛ',
    PromRoutesPage: 'Маршруты',
    airConditioner: 'Кондиционеры',

    //? Заявка
    clientPhoneNumber: 'Номер телефона кл',
    Address: 'Адрес',
    ClientName: 'Имя кл',
    MasterName: 'Имя мастера',
    AnnouncedPrice: 'Озвучка',
    Description: 'Описание',
    Time: 'Время',
    OrderDate: 'Дата заявки',
    TotalPrice: 'Итог',
    Visit: 'Визит',
    ClientPhoneNumber: 'Номер телефона КЛ',
    Price: 'Итог',
    Total: 'Забрал',
    Expenses: 'Расход',
    Debt: 'Долг',
    MasterSalary: 'ЗП мастера',
    CompanyShare: 'Сдача компании',
    Type: 'Тип заявки',

    //? Статусы заявки
    pending: 'Ожидание', // Ожидает
    fulfilled: 'Закрыта', // Успешно
    rejectedByClient: 'Отклонена КЛ', // Отказ клиента
    rejectedByMaster: 'Отклонена Мастером', // Отказ мастера
    atWork: 'В работе', // В работе
    active: 'Активная', //активная заявка
    masterWentForSparePart: 'Мастер отъехал за ЗЧ', // Мастер отъехал за зч
    awaitingPayment: 'Ожидает сдачи', // ожидает оплаты
    all: 'Все',
    debt: 'Долг',
    missedCall: 'Недозвон',

    //? Статусы пользователя
    waitForWork: 'Свободен',
    wentForSparePart: 'Отъехал за ЗЧ',
    dayOff: 'Выходной',

    //? Визиты
    primary: 'Первичный',
    repeated: 'Повторный',
    guarantee: 'Гарантия',

    //? Пользователь
    UserName: 'Логин',
    TelegramChatId: 'Telegram_chat_id',
    Password: 'Пароль',
    MessageId: 'Message_thread_id',
    master: 'Мастер',
    admin: 'Администратор',
};

export const translate = (key: string) => {
    return dictionary[key] || key;
};
