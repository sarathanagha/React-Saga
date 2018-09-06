import {
	NEW_TODO_ITEM,
	GET_TODOS,
	CREATE_TODO,
	GET_TODOS_SUCCESS,
	GET_TODO,
	COMPLETE_TODO,
	DELETE_TODO,
	UPDATE_TODO
} from "../constants/todoConstants";

const getTodoList = id => ({ type: GET_TODOS, id });
const createTodo = title => ({ type: CREATE_TODO, title }); //"CREATE_TODO"
const setTodoList = todos => ({ type: GET_TODOS_SUCCESS, list: todos }); //"TODO_LIST"
const setTodoItem = todo => ({ type: GET_TODO, todo });
const completeTodo = (id, shouldNavigate, history) => ({
	type: COMPLETE_TODO,
	id,
	shouldNavigate,
	history
});
const deleteTodo = (id, shouldNavigate, history) => ({
	type: DELETE_TODO,
	id,
	shouldNavigate,
	history
});
const updateTodo = (todo, history) => ({
	type: UPDATE_TODO,
	payload: { todo, history }
});

const newTodoItem = value => ({
	type: NEW_TODO_ITEM,
	newTodo: value
});

export {
	newTodoItem,
	getTodoList,
	createTodo,
	setTodoList,
	setTodoItem,
	completeTodo,
	deleteTodo,
	updateTodo
};