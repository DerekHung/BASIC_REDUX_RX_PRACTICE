import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/input';
import { 
    openEdit,
    addNewTodo,
    updateItem,
    completeItem,
    removeItem,
    changeFilter
} from '../../actions/todo';
import { selectByFilter } from '../../reducers/selectors';
import './style.css';

class TodoWrapper extends PureComponent {
    _handleKeyPress(cb, ...args) {
        const e = args[args.length - 1];
        if( e.keyCode === 13 ){
            cb(e.target.value, ...args);
            e.target.value = '';
        } 
    }
    _renderElement(list){
        const { openEdit, updateItem, completeItem, removeItem } = this.props;
        return list.map((data, index) => {
            if( data.completed ) return <li key={data.key}><del>{data.value}</del></li>
            if( data.onEdit ) return <li  key={data.key}><input className="inner-input" defaultValue={data.value} onKeyUp={this._handleKeyPress.bind(this, updateItem, data.key)}/></li>
            return (
                <li key={data.key}>
                    <i className="icono-check" onClick={completeItem.bind(this, data.key)} />
                    <span className="content">{data.value}</span>
                    <span className="lazy">
                        <i className="icono-dropper" onClick={openEdit.bind(this, data.key)} />
                        <i className="icono-forbidden" onClick={removeItem.bind(this, data.key)} />
                    </span>
                </li>
            );
        })
    }
    render(){
        const { todoList, addNewTodo, changeFilter } = this.props;
        return(
            <div className="container">
                <Input
                    type="text"
                    placeHolder="請輸入文字..."
                    className="main-input"
                    onKeyUp={this._handleKeyPress.bind(this, addNewTodo)}
                />
                <div className="filter-box">
                    <span onClick={changeFilter.bind(this, 'ALL')}>ALL</span>
                    <span onClick={changeFilter.bind(this, 'COMPLETED')}>完成</span>
                    <span onClick={changeFilter.bind(this, 'ACTIVE')}>未完成</span>
                </div>
                <ul className="list">{ this._renderElement(todoList) }</ul>
            </div>
        );
    }
}

const mapStateToPorps = (state) => {
    return {
        todoList: selectByFilter(state)
    }
}

export default connect(mapStateToPorps,{openEdit,addNewTodo,updateItem,completeItem,removeItem,changeFilter})(TodoWrapper);