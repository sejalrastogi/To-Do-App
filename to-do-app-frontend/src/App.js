import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./TaskList";

const API_BASE_URL = "http://localhost:8080/task"; // adjust if needed

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get(API_BASE_URL);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTaskText.trim()) return;
    const newTask = {
      id: Date.now(),
      title: newTaskText,
      status: "pending",
    };
    try {
      await axios.post(API_BASE_URL, newTask);
      setNewTaskText("");
      fetchTasks();
    } catch (err) {
      alert(err.response?.data || "Error adding task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      alert("Error deleting task.");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/${id}/${newStatus}`);
      fetchTasks();
    } catch (err) {
      alert("Error updating status.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>📝 To-Do App</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Enter task"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          style={styles.input}
        />
        <button onClick={addTask} style={styles.button}>
          Add
        </button>
      </div>
      <TaskList tasks={tasks} deleteTask={deleteTask} updateStatus={updateStatus} />
    </div>
  );
}

const styles = {
  container: {
    width: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "sans-serif",
    backgroundColor: "#f4f4f4",
  },
  inputContainer: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "8px",
  },
  button: {
    padding: "8px 12px",
  },
};

export default App;
