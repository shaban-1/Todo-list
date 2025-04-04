const STATUS_NAMES = {
    PENDING: `pending`,
    INPROGRESS: `in-progress`,
    COMPLETED: `completed`,
    DISCARDED: `discarded`
};

const STATUS_LABEL = {
    [STATUS_NAMES.PENDING]: `Бэклог`,
    [STATUS_NAMES.INPROGRESS]: `В процессе`,
    [STATUS_NAMES.COMPLETED]: `Готово`,
    [STATUS_NAMES.DISCARDED]: `Корзина`
};

export {STATUS_NAMES, STATUS_LABEL};