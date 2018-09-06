import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./Saga";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import todoReducers from "./Reducers";
import TodoList from "./Components/TodoList";
import TodoItem from "./Components/TodoItem";
import "./css/app.css";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(todoReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

const AppRoutes = () => {
	return (
		<div>
			<Route exact path="/" render={() => <Redirect to="/todos" />} />
			<Route path="/todos" component={TodoList} />
			<Route path={`/todo/:topicId`} component={TodoItem} />
		</div>
	);
};

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<AppRoutes />
		</Provider>
	</BrowserRouter>,
	document.getElementById("root")
);