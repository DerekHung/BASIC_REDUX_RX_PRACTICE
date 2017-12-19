import { createSelector } from 'reselect'

const getFilter = (state) => state.todoReducer.filter;
const getTodoList = (state) => state.todoReducer.todolist;

export const selectByFilter = createSelector(
    [ getFilter, getTodoList ],
        (filter, todolist) => {
            switch (filter) {
                case 'ALL':
                return todolist;
                case 'COMPLETED':
                return todolist.filter(elm => elm.completed);
                case 'ACTIVE':
                return todolist.filter(elm => !elm.completed);
                default: return todolist;
            }
    }
)