import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Slider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(true);

  // ✅ Auto-slide every 5 seconds
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setFade(true);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setFade(false);
    setTimeout(() => {
      setCurrentSlide(index);
      setFade(true);
    }, 300);
  };

  if (!slides || slides.length === 0)
    return (
      <div className="text-center py-12 text-gray-600 text-lg">
        No posts available for slider.
      </div>
    );

  const current = slides[currentSlide];

  return (
    <div className="bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Conversation Through Content
        </h2>

        <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-xl">
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
            {/* ✅ Image or Video */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              {current.mediaType === "video" ? (
                <video
                  src={current.mediaUrl}
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={current.mediaUrl}
                  alt={current.headline}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
            </div>

            {/* ✅ Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-20">
              <div
                className={`max-w-2xl transition-all duration-500 ${
                  fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                } flex flex-col gap-3 sm:gap-4`}
              >
                {/* Tags Row (overflow-safe) */}
                {!!(current.tags && current.tags.length) && (
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pr-4">
                    {current.tags.slice(0, 5).map((t, i) => (
                      <span
                        key={`${t}-${i}`}
                        className="shrink-0 bg-white/15 text-white/90 border border-white/20 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
                        title={t}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                <h3 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold text-white leading-tight line-clamp-2">
                  {current.headline}
                </h3>

                <div
                  className="text-gray-200 text-base leading-relaxed line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: current.detail || "" }}
                />

                {/* Keep button visible: pin at end of column */}
                <div className="mt-2 sm:mt-3">
                  <Link
                    to={`/blog/${current._id}`}
                    className="inline-block bg-white text-gray-900 px-6 py-2.5 rounded-md font-semibold hover:bg-gray-100 transition-colors duration-300 text-sm sm:text-base shadow-lg"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>

            {/* ✅ Navigation Dots */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    currentSlide === index
                      ? "w-8 sm:w-10 h-2 sm:h-2.5 bg-white"
                      : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* ✅ Arrow Buttons */}
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