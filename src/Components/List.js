import React from "react";
import "./List.css";

const List = (props) => {
  return (
    <ul>
      {props.items.length === 0 && <h2>No hay tareas.</h2>}

      {props.items.map((item, key) => {
        return (
          <li key={key} className={item.completed ? "done" : undefined}>
            <span className="date">{item.date}</span>
            {item.task}
            <div>
              <button
                className="v"
                onClick={() => props.markCompleted(item.id)}
              >
                <i className="far fa-check-circle"></i>
              </button>
              <button className="x" onClick={() => props.removeTask(item.id)}>
                <i className="far fa-times-circle"></i>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
