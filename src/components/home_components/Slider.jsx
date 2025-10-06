import React, { useState, useEffect } from 'react';

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true);

  const slides = [
    {
      id: 1,
      title: "Your Sign Has Arrived.",
      description: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Vivamus Ut Massa Nec Orci Viverra Facilisis Ut A Mauris. Integer Fermentum.",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80"
    },
    {
      id: 2,
      title: "Discover Amazing Content",
      description: "Explore the latest insights and stories that matter to you. Stay informed and inspired every day.",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80"
    },
    {
      id: 3,
      title: "Join The Conversation",
      description: "Connect with like-minded individuals and share your thoughts. Your voice matters in our community.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80"
    },
    {
      id: 4,
      title: "Stay Updated Daily",
      description: "Get fresh perspectives and trending topics delivered to you. Never miss what's important.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80"
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setFade(false);
      
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setFade(false);
    setTimeout(() => {
      setCurrentSlide(index);
      setFade(true);
    }, 500);
  };

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Conversation Through Content
        </h2>

        {/* Slider Container */}
        <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
            {/* Background Image */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                fade ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20">
              <div
                className={`max-w-2xl transition-all duration-500 ${
                  fade
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                {/* Neon Sign Effect Title */}
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                  <span className="inline-block relative">
                    {slides[currentSlide].title}
                  </span>
                </h3>

                {/* Description */}
                <p className="text-gray-200 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
                  {slides[currentSlide].description}
                </p>

                {/* Read More Button */}
                <button className="bg-white text-gray-900 px-6 py-2.5 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base shadow-lg">
                  Read More →
                </button>
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? 'w-8 sm:w-10 h-2 sm:h-2.5 bg-white'
                      : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow Navigation */}
            <button
              onClick={() =>
                goToSlide(
                  currentSlide === 0 ? slides.length - 1 : currentSlide - 1
                )
              }
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-10"
              aria-label="Previous slide"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => goToSlide((currentSlide + 1) % slides.length)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 z-10"
              aria-label="Next slide"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;