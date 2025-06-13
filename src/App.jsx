import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0)
  const [visibleProjects, setVisibleProjects] = useState([])
  const [pageKey, setPageKey] = useState(0)

  const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'CSS', 'Git', 'TypeScript', 'MongoDB']

  // Typewriter Component - Isolated to prevent re-renders
  const TypewriterText = () => {
    const [text, setText] = useState('')
    const [completed, setCompleted] = useState(false)
    const fullText = "Developer • Designer • Creator"

    useEffect(() => {
      if (!completed) {
        setText('')
        let i = 0
        const timer = setInterval(() => {
          setText(fullText.slice(0, i))
          i++
          if (i > fullText.length) {
            clearInterval(timer)
            setCompleted(true)
          }
        }, 80)
        return () => clearInterval(timer)
      }
    }, []) // Empty dependency array - runs only once

    return (
      <div className="subtitle-container">
        <span className="typewriter-text">{text}</span>
        <span className="typewriter-cursor">|</span>
      </div>
    )
  }

  // Rotating skills animation
  useEffect(() => {
    if (currentPage === 'about') {
      const timer = setInterval(() => {
        setCurrentSkillIndex((prev) => (prev + 1) % skills.length)
      }, 2000)
      return () => clearInterval(timer)
    }
  }, [currentPage, skills.length])

  // Staggered project reveal
  useEffect(() => {
    if (currentPage === 'projects') {
      setVisibleProjects([])
      const timers = [0, 200, 400].map((delay, index) =>
        setTimeout(() => {
          setVisibleProjects(prev => [...prev, index])
        }, delay)
      )
      return () => timers.forEach(clearTimeout)
    }
  }, [currentPage])

  // Page change handler - FIXED
  const handlePageChange = (page) => {
    setCurrentPage(page)
    // Only increment pageKey for non-home pages to avoid typewriter issues
    if (page !== 'home') {
      setPageKey(prev => prev + 1)
    }
  }

  // Navigation Page Component
  const NavigationPage = () => (
    <div className="nav-page loaded">
      <div className="nav-content">
        <div className="glitch-container">
          <h1 className="main-title glitch" data-text="ALEX CHEN">ALEX CHEN</h1>
          <div className="title-underline"></div>
        </div>
        <TypewriterText />
        
        <div className="floating-elements">
          <div className="float-element" style={{top: '20%', left: '10%'}}>&#123;</div>
          <div className="float-element" style={{top: '30%', right: '15%'}}>&#125;</div>
          <div className="float-element" style={{bottom: '25%', left: '5%'}}>&lt;/&gt;</div>
          <div className="float-element" style={{bottom: '15%', right: '10%'}}>( )</div>
        </div>
        
        <nav className="nav-grid">
          <button
            onClick={() => handlePageChange('about')}
            className="nav-button"
            data-hover="DISCOVER"
          >
            <span>About</span>
            <div className="button-bg"></div>
          </button>
          
          <button
            onClick={() => handlePageChange('projects')}
            className="nav-button"
            data-hover="EXPLORE"
          >
            <span>Projects</span>
            <div className="button-bg"></div>
          </button>
          
          <button
            onClick={() => handlePageChange('resume')}
            className="nav-button"
            data-hover="DOWNLOAD"
          >
            <span>Resume</span>
            <div className="button-bg"></div>
          </button>
          
          <button
            onClick={() => handlePageChange('contact')}
            className="nav-button"
            data-hover="CONNECT"
          >
            <span>Contact</span>
            <div className="button-bg"></div>
          </button>
        </nav>
      </div>
    </div>
  )

  // About Page Component
  const AboutPage = () => (
    <div className="page loaded" key={`about-${pageKey}`}>
      <div className="page-content">
        <button onClick={() => handlePageChange('home')} className="back-button">
          ← Back
        </button>
        <h2 className="page-title">
          About Me
          <div className="title-decoration"></div>
        </h2>
        <div className="content-section">
          <div className="animated-intro">
            <p className="slide-in">
              I'm a passionate developer with a love for creating clean, functional, and beautiful web experiences. 
              With expertise in modern web technologies, I focus on building applications that make a difference.
            </p>
            <p className="slide-in delay-1">
              When I'm not coding, you can find me exploring new technologies, contributing to open source projects, 
              or working on personal creative endeavors.
            </p>
          </div>
          
          <div className="skills">
            <h3>Skills</h3>
            <div className="skill-showcase">
              <div className="current-skill">
                <span className="skill-highlight">{skills[currentSkillIndex]}</span>
              </div>
              <div className="skill-grid">
                {skills.map((skill, index) => (
                  <span 
                    key={skill} 
                    className={`skill-tag ${index === currentSkillIndex ? 'active' : ''}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="stats-section">
            <div className="stat-item">
              <div className="stat-number">3+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">Projects Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Technologies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Projects Page Component
  const ProjectsPage = () => {
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
      <div className="page loaded" key={`projects-${pageKey}`}>
        <div className="page-content">
          <button onClick={() => handlePageChange('home')} className="back-button">
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

  // Resume Page Component
  const ResumePage = () => (
    <div className="page loaded" key={`resume-${pageKey}`}>
      <div className="page-content">
        <button onClick={() => handlePageChange('home')} className="back-button">
          ← Back
        </button>
        <h2 className="page-title">
          Resume
          <div className="title-decoration"></div>
        </h2>
        <div className="content-section">
          <div className="resume-section">
            <h3>Experience</h3>
            <div className="resume-item">
              <h4>Senior Developer</h4>
              <p className="company">Tech Company • 2022 - Present</p>
              <p>Lead development of web applications using React and Node.js. Mentored junior developers and implemented best practices.</p>
            </div>
            
            <div className="resume-item">
              <h4>Full Stack Developer</h4>
              <p className="company">Startup Inc • 2020 - 2022</p>
              <p>Built scalable web applications from concept to deployment. Worked closely with design and product teams.</p>
            </div>
          </div>
          
          <div className="resume-section">
            <h3>Education</h3>
            <div className="resume-item">
              <h4>Bachelor of Computer Science</h4>
              <p className="company">University Name • 2016 - 2020</p>
              <p>Graduated with honors. Focused on software engineering and web technologies.</p>
            </div>
          </div>
          
          <a href="#" className="download-button">Download PDF Resume</a>
        </div>
      </div>
    </div>
  )

  // Contact Page Component
  const ContactPage = () => (
    <div className="page loaded" key={`contact-${pageKey}`}>
      <div className="page-content">
        <button onClick={() => handlePageChange('home')} className="back-button">
          ← Back
        </button>
        <h2 className="page-title">
          Contact
          <div className="title-decoration"></div>
        </h2>
        <div className="content-section">
          <div className="contact-info">
            <div className="contact-item">
              <h3>Email</h3>
              <a href="mailto:your.email@example.com" className="contact-link">
                your.email@example.com
              </a>
            </div>
            
            <div className="contact-item">
              <h3>LinkedIn</h3>
              <a href="#" className="contact-link">linkedin.com/in/yourname</a>
            </div>
            
            <div className="contact-item">
              <h3>GitHub</h3>
              <a href="#" className="contact-link">github.com/yourusername</a>
            </div>
            
            <div className="contact-item">
              <h3>Twitter</h3>
              <a href="#" className="contact-link">@yourusername</a>
            </div>
          </div>
          
          <div className="contact-form">
            <h3>Send a Message</h3>
            <form className="form">
              <input type="text" placeholder="Your Name" className="form-input" />
              <input type="email" placeholder="Your Email" className="form-input" />
              <textarea placeholder="Your Message" className="form-textarea"></textarea>
              <button type="submit" className="form-submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )

  // Page Router
  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />
      case 'projects':
        return <ProjectsPage />
      case 'resume':
        return <ResumePage />
      case 'contact':
        return <ContactPage />
      default:
        return <NavigationPage />
    }
  }

  return renderPage()
}

export default App