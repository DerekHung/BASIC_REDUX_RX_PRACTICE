import { 
    ADD_NEW_TODO,
    OPEN_EDIT,
    UPDATE_ITEM,
    COMPLETE_ITEM,
    REMOVE_ITEM,
    CHANGE_FILTER
} from '../actions/todo';

const initState = {
    todolist: [],
    count: 0,
    filter: 'ALL'
};

const todoReducer = (state = initState, action) => {
    switch(action.type) {
        case ADD_NEW_TODO:
            return { 
                todolist: 
                [...state.todolist, 
                    { 
                        key:new Date().getTime() + state.count, 
                        value: action.value,
                        onEdit: false,
                        completed: false
                    }
                ],
                count: state.count += 1 
            };
        case OPEN_EDIT:
            return {
                ...state,
                todolist: state.todolist.map((elm, index)=>{ if( elm.key === action.key ) elm.onEdit = true; return elm; })
            }
        case UPDATE_ITEM:
            return {
                ...state,
                todolist: state.todolist.map((elm, index)=>{ if( elm.key === action.key ) { elm.onEdit = false; elm.value = action.value }; return elm; })
            }
        case COMPLETE_ITEM:
            return {
                ...state,
                todolist: state.todolist.map((elm, index)=>{ if( elm.key === action.key ) elm.completed = true; return elm; }),
            }
        case REMOVE_ITEM:
            return {
                ...state,
                todolist: state.todolist.filter((elm)=> elm.key !== action.key),
            }
        case CHANGE_FILTER:
            return {
                ...state,
                filter: action.filter,
            }
        default: return state;
    }
    
}

export default todoReducer;