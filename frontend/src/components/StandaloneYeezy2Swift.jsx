import React, { useState, useEffect } from 'react'
import '../styles/yeezy2swift.css'

const StandaloneYeezy2Swift = ({ isLoaded, setCurrentPage }) => {
  const [fadeIn, setFadeIn] = useState(false)
  const [inputText, setInputText] = useState('')
  const [classification, setClassification] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const exampleLyrics = [
    "I shake it off, I shake it off",
    "You belong with me", 
    "I'm a monster, I'm a maverick",
    "Gold digger, gold digger",
    "Look what you made me do",
    "I feel like Pablo when I'm working on my shoes"
  ]

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const classifyLyric = async (text) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/classify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lyric: text }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Classification failed')
      }

      const result = await response.json()
      setClassification(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputText.trim()) {
      classifyLyric(inputText.trim())
    }
  }

  const handleReset = () => {
    setInputText('')
    setClassification(null)
    setError(null)
  }

  const tryExample = (lyric) => {
    setInputText(lyric)
    classifyLyric(lyric)
  }

  return (
    <div className="yeezy2swift-page">
      <div className="yeezy2swift-container">
        <button 
          onClick={() => setCurrentPage('home')} 
          className="yeezy2swift-back-btn"
        >
          <span>←</span>
          <span>Back to Home</span>
        </button>

        <div className="yeezy2swift-header">
          <h1 className="yeezy2swift-title">
            Yeezy2Swift
          </h1>
          <p className="yeezy2swift-subtitle">
            AI-powered lyric classifier using machine learning to distinguish between Taylor Swift and Kanye West lyrics with TF-IDF features and Support Vector Machines
          </p>
        </div>

        <div className="yeezy2swift-main-card">
          <h2 className="yeezy2swift-form-title">Try the Classifier</h2>
          <form onSubmit={handleSubmit}>
            <div className="yeezy2swift-input-group">
              <label htmlFor="lyric-input" className="yeezy2swift-label">
                Enter a lyric line:
              </label>
              <input
                id="lyric-input"
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="e.g., I shake it off, I shake it off"
                className="yeezy2swift-input"
                disabled={isLoading}
              />
            </div>

            <div className="yeezy2swift-button-group">
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="yeezy2swift-classify-btn"
              >
                {isLoading && <span className="yeezy2swift-loading-spinner"></span>}
                {isLoading ? 'Analyzing...' : 'Classify Lyric'}
              </button>

              {classification && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="yeezy2swift-reset-btn"
                >
                  Try Another
                </button>
              )}
            </div>
          </form>

          {error && (
            <div className="yeezy2swift-error">
              <strong>Error:</strong> {error}
            </div>
          )}

          {classification && !error && (
            <div className="yeezy2swift-results">
              <h3 className="yeezy2swift-results-title">Classification Results</h3>
              
              <div className="yeezy2swift-percentages">
                <div className="yeezy2swift-taylor-percentage">
                  Taylor: {classification.Taylor}%
                </div>
                <div className="yeezy2swift-kanye-percentage">
                  Kanye: {classification.Kanye}%
                </div>
              </div>

              <div className="yeezy2swift-artist-names">
                <span>Taylor Swift</span>
                <span>Kanye West</span>
              </div>

              <div className="yeezy2swift-bar-container">
                <div className="yeezy2swift-bar">
                  <div 
                    className="yeezy2swift-taylor-bar"
                    style={{ width: `${classification.Taylor}%` }}
                  >
                    {classification.Taylor > 15 && (
                      <span className="yeezy2swift-bar-label">
                        Taylor {classification.Taylor}%
                      </span>
                    )}
                  </div>
                  <div 
                    className="yeezy2swift-kanye-bar"
                    style={{ width: `${classification.Kanye}%` }}
                  >
                    {classification.Kanye > 15 && (
                      <span className="yeezy2swift-bar-label">
                        Kanye {classification.Kanye}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="yeezy2swift-info">
          <h3 className="yeezy2swift-info-title">About This Project</h3>
          <p className="yeezy2swift-info-text">
            This classifier uses machine learning to analyze lyric patterns and predict authorship. 
            Built with TF-IDF vectorization and Support Vector Machines, it's trained on lyrics 
            from both artists to identify distinctive writing styles and word choices.
          </p>
          
          <div className="yeezy2swift-tech-stack">
            {['Python', 'Scikit-learn', 'TF-IDF', 'SVM', 'Flask', 'React'].map(tech => (
              <span key={tech} className="yeezy2swift-tech-tag">
                {tech}
              </span>
            ))}
          </div>

          <div className="yeezy2swift-examples">
            <p className="yeezy2swift-examples-title">Try some examples:</p>
            <div className="yeezy2swift-example-buttons">
              {exampleLyrics.map((lyric, index) => (
                <button
                  key={index}
                  onClick={() => tryExample(lyric)}
                  className="yeezy2swift-example-btn"
                >
                  "{lyric}"
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StandaloneYeezy2Swift