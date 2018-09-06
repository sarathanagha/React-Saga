import { combineReducers } from "redux";
import TodoListReducer from "./todoReducer";
const rootReducer = combineReducers({
	todos: TodoListReducer
});

export default rootReducer;