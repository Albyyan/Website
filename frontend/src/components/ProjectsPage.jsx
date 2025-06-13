import { useState, useEffect } from 'react'

const ProjectsPage = ({ isLoaded, setCurrentPage }) => {
  const [visibleProjects, setVisibleProjects] = useState([])
  
  const projects = [
    {
      title: "Society Website Development",
      description: "A full-stack web application built with React and Vite. Currently working on databases and security / authentication functionality.",
      tech: ["React", "Node.js", "MongoDB", "Socket.io"]
    },
    {
      title: "Quantum Commerce", 
      description: "A mobile-responsive e-commerce platform with payment integration, inventory management, and predictive analytics.",
      tech: ["Next.js", "Stripe", "PostgreSQL", "Redis"]
    },
    {
      title: "Yeezy2Swift Authorship Estimator",
      description: "Classification model that identifies whether a lyric line was written by Taylor Swift or Kanye West using TF-IDF features and an SVM.",
      tech: ["Python", "Scikit-learn", "TF-IDF", "SVM"]
    }
  ]

  // Staggered project reveal - contained within this component
  useEffect(() => {
    setVisibleProjects([])
    const timers = [0, 200, 400].map((delay, index) =>
      setTimeout(() => {
        setVisibleProjects(prev => [...prev, index])
      }, delay)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const handleDemoClick = (e, project) => {
    e.preventDefault()
    if (project.title === "Yeezy2Swift Authorship Estimator") {
      setCurrentPage('yeezy2swift')
    }
    // For other projects, you can add their demo links here
  }

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
                  <a 
                    href="#" 
                    className="project-link"
                    onClick={(e) => handleDemoClick(e, project)}
                  >
                    <span>View Demo</span>
                    <div className="link-arrow">→</div>
                  </a>
                  <a 
                    href={project.title === "Yeezy2Swift Authorship Estimator" ? "https://github.com/Albyyan/KanyeVTSwizzle" : "#"} 
                    className="project-link"
                    target={project.title === "Yeezy2Swift Authorship Estimator" ? "_blank" : "_self"}
                    rel={project.title === "Yeezy2Swift Authorship Estimator" ? "noopener noreferrer" : ""}
                  >
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