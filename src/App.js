import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home } from "./components/Pages/Home";
import { Task } from "./components/Pages/Task";
import { User } from "./components/Pages/User";
import { Contact } from "./components/Pages/Contact";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import axios from 'axios';
// import AddTodo from './components/AddTodo';

function Todo({ todo, index, completeTodo, removeTodo }) {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      {todo.text}

      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
        <button onClick={() => removeTodo(index)}>Delete</button>
      </div>
    </div>
  );
}



function TodoForm({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}


export default function App() {
  const getInitialState = () => {
    const value = "Dropdown";
    return value;
  };

  const [value, setValue] = useState(getInitialState);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const [todos, setTodos] = useState([
    {
      text: "delectus aut autem",
      isCompleted: false
    },
    {
      text: "quis ut nam facilis et officia qui",
      isCompleted: false
    },
    {
      text: "laboriosam mollitia et enim quasi adipisci quia provident illum",
      isCompleted: false
    }
  ]);

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }



  return (
    <>
      <Router>
        <NavBar />

        <div className="pages">
          <Switch>
            <Route exact path="/" component={Home} >
              <div className="home">
                <select value={value} onChange={handleChange}>
                  <option>Dropdown</option>
                  <option value="Orange">Orange</option>
                  <option value="Radish">Radish</option>
                  <option value="Cherry">Cherry</option>
                </select>
                <p>{`You selected ${value}`}</p>
              </div> </Route>
            <Route path="/Task" component={Task}>
              <div className="todo-list">
                {todos.map((todo, index) => (
                  <Todo
                    key={index}
                    index={index}
                    todo={todo}
                    completeTodo={completeTodo}
                    removeTodo={removeTodo}
                  />
                ))}
                <p>{`Add Task & Enter`}</p>
                <TodoForm addTodo={addTodo} />
              </div>
            </Route>
            <Route path="/User" component={User}>
              <div className="Login">
                <Form onSubmit={handleSubmit}>
                  <Form.Group size="lg" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      autoFocus
                      type="string"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Login
                  </Button>
                  <Button block size="lg" type="submit" disabled={!validateForm()}>
                    Reset Password
                  </Button>
                </Form>
              </div>
            </Route>
            <Route path="/Contact" component={Contact} />
          </Switch>
        </div>


      </Router>
    </>
  );
}





