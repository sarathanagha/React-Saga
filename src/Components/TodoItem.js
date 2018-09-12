import React, { Component } from "react";
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import { getTodoList, updateTodo, completeTodo, deleteTodo, handleTodoUpdate, cancelTodo } from "../Actions";
import TextField from '@material-ui/core/TextField';

export class TodoItem extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.getTodoList(this.props.match.params.topicId);
  }

  handleChange(e, field) {
    this.props.handleTodoUpdate(field, e.target.value)
  }

  completeTodo() {
    const { todo, history, completeTodo } = this.props
    completeTodo(todo.id, true, history);
  }
  updateTodo() {
    const { todo, updateTodo, history } = this.props;
    if (todo.title && todo.title != "")
      updateTodo(todo, history);
    else alert("Please enter title...");
  }
  delete() {
    const { deleteTodo, todo, history } = this.props
    deleteTodo(todo.id, true, history);
  }
  cancel() {
    this.props.cancelTodo();
  }
  navigate() {
    this.props.history.push("/");
  }
  render() {
    const { history, todo } = this.props;
    return (
      <form autoComplete="off">
        <p onClick={() => this.navigate()}>Back to Search Results </p>
        <TextField
          id="task"
          label="Task"
          value={todo.title}
          onChange={e => this.handleChange(e, "title")}
          margin="normal"
        /> {" "}
        <Button disabled={todo.completed} variant="raised" color="default" onClick={() => this.completeTodo()}>
          Complete
       </Button>

        <br />
        <TextField
          id="description"
          label="Description"
          value={todo.description}
          onChange={e => this.handleChange(e, "description")}
          margin="normal"
        /><br />
        <Button variant="raised" color="primary" onClick={() => this.updateTodo()}>
          Save
       </Button> {" "}
        <Button variant="raised" color="default" onClick={() => this.cancel()}>
          Cancel
       </Button>{" "}
        <Button variant="raised" color="secondary" onClick={() => this.delete()}>
          Delete
       </Button>

      </form>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    todo: state.todos.todo
  };
}

const mapDispatchToProps = {
  getTodoList,
  updateTodo,
  completeTodo,
  deleteTodo,
  handleTodoUpdate,
  cancelTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem);