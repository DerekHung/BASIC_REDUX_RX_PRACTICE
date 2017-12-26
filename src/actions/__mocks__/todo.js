export const ADD_NEW_TODO = 'ADD_NEW_TODO';
export const OPEN_EDIT = 'OPEN_EDIT';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const COMPLETE_ITEM = 'COMPLETE_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const CHANGE_FILTER = 'CHANGE_FILTER';
export const addNewTodo = jest.fn().mockImplementation(res => {
    return {
        type: ADD_NEW_TODO,
        value: res
    }
})

export const completeItem = jest.fn().mockImplementation(key => {
    return {
        type: COMPLETE_ITEM,
        key
    }
})

export const removeItem = jest.fn().mockImplementation(key => {
    return {
        type: REMOVE_ITEM,
        key
    }
})

////  有時間再補完 componet => action 這段測試

export const openEdit = (key) => {
    return {
        type: OPEN_EDIT,
        key
    }
}

export const updateItem = (value, key) => {
    return {
        type: UPDATE_ITEM,
        value,
        key
    }
}



export const changeFilter = (filter) => {
    return {
        type: CHANGE_FILTER,
        filter
    }
}