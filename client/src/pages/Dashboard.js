import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {

  const API =
    "https://taskmanager-production-44f4.up.railway.app";

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskProject, setTaskProject] = useState("");

  const [openedProject, setOpenedProject] = useState(null);

  const user =
    JSON.parse(localStorage.getItem("user"));

  const token =
    localStorage.getItem("token");

  useEffect(() => {

    fetchProjects();
    fetchTasks();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ================= FETCH PROJECTS ================= */

  const fetchProjects = async () => {

    try {

      const res = await axios.get(
        `${API}/api/projects`,
        {
          headers: {
            token: token
          }
        }
      );

      setProjects(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  /* ================= FETCH TASKS ================= */

  const fetchTasks = async () => {

    try {

      const res = await axios.get(
        `${API}/api/tasks`,
        {
          headers: {
            token: token
          }
        }
      );

      setTasks(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  /* ================= CREATE PROJECT ================= */

  const createProject = async () => {

    if (!title || !description) {

      alert("Please Enter Project Details");

      return;

    }

    try {

      await axios.post(
        `${API}/api/projects`,
        {
          title,
          description
        },
        {
          headers: {
            token: token
          }
        }
      );

      setTitle("");
      setDescription("");

      fetchProjects();

      alert("Project Created Successfully");

    } catch (err) {

      console.log(err);

    }

  };

  /* ================= DELETE PROJECT ================= */

  const deleteProject = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this project?"
      );

    if (!confirmDelete) {

      return;

    }

    try {

      await axios.delete(
        `${API}/api/projects/${id}`,
        {
          headers: {
            token: token
          }
        }
      );

      fetchProjects();

      setOpenedProject(null);

      alert("Project Deleted Successfully");

    } catch (err) {

      console.log(err);

    }

  };

  /* ================= CREATE TASK ================= */

  const createTask = async () => {

    if (
      !taskTitle ||
      !taskDescription ||
      !taskProject
    ) {

      alert("Please Enter Task Details");

      return;

    }

    try {

      await axios.post(
        `${API}/api/tasks`,
        {
          title: taskTitle,
          description: taskDescription,
          project: taskProject,
          status: "Pending"
        },
        {
          headers: {
            token: token
          }
        }
      );

      setTaskTitle("");
      setTaskDescription("");
      setTaskProject("");

      fetchTasks();

      alert("Task Created Successfully");

    } catch (err) {

      console.log(err);

    }

  };

  /* ================= UPDATE TASK STATUS ================= */

  const updateStatus = async (id) => {

    try {

      await axios.put(
        `${API}/api/tasks/${id}`,
        {
          status: "Completed"
        },
        {
          headers: {
            token: token
          }
        }
      );

      fetchTasks();

      alert("Task Completed Successfully");

    } catch (err) {

      console.log(err);

    }

  };

  /* ================= DELETE TASK ================= */

  const deleteTask = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this task?"
      );

    if (!confirmDelete) {

      return;

    }

    try {

      await axios.delete(
        `${API}/api/tasks/${id}`,
        {
          headers: {
            token: token
          }
        }
      );

      fetchTasks();

      alert("Task Deleted Successfully");

    } catch (err) {

      console.log(err);

    }

  };

  /* ================= LOGOUT ================= */

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";

  };

  /* ================= COUNTS ================= */

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "Completed"
    ).length;

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status === "Pending"
    ).length;

  /* ================= FILTER TASKS ================= */

  const filteredTasks = tasks.filter((task) => {

    if (!openedProject) return false;

    return (
      task.project?._id === openedProject ||
      task.project === openedProject ||
      task.projectId === openedProject
    );

  });

  return (

    <div className="dashboard">

      {/* NAVBAR */}

      <div className="navbar">

        <h1>Team Task Manager</h1>

        <div>

          <span className="role">

            {user?.role}

          </span>

          <button
            className="logout-btn"
            onClick={logout}
          >

            Logout

          </button>

        </div>

      </div>

      {/* STATS */}

      <div className="stats">

        <div className="stat-card">

          <h2>{projects.length}</h2>

          <p>Total Projects</p>

        </div>

        <div className="stat-card">

          <h2>{pendingTasks}</h2>

          <p>Pending Tasks</p>

        </div>

        <div className="stat-card">

          <h2>{completedTasks}</h2>

          <p>Completed Tasks</p>

        </div>

      </div>

      {/* ADMIN SECTION */}

      {
        user?.role?.toLowerCase() === "admin" && (

          <>

            {/* CREATE PROJECT */}

            <div className="form-section">

              <h2>Create Project</h2>

              <input
                type="text"
                placeholder="Project Title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Project Description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
              />

              <button onClick={createProject}>

                Create Project

              </button>

            </div>

            {/* CREATE TASK */}

            <div className="form-section">

              <h2>Create Task</h2>

              <input
                type="text"
                placeholder="Task Title"
                value={taskTitle}
                onChange={(e) =>
                  setTaskTitle(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Task Description"
                value={taskDescription}
                onChange={(e) =>
                  setTaskDescription(e.target.value)
                }
              />

              <select
                value={taskProject}
                onChange={(e) =>
                  setTaskProject(e.target.value)
                }
              >

                <option value="">
                  Select Project
                </option>

                {
                  projects.map((project) => (

                    <option
                      key={project._id}
                      value={project._id}
                    >

                      {project.title}

                    </option>

                  ))
                }

              </select>

              <button onClick={createTask}>

                Create Task

              </button>

            </div>

          </>

        )
      }

      {/* PROJECTS */}

      <h2 className="section-title">

        Projects

      </h2>

      <div className="grid">

        {
          projects.map((project) => (

            <div
              className="card"
              key={project._id}
            >

              <h3>{project.title}</h3>

              <p>{project.description}</p>

              <button
                onClick={() =>
                  setOpenedProject(project._id)
                }
              >

                Open Project

              </button>

              {
                user?.role?.toLowerCase() === "admin" && (

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteProject(project._id)
                    }
                  >

                    Delete Project

                  </button>

                )
              }

            </div>

          ))
        }

      </div>

      {/* PROJECT TASKS */}

      {
        openedProject && (

          <>

            <h2 className="section-title">

              Project Tasks

            </h2>

            <div className="grid">

              {
                filteredTasks.length > 0 ? (

                  filteredTasks.map((task) => (

                    <div
                      className="card"
                      key={task._id}
                    >

                      <h3>{task.title}</h3>

                      <p>{task.description}</p>

                      <p>

                        Status :

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

                      {/* MEMBER COMPLETE BUTTON */}

                      {
                        user?.role?.toLowerCase() !== "admin" && (

                          <div style={{ marginTop: "15px" }}>

                            {
                              task.status === "Pending" ? (

                                <button
                                  className="complete-btn"
                                  onClick={() =>
                                    updateStatus(task._id)
                                  }
                                >

                                  Mark as Completed

                                </button>

                              ) : (

                                <button
                                  className="completed-btn"
                                  disabled
                                >

                                  ✓ Completed

                                </button>

                              )
                            }

                          </div>

                        )
                      }

                      {/* ADMIN DELETE */}

                      {
                        user?.role?.toLowerCase() === "admin" && (

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteTask(task._id)
                            }
                          >

                            Delete Task

                          </button>

                        )
                      }

                    </div>

                  ))

                ) : (

                  <p>No Tasks Found</p>

                )
              }

            </div>

          </>

        )
      }

    </div>

  );

}

export default Dashboard;