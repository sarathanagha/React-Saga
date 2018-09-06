import { put, takeLatest, all } from "redux-saga/effects";
import fetch from "isomorphic-fetch";
import { setTodoList, setTodoItem } from "../Actions";
import {
	GET_TODOS,
	CREATE_TODO,
	GET_TODOS_SUCCESS,
	GET_TODO,
	COMPLETE_TODO,
	DELETE_TODO,
	UPDATE_TODO
} from "../constants/todoConstants";

const API_URL = "https://practiceapi.devmountain.com/api/tasks";

function* fetchTodos(task) {
	const todos = yield fetch(API_URL).then(response => response.json());
	if (task.id == undefined) {
		yield put(setTodoList(todos));
	} else {
		const todo = todos.find(todo => todo.id == task.id);
		yield put(setTodoItem(todo));
	}
}

function* createTodo(task) {
	const tasks = yield fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ title: task.title })
	}).then(response => response.json());
	yield put(setTodoList(tasks));
}

function* completeTodo(task) {
	const tasks = yield fetch(`${API_URL}/${task.id}`, {
		method: "PUT"
	}).then(response => response.json());
	if (task.shouldNavigate) yield task.history.push("/");
	else yield put(setTodoList(tasks));
}

function* updateTodo(task) {
	const { todo, history } = task.payload;
	const tasks = yield fetch(`${API_URL}/${todo.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(todo)
	}).then(response => response.json());
	yield history.push("/");
}

function* deleteTodo(task) {
	const tasks = yield fetch(`${API_URL}/${task.id}`, {
		method: "DELETE"
	}).then(response => response.json());
	if (task.shouldNavigate) yield task.history.push("/");
	else yield put(setTodoList(tasks));
}

function* actionWatcher() {
	yield takeLatest(GET_TODOS, fetchTodos);
	yield takeLatest(CREATE_TODO, createTodo);
	yield takeLatest(COMPLETE_TODO, completeTodo);
	yield takeLatest(UPDATE_TODO, updateTodo);
	yield takeLatest(DELETE_TODO, deleteTodo);
}

export default function* rootSaga() {
	yield all([actionWatcher()]);
}