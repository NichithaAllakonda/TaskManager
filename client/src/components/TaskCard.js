function TaskCard({ task, updateStatus, role }) {
  return (
    <div className="card">
      <h3>{task.title}</h3>

      <p>{task.description}</p>

      <p>
        Status:
        <span
          className={
            task.status === "Completed"
              ? "completed"
              : "pending"
          }
        >
          {" "}
          {task.status}
        </span>
      </p>

      {role === "Admin" && task.status !== "Completed" && (
        <button onClick={() => updateStatus(task._id)}>
          Mark Completed
        </button>
      )}
    </div>
  );
}

export default TaskCard;