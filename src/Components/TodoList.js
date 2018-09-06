import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  getTodoList,
  createTodo,
  completeTodo,
  deleteTodo,
  newTodoItem
} from "../Actions";

export class TodoList extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getTodoList();
  }

  handleChange(e) {
    this.props.newTodoItem(e.target.value);
  }

  addTodo() {
    this.props.newTodo
      ? this.props.createTodo(this.props.newTodo)
      : alert("Please enter a todo item!");
  }

  render() {
    const { todos = [], history } = this.props;
    return (
      <div className="todo-container">
        <h1>TO-DO:</h1>
        <input
          className="new-todo"
          placeholder="Enter a todo Item"
          value={this.props.newTodo}
          onChange={e => this.handleChange(e)}
          autoFocus={true}
        />
        <br />
        <br />
        <button
          onClick={() => {
            this.addTodo();
          }}
        >
          {" "}
          Add a new todo{" "}
        </button>
        <table>
          <tbody>
            {todos.map((todo, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link
                      to={`/todo/${todo.id}`}
                      style={{
                        textDecoration: todo.completed
                          ? "line-through underline"
                          : "underline"
                      }}
                    >
                      {todo.title}
                    </Link>
                  </td>
                  <td>
                    <button
                      disabled={todo.completed}
                      onClick={() => {
                        this.props.completeTodo(todo.id);
                      }}
                    >
                      Complete
                    </button>
                  </td>
                  <td>
                    <span
                      onClick={() => {
                        this.props.deleteTodo(todo.id);
                      }}
                    >
                      X
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    todos: state.todos.list,
    newTodo: state.todos.newTodo
  };
}

const mapDispatchToProps = {
  getTodoList,
  createTodo,
  completeTodo,
  deleteTodo,
  newTodoItem
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);