import React, { useEffect, useState, useCallback } from "react";
import { auth, db } from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const fetchTasks = useCallback(() => {
    const tasksRef = collection(db, "tasks", user.uid, "userTasks");
    const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
      const taskData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(taskData);
    });

    return unsubscribe;
  }, [user.uid]);

  useEffect(() => {
    const unsubscribe = fetchTasks();
    return () => unsubscribe();
  }, [fetchTasks]);

  const addTask = async () => {
    if (!task || !date || !description) return alert("Fill all fields");
    await addDoc(collection(db, "tasks", user.uid, "userTasks"), {
      task,
      date,
      description,
      completed: false,
    });
    setTask("");
    setDate("");
    setDescription("");
  };

  const deleteTask = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;
    const taskRef = doc(db, "tasks", user.uid, "userTasks", taskId);
    await deleteDoc(taskRef);
  };

  const toggleCompleted = async (taskId, currentStatus) => {
    const taskRef = doc(db, "tasks", user.uid, "userTasks", taskId);
    await updateDoc(taskRef, {
      completed: !currentStatus,
    });
  };

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };


  return (
    <div
      className="home-container"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo">FocusFlow</div>
        </div>

        <div
          className="navbar-toggle"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          ☰
        </div>

        <div className={`navbar-right ${showMenu ? "active" : ""}`}>
          <span className="welcome-text">Welcome, {user.displayName}</span>
          <img src={user.photoURL} alt="Profile" className="profile-pic" />
          
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

    
      <div className="task-input">
        <label><strong>Add Your Task</strong></label>
        <input
          type="text"
          placeholder="Enter your task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
     <input
  type="datetime-local"
  placeholder="Date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>


        <textarea
          placeholder="Write a short description..."
          value={description}
         
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      
      <h3 style={{textAlign:"center"}}>Your Tasks</h3>
      <div className="task-list">
        {tasks.map((t) => (
          <div key={t.id} className="task-card">
            <p><strong>{t.task}</strong></p>
            <p>Date: {new Date(t.date).toLocaleString()}</p>

            <p className="description">Description: {t.description}</p>
            <p>Status: {t.completed ? "✅ Completed" : "❌ Not Completed"}</p>
<div className="task-actions">
            <button
              className="toggle-btn"
              onClick={() => toggleCompleted(t.id, t.completed)}
            >
              {t.completed ? "Mark as Incomplete" : "Mark as Completed"}
            </button>

            <button className="delete-btn" onClick={() => deleteTask(t.id)}>
              Delete
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
