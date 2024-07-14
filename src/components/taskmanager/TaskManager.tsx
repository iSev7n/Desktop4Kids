// components/taskmanager/TaskManager.tsx
import React from "react";
import styles from "./TaskManager.module.css"; // Create a corresponding CSS file if needed

const TaskManager: React.FC = () => {
  return (
    <div className={styles.taskManagerContainer}>
      <h1>Task Manager</h1>
      <p>List of running apps will be displayed here.</p>
      {/* Implement the logic to display running apps */}
    </div>
  );
};

export default TaskManager;