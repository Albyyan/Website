const ProjectsPage = ({ isLoaded, setCurrentPage, visibleProjects }) => {
  const projects = [
    {
      title: "Neural Dashboard",
      description: "A full-stack web application built with React and Node.js. Features user authentication and real-time data updates with AI-powered analytics.",
      tech: ["React", "Node.js", "MongoDB", "Socket.io"]
    },
    {
      title: "Quantum Commerce", 
      description: "A mobile-responsive e-commerce platform with payment integration, inventory management, and predictive analytics.",
      tech: ["Next.js", "Stripe", "PostgreSQL", "Redis"]
    },
    {
      title: "DataViz Engine",
      description: "An open-source library for data visualization, featuring customizable charts, interactive elements, and real-time updates.",
      tech: ["D3.js", "TypeScript", "WebGL", "Canvas"]
    }
  ]

  return (
    <div className={`page ${isLoaded ? 'loaded' : ''}`}>
      <div className="page-content">
        <button onClick={() => setCurrentPage('home')} className="back-button">
          ← Back
        </button>
        <h2 className="page-title">
          Projects
          <div className="title-decoration"></div>
        </h2>
        <div className="content-section">
          <div className="project-grid">
            {projects.map((project, index) => (
              <div 
                key={index}
                className={`project-card ${visibleProjects.includes(index) ? 'visible' : ''}`}
              >
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <div className="project-status">LIVE</div>
                </div>
                <p>{project.description}</p>
                <div className="tech-stack">
                  {project.tech.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href="#" className="project-link">
                    <span>View Demo</span>
                    <div className="link-arrow">→</div>
                  </a>
                  <a href="#" className="project-link">
                    <span>Source Code</span>
                    <div className="link-arrow">↗</div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectsPage