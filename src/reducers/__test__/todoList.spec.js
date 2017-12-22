import * as actions from '../../actions/todo';
import reducer from '../todoList';

describe('test todoReducer', () => {
    
    const initState = {
        todolist: [],
        count: 0,
        filter: 'ALL'
    };
    let mockStoreData;
    
    beforeEach(() => {
        mockStoreData = {
            todolist:[
                {
                    key: 0,
                    value: 'test1',
                    onEdit: false,
                    completed: true
                },
                {
                    key: 1,
                    value: 'test2',
                    onEdit: true,
                    completed: false
                }
            ],
            count: 2,
            filter: 'ALL'
        }  
    });
    

    it('should return initialState', () => {
        expect(reducer(undefined, {})).toEqual(initState);
    });
    
    it('test ADD_NEW_TODO...should add the item', () => {
        const action = {
            type: actions.ADD_NEW_TODO,
            value: 'testing'
        }
        const expectData = {
            key:new Date().getTime() + 0, 
            value: action.value,
            onEdit: false,
            completed: false
        }

        expect(reducer(undefined, action).todolist[0]).toEqual(expectData);
    });

    it('test OPEN_EDIT...should change the onEdit', () => {
        const action = {
            type: actions.OPEN_EDIT,
            key: 0
        }

        expect(reducer(mockStoreData, action).todolist.find( element => element.key === action.key ).onEdit).toBeTruthy();
    });
    
    it('test UPDATE_ITEM...should change the value & set onEdit to flase', () => {
        const action = {
            type: actions.UPDATE_ITEM,
            value: 'hahaha',
            key: 0
        }
        expect(reducer(mockStoreData, action).todolist.find( element => element.key === action.key ).onEdit).toBeFalsy();
        expect(reducer(mockStoreData, action).todolist.find( element => element.key === action.key ).value).toEqual('hahaha');
    });

    it('test COMPLETE_ITEM...should make elm complete', () => {
        const action = {
            type: actions.COMPLETE_ITEM,
            key: 0
        }

        expect(reducer(mockStoreData, action).todolist.find( element => element.key === action.key ).completed).toBeTruthy();
    });

    it('test REMOVE_ITEM...should remove the item from todoList', () => {
        const action = {
            type: actions.REMOVE_ITEM,
            key: 0
        }

        expect(reducer(mockStoreData, action).todolist.some( element => element.key === action.key )).toBeFalsy();
    });

    it('test CHANGE_FILTER...should change the filter', () => {
        const action = {
            type: actions.CHANGE_FILTER,
            filter: 'active'
        }

        expect(reducer(mockStoreData, action).filter).toEqual(action.filter);
    });
});
