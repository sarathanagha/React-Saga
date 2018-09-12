import {
    GET_TODOS_SUCCESS,
    GET_TODO,
    NEW_TODO_ITEM,
    UPDATE_TODO_VALUES,
    CANCEL_TODO
} from "../constants/todoConstants";

const initialState = {
    list: [],
    todo: {},
    newTodo: "",
    prevTodo: {}
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
                todo: action.todo,
                prevTodo: action.todo
            };
        }
        case NEW_TODO_ITEM: {
            return {
                ...state,
                newTodo: action.newTodo
            };
        }
        case UPDATE_TODO_VALUES: {
            return {
                ...state,
                todo: { ...state.todo, [action.field]: action.value }
            };
        }
        case CANCEL_TODO: {
            return {
                ...state,
                todo: state.prevTodo
            }
        }
        default: {
            return state;
        }
    }
};

export default todo;