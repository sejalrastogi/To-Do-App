import React from "react";

function TaskList({ tasks, deleteTask, updateStatus }) {
  return (
    <ul style={styles.list}>
      {tasks.map((task) => (
        <li key={task.id} style={styles.listItem}>
          <span>
            <strong>{task.title}</strong> —{" "}
            <em style={{ color: task.status === "done" ? "green" : "orange" }}>
              {task.status}
            </em>
          </span>
          <div>
          {task.status !== "done" && (
              <button
                onClick={() => updateStatus(task.id, "done")}
                style={styles.statusBtn}
              >
                Mark Done
              </button>
            )}
            <button onClick={() => deleteTask(task.id)} style={styles.deleteBtn}>
              ❌
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

// const toggleStatus = (status) => (status === "done" ? "pending" : "done");

const styles = {
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#fff",
    marginBottom: "5px",
    borderRadius: "5px",
  },
  deleteBtn: {
    marginLeft: "10px",
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "16px",
  },
  statusBtn: {
    border: "none",
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default TaskList;
