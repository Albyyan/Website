import { useState, useEffect } from 'react'
import './App.css'
import NavigationPage from './components/NavigationPage.jsx'
import AboutPage from './components/AboutPage.jsx'
import ProjectsPage from './components/ProjectsPage.jsx'
import ResumePage from './components/ResumePage.jsx'
import ContactPage from './components/ContactPage.jsx'
import StandaloneYeezy2Swift from './components/StandaloneYeezy2Swift.jsx'


function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [typedText, setTypedText] = useState('')
  const [completedTyping, setCompletedTyping] = useState(false)
  const fullText = 'Developer • Designer • Creator'

  const skills = [
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'CSS',
    'Git',
    'TypeScript',
    'MongoDB'
  ]

  // Check URL path on component mount
  useEffect(() => {
    const path = window.location.pathname
    if (path === '/yeezy2swift') {
      setCurrentPage('standalone-yeezy2swift')
    }
  }, [])

  // Update URL when page changes
  useEffect(() => {
    if (currentPage === 'standalone-yeezy2swift') {
      window.history.pushState({}, '', '/yeezy2swift')
    } else if (currentPage === 'home') {
      window.history.pushState({}, '', '/')
    }
  }, [currentPage])

  // Typewriter effect for Home page
  useEffect(() => {
    if (currentPage === 'home' && !completedTyping) {
      let i = 0
      const timer = setInterval(() => {
        setTypedText(fullText.slice(0, i))
        i++
        if (i > fullText.length) {
          clearInterval(timer)
          setCompletedTyping(true)
        }
      }, 80)
      return () => clearInterval(timer)
    }
  }, [currentPage, completedTyping])

  const handlePageChange = (page) => {
    setCurrentPage(page)
    if (page === 'home') {
      setTypedText('')
      setCompletedTyping(false)
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'standalone-yeezy2swift':
        return <StandaloneYeezy2Swift isLoaded={true} setCurrentPage={handlePageChange} />
      case 'about':
        return <AboutPage isLoaded={true} setCurrentPage={handlePageChange} skills={skills} />
      case 'projects':
        return <ProjectsPage isLoaded={true} setCurrentPage={handlePageChange} />
      case 'resume':
        return <ResumePage isLoaded={true} setCurrentPage={handlePageChange} />
      case 'contact':
        return <ContactPage isLoaded={true} setCurrentPage={handlePageChange} />
      case 'home':
      default:
        return (
          <NavigationPage
            isLoaded={true}
            typedText={typedText}
            setCurrentPage={handlePageChange}
          />
        )
    }
  }

  return renderPage()
}

export default App