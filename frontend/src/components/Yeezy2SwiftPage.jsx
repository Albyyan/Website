import React, { useState, useEffect } from 'react'

const Yeezy2SwiftPage = ({ isLoaded, setCurrentPage }) => {
  const [fadeIn, setFadeIn] = useState(false)
  const [inputText, setInputText] = useState('')
  const [classification, setClassification] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

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
        const message = await response.text()
        throw new Error(message || 'Classification failed')
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

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white ${isLoaded ? 'loaded' : ''}`}>
      <div className="container mx-auto px-6 py-8">
        <button 
          onClick={() => setCurrentPage('projects')} 
          className="mb-8 flex items-center space-x-2 text-purple-300 hover:text-white transition-colors duration-300"
        >
          <span>←</span>
          <span>Back to Projects</span>
        </button>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Yeezy2Swift
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            AI-powered lyric authorship classifier using machine learning to distinguish between Taylor Swift and Kanye West lyrics
          </p>
        </div>

        <div className={`max-w-4xl mx-auto ${fadeIn ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-12 border border-white/20">
            <h2 className="text-3xl font-bold mb-6 text-center">Try the Classifier</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="lyric-input" className="block text-lg font-medium mb-3">
                  Enter a lyric line:
                </label>
                <input
                  id="lyric-input"
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="e.g., I shake it off, I shake it off"
                  className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? 'Analyzing...' : 'Classify Lyric'}
                </button>

                {classification && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 border border-white/30 rounded-xl hover:bg-white/10 transition-colors duration-300"
                  >
                    Reset
                  </button>
                )}
              </div>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300">
                {error}
              </div>
            )}

            {classification && !error && (
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-white/20">
                <h3 className="text-xl font-semibold mb-4 text-center">Classification Results</h3>
                <div className="grid grid-cols-2 gap-6">
                  {['Taylor', 'Kanye'].map((artist) => (
                    <div key={artist} className="text-center">
                      <div className={`text-3xl font-bold ${artist === 'Taylor' ? 'text-pink-400' : 'text-yellow-400'} mb-2`}>
                        {classification[artist]}%
                      </div>
                      <div className="text-lg">{artist} {artist === 'Taylor' ? 'Swift' : 'West'}</div>
                      <div className="w-full bg-gray-700 rounded-full h-3 mt-2">
                        <div 
                          className={`h-3 rounded-full transition-all duration-1000 ${artist === 'Taylor' ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-gradient-to-r from-yellow-500 to-orange-500'}`}
                          style={{ width: `${classification[artist]}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Technical Details & Project Links remain unchanged */}
        </div>
      </div>
    </div>
  )
}

export default Yeezy2SwiftPage
