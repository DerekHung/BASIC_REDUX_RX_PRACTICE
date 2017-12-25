import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount, render, configure } from 'enzyme';
import TodoWrapper from '../index';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
// import store from '../../../store';
import { addNewTodo, completeItem, removeItem } from '../../../actions/todo';
import configureStore from 'redux-mock-store'


configure({ adapter: new Adapter() });

jest.mock('../../../actions/todo');

describe('render todo container', () => {
    const middlewares = []
    const mockStore = configureStore(middlewares)
    let store = {};
    
    beforeEach(() => {
        store = mockStore({ 
            todoReducer: {todolist: [
                {
                    key: 0,
                    value: 'testdefault',
                    onEdit: false,
                    completed: false
                },
                {
                    key: 1,
                    value: 'testEdit',
                    onEdit: true,
                    completed: false
                },
                {
                    key: 2,
                    value: 'testcomplete',
                    onEdit: false,
                    completed: true
                },
            ],
            count: 0,
            filter: 'ALL'}});
    });
    

    it('should match the snapshot', () => {
        const tree = renderer.create(<Provider store={store}><TodoWrapper /></Provider>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    
    it('should typeing text & when type enter should call the action，clear the input value', () => {
        const wrapper = shallow(<TodoWrapper store={store} />).dive();
        const inputWrapper = wrapper.find('.main-input');
        inputWrapper.simulate('keyUp', {target:{value: '123'}, keyCode: 13});
        expect(addNewTodo).toHaveBeenCalledWith("123", {"keyCode": 13, "target": {"value": ""}}); 
    });

    it('should send the complete action when you click complete icon', () => {
        const wrapper = shallow(<TodoWrapper store={store} />).dive();
        const component = wrapper.find('.icono-check');
        component.simulate('click');
        expect(completeItem).toHaveBeenCalledWith(0);
    });

    it('should send the delete action when you click delete icon', () => {
        const wrapper = shallow(<TodoWrapper store={store} />).dive();
        const component = wrapper.find('.icono-forbidden');
        component.simulate('click');
        expect(removeItem).toHaveBeenCalledWith(0);
    });
    
});
