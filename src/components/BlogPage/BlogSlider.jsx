import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, slides.length]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <div className="max-w-4xl w-full mt-16 mb-8">
      <h2 className="text-3xl font-bold text-blue-400 mb-6">Related Articles</h2>
      
      <div 
        className="relative overflow-hidden rounded-2xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={sliderRef}
      >
        {/* Slides Container */}
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide._id || slide.id} className="min-w-full relative">
              {/* ✅ Wrapped entire slide in Link */}
              <Link 
                to={`/blog/${slide._id || slide.id}`}
                className="block relative h-96 group cursor-pointer"
              >
                <img
                  src={slide.mediaUrl || slide.image}
                  alt={slide.headline || slide.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white flex flex-col gap-3">
                  {!!(slide.tags && slide.tags.length) && (
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pr-4">
                      {slide.tags.slice(0, 5).map((tag, index) => (
                        <span
                          key={`${tag}-${index}`}
                          className="shrink-0 bg-white/15 text-white/90 border border-white/20 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <h3 className="text-2xl md:text-3xl font-bold group-hover:text-blue-400 transition-colors line-clamp-2">
                    {slide.headline || slide.title}
                  </h3>

                  {slide.detail ? (
                    <div
                      className="text-gray-200 text-base md:text-lg leading-relaxed max-h-24 overflow-hidden [mask-image:linear-gradient(180deg,rgba(0,0,0,1)_70%,rgba(0,0,0,0)_100%)]"
                      dangerouslySetInnerHTML={{ __html: slide.detail }}
                    />
                  ) : (
                    <p className="text-gray-200 text-base md:text-lg">
                      {slide.description}
                    </p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-blue-400'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Manual Scroll Hint */}
      <p className="text-center text-gray-400 text-sm mt-4">
        Hover to pause • Click arrows or dots to navigate • Click slide to read full article
      </p>
    </div>
  );
};

export default BlogSlider;