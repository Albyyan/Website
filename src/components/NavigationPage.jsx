const NavigationPage = ({ isLoaded, setCurrentPage, typedText }) => {
  return (
    <div className={`nav-page ${isLoaded ? 'loaded' : ''}`}>
      <div className="nav-content">
        <div className="glitch-container">
          <h1 className="main-title glitch" data-text="ALBERT YAN">ALBERT YAN</h1>
          <div className="title-underline"></div>
        </div>
        <div className="subtitle-container">
          <span className="typewriter-text">{typedText}</span>
          <span className="typewriter-cursor">|</span>
        </div>
        
        <div className="floating-elements">
          <div className="float-element" style={{top: '20%', left: '10%'}}>&#123;</div>
          <div className="float-element" style={{top: '30%', right: '15%'}}>&#125;</div>
          <div className="float-element" style={{bottom: '25%', left: '5%'}}>&lt;/&gt;</div>
          <div className="float-element" style={{bottom: '15%', right: '10%'}}>( )</div>
        </div>
        
        <nav className="nav-grid">
          <button
            onClick={() => setCurrentPage('about')}
            className="nav-button"
            data-hover="DISCOVER"
          >
            <span>About</span>
            <div className="button-bg"></div>
          </button>
          
          <button
            onClick={() => setCurrentPage('projects')}
            className="nav-button"
            data-hover="EXPLORE"
          >
            <span>Projects</span>
            <div className="button-bg"></div>
          </button>
          
          <button
            onClick={() => setCurrentPage('resume')}
            className="nav-button"
            data-hover="DOWNLOAD"
          >
            <span>Resume</span>
            <div className="button-bg"></div>
          </button>
          
          <button
            onClick={() => setCurrentPage('contact')}
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
}

export default NavigationPage