import React, { Component } from "react";
import { connect } from "react-redux";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
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
        <TextField
          id="name"
          label="Enter a todo Item"
          value={this.props.newTodo}
          onChange={e => this.handleChange(e)}
          margin="normal"
          autoComplete="off"
        /> <br></br>
        <Button variant="raised" color="primary" onClick={() => {
          this.addTodo();
        }}>
          Add a new todo
        </Button>
        <List style={{ width: '50%' }}>
          {
            todos.map((todo, index) => {
              return (<div key={index}><ListItem button>
                <ListItemText style={{ textAlign: 'left', width: '60%' }}>
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
                </ListItemText>
                <ListItemText style={{ textAlign: 'center', width: '30%' }}>
                  <Button variant="raised" color="primary" disabled={todo.completed} onClick={() => {
                    this.props.completeTodo(todo.id);
                  }}>
                    Complete
                    </Button>
                </ListItemText>
                <ListItemText style={{ textAlign: 'center', width: '10%' }}>
                  <IconButton aria-label="Delete" onClick={() => {
                    this.props.deleteTodo(todo.id);
                  }}>
                    <CloseIcon />
                  </IconButton>
                </ListItemText>
              </ListItem><Divider /></div>)
            })
          }
        </List>
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