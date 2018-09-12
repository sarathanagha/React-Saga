//Import the Todo API

// These are the action type constants. Ordered by CRUD order.
// There is a pattern of Action, Action_Success, Action_Error action types for the Async actions.

//Create
export const CREATE_TODO = "CREATE_TODO";

//Read
export const GET_TODOS = "GET_TODOS";
export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
export const GET_TODO = "GET_TODO";

//Update
export const UPDATE_TODO = "UPDATE_TODO";

//Complete
export const COMPLETE_TODO = "COMPLETE_TODO";

//Delete
export const DELETE_TODO = "DELETE_TODO";

// New Todo Value
export const NEW_TODO_ITEM = "NEW_TODO_ITEM";

export const UPDATE_TODO_VALUES = 'UPDATE_TODO_VALUES';

export const CANCEL_TODO = 'CANCEL_TODO';