import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodoList, updateTodo, completeTodo, deleteTodo } from "../Actions";

export class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: {},
      prevState: {}
    };
  }
  componentDidMount() {
    this.props.getTodoList(this.props.match.params.topicId);
  }

  componentWillReceiveProps(next) {
    this.setState({
      todo: next.todo,
      prevState: next.todo
    });
  }

  handleChange(e, field) {
    const todo = { ...this.state.todo };
    todo[field] = e.target.value;
    this.setState({
      todo
    });
  }
  completeTodo() {
    this.props.completeTodo(this.state.todo.id, true, this.props.history);
  }
  updateTodo() {
    const { todo } = this.state;
    if (todo.title && todo.title != "")
      this.props.updateTodo(this.state.todo, this.props.history);
    else alert("Please enter title...");
  }
  delete() {
    this.props.deleteTodo(this.state.todo.id, true, this.props.history);
  }
  cancel() {
    this.setState({ todo: this.state.prevState });
  }
  navigate() {
    this.props.history.push("/");
  }
  render() {
    const styles = {};
    if (this.state.todo.completed) {
      styles.disabled = true;
    }
    const { history } = this.props;
    return (
      <div>
        <p onClick={() => this.navigate()}>Back to Search Results </p>
        Task:{" "}
        <input
          type="text"
          value={this.state.todo.title}
          onChange={e => this.handleChange(e, "title")}
        />
        <button {...styles} onClick={() => this.completeTodo()}>
          Complete
        </button>{" "}
        <br />
        Description:{" "}
        <input
          type="text"
          onChange={e => this.handleChange(e, "description")}
          value={this.state.todo.description}
        />{" "}
        <br />
        <button
          onClick={e => {
            this.updateTodo();
          }}
        >
          Save
        </button>
        <button
          onClick={e => {
            this.cancel();
          }}
        >
          Cancel
        </button>
        <button
          onClick={e => {
            this.delete();
          }}
        >
          Delete
        </button>
      </div>
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
  deleteTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoItem);