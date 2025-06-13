const ResumePage = ({ isLoaded, setCurrentPage }) => {
  return (
    <div className={`page ${isLoaded ? 'loaded' : ''}`}>
      <div className="page-content">
        <button onClick={() => setCurrentPage('home')} className="back-button">
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
}

export default ResumePage