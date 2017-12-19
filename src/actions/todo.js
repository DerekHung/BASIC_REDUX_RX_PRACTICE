export const ADD_NEW_TODO = 'ADD_NEW_TODO';
export const OPEN_EDIT = 'OPEN_EDIT';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const COMPLETE_ITEM = 'COMPLETE_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CHANGE_FILTER = 'CHANGE_FILTER';

export const openEdit = (key) => {
    return {
        type: OPEN_EDIT,
        key
    }
}

export const addNewTodo = (value) => {
    return {
        type: ADD_NEW_TODO,
        value
    }
}

export const updateItem = (value, key) => {
    return {
        type: UPDATE_ITEM,
        value,
        key
    }
}

export const completeItem = (key) => {
    return {
        type: COMPLETE_ITEM,
        key
    }
}

export const removeItem = (key) => {
    return {
        type: REMOVE_ITEM,
        key
    }
}

export const changeFilter = (filter) => {
    return {
        type: CHANGE_FILTER,
        filter
    }
}