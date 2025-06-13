const AboutPage = ({ isLoaded, setCurrentPage, skills, currentSkillIndex }) => {
  return (
    <div className={`page ${isLoaded ? 'loaded' : ''}`}>
      <div className="page-content">
        <button onClick={() => setCurrentPage('home')} className="back-button">
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
}

export default AboutPage