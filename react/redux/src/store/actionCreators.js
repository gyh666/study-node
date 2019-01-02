import { CHANGE_INPUT_VALUE, ADD_TODO_ITEM, DELETE_TODO_ITEM, INIT_DATA_ACTION } from './actionTypes'
import axios from 'axios';

export const getInputValueAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
});

export const getAddItemAction = () => ({
  type: ADD_TODO_ITEM
});

export const getDeleteItemAction = (index) => ({
  type: DELETE_TODO_ITEM,
  index
});

export const getInitData = (data) => ({
  type: INIT_DATA_ACTION,
  data
});

export const getTodoList = () => {
  return (dispatch) => {
    axios.get('/api/todolist')
			.then((res) => {
        const data = res.data;
        const action = getInitData(data);
        dispatch(action)
			})
			.catch((err) => {
        console.log(err)
			});
  }
}