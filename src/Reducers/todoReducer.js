import {
    GET_TODOS_SUCCESS,
    GET_TODO,
    NEW_TODO_ITEM
} from "../constants/todoConstants";

const initialState = {
    list: [],
    todo: {},
    newTodo: ""
};

const todo = (state = initialState, action) => {
    switch (action.type) {
        case GET_TODOS_SUCCESS: {
            return {
                ...state,
                list: action.list,
                newTodo: ""
            };
        }
        case GET_TODO: {
            return {
                ...state,
                todo: action.todo
            };
        }
        case NEW_TODO_ITEM: {
            return {
                ...state,
                newTodo: action.newTodo
            };
        }
        default: {
            return state;
        }
    }
};

export default todo;