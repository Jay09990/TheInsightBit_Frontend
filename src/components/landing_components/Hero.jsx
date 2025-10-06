import React from 'react'
// Navbar is rendered globally in App.jsx
import logo from '../../assets/images/logo.svg'

const Hero = () => {
  return (
    <section className="bg-white min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 py-12 md:py-16">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Discover thoughtful articles and stories
            </h1>
            <p className="mt-4 md:mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0">
              Join our community of readers and writers. Curated content on design, tech and lifestyle.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a className="bg-[#8A38F5] text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors" href="#">
                Explore
              </a>
              <a className="border-2 border-gray-200 px-8 py-3 rounded-lg text-lg font-medium hover:border-primary hover:text-primary transition-colors" href="#">
                Latest
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
            <div className="bg-gradient-to-tr from-white to-primary/10 rounded-3xl p-8 shadow-xl flex items-center justify-center max-w-md w-full aspect-square md:aspect-auto">
              <div className="bg-white rounded-2xl p-8 flex items-center justify-center w-full h-full">
                <img src={logo} alt="insihbit" className="w-3/4 h-auto object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#DDE5E8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-lg font-medium text-gray-700">Curated picks for you</div>
        </div>
      </div>
    </section>
  )
}

export default Hero
