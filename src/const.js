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

const USER_ACTION = {
    UPDATE_TASK: 'UPDATE_TASK',
    ADD_TASK: 'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK'
};

const UPDATE_TYPE = {
    PATCH: 'PATCH',
    MINOR: 'MINOR',
    MAJOR: 'MAJOR',
    INIT: 'INIT'
};
export {STATUS_NAMES, STATUS_LABEL, USER_ACTION, UPDATE_TYPE};