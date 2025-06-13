const ContactPage = ({ isLoaded, setCurrentPage }) => {
  return (
    <div className={`page ${isLoaded ? 'loaded' : ''}`}>
      <div className="page-content">
        <button onClick={() => setCurrentPage('home')} className="back-button">
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
}

export default ContactPage