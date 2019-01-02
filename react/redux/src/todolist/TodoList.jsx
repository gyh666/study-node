import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import TodoItem from './TodoItem.jsx';
import TodoListUI from './TodoListUI.jsx';

import store from '../store/index';
// import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM } from '../store/actionTypes';
import { getInputValueAction, getAddItemAction, getDeleteItemAction, /* getInitData, */ getTodoList } from '../store/actionCreators';

import 'antd/dist/antd.css';
import '../css/style.css';

export default class TodoList extends Component {
	constructor() {
		super();

		// this.state = {
		// 	inputValue: '',
		// 	list: []
		// };

		this.state = store.getState();

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleButtonSubmit = this.handleButtonSubmit.bind(this);
		this.handleStoreChange = this.handleStoreChange.bind(this);
		this.handleDelete = this.handleDelete.bind(this);

		store.subscribe(this.handleStoreChange);
	}
	render() {
		return (
			<TodoListUI
				inputValue={this.state.inputValue}
				list={this.state.list}
				handleInputChange={this.handleInputChange}
				handleButtonSubmit={this.handleButtonSubmit}
				handleDelete={this.handleDelete}
			/>
		);
	}

	// getItem() {
	// 	return this.state.list.map((item, index) => {
	// 		return (
	// 			<li key={index}>
	// 				<TodoItem content={item} index={index} deleteItem={this.handleListDelete} />
	// 			</li>
	// 		);
	// 	});
	// }

	componentDidMount() {
		// this.alertDOM = ReactDOM.findDOMNode(this.refs.alert);
		// console.log(this.alertDOM);

		/* axios.get('/api/todolist')
			.then((res) => {
				// this.setState(() => ({
				// 	list: [ ...res.data ]
				// }));
				const action = getInitData(res.data);
				store.dispatch(action)
			})
			.catch((err) => {
				// this.setState(() => ({
				// 	list: [ '哈哈哈', '嘿嘿嘿' ]
				// }));
			}); */

			const action = getTodoList();
			store.dispatch(action);
	}

	handleInputChange(e) {
		const value = e.target.value;
		// this.setState(() => ({
		// 	inputValue: value
		// }));
		// const action = {
		// 	type: CHANGE_INPUT_VALUE,
		// 	value: value
		// };
		const action = getInputValueAction(value);
		store.dispatch(action);
	}

	handleButtonSubmit() {
		// this.setState((prevState) => ({
		// 	list: [ ...prevState.list, prevState.inputValue ],
		// 	inputValue: ''
		// }));
		// const action = {
		// 	type: ADD_TODO_ITEM
		// };
		if (this.state.inputValue) {
			// this.alertDOM.style.display = 'none';
			const action = getAddItemAction();
			store.dispatch(action);
		} else {
			// this.alertDOM.style.display = 'block';
			return false;
		}
	}

	// handleListDelete(index) {
	// 	this.setState((prevState) => {
	// 		const list = [ ...prevState.list ];
	// 		list.splice(index, 1);
	// 		return { list };
	// 	});
	// }

	handleDelete(index) {
		// console.log(index)
		// const action = {
		// 	type: DELETE_TODO_ITEM,
		// 	index
		// }
		const action = getDeleteItemAction(index);
		store.dispatch(action);
	}

	handleStoreChange() {
		// console.log(store.getState())
		this.setState(store.getState());
	}
}
