import React, { Component } from "react";
import "./Todo.css";
import uuidv4 from "uuid/v4";
import List from "../List/List";

export default class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      task: "",
      items: [],
    };
  }

  componentDidMount() {
    //puede ser localStorage.getItem("tasks") o directamente localStorage.tasks
    localStorage.getItem("tasks") &&
      this.setState({
        items: JSON.parse(localStorage.tasks),
      });
  }

  componentDidUpdate() {
    localStorage.setItem("tasks", JSON.stringify(this.state.items));
  }

  handleChange = (e) => {
    this.setState({ task: e.target.value });
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const date = new Date();

    if (this.state.task !== "") {
      this.setState({
        task: "",
        items: [
          ...this.state.items,
          {
            id: uuidv4(),
            task: this.state.task,
            date: `${date.getDate()}/${
              date.getMonth() + 1
            }/${date.getFullYear()}`,
            completed: false,
          },
        ],
      });
    }
  };

  markCompleted = (id) => {
    this.setState({
      items: this.state.items.map((task) => {
        if (task.id === id) {
          task.completed = !task.completed;
        }
        return task;
      }),
    });
  };

  removeTask = (id) => {
    this.setState({
      items: this.state.items.filter((task) => task.id !== id),
    });
  };

  render() {
    return (
      <div>
        <header>
          <h1>TAREAS</h1>
        </header>
        <main>
          <form onSubmit={this.handleOnSubmit}>
            <h3>Nueva Tarea:</h3>
            <div className="input-container">
              <input
                value={this.state.task}
                onChange={this.handleChange}
                className="input"
              />
              <button className="btn">
                <i className="fas fa-angle-right fa-lg"></i>
              </button>
            </div>
          </form>
          <List
            items={this.state.items}
            markCompleted={this.markCompleted}
            removeTask={this.removeTask}
          />
        </main>
        <footer>
          <a
            href="https://github.com/valfer1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Valeria F.
          </a>{" "}
          2019
        </footer>
      </div>
    );
  }
}
