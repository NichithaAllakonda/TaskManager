function ProjectCard({ project }) {
  return (
    <div className="card">
      <h3>{project.title}</h3>

      <p>{project.description}</p>
    </div>
  );
}

export default ProjectCard;