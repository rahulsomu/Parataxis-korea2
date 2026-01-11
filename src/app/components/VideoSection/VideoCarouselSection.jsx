import { ChevronLeft, ChevronRight, Film, Pause, Play } from "lucide-react";
import React, { useEffect, useState } from "react";
import { videos } from "../../../constants";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { useTranslation } from "../../context/LanguageProvider";

const VideoCard = ({ video }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsPlaying(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPlaying(false);
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className="relative overflow-hidden bg-black group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aspect-video relative overflow-hidden">
        {/* Use image instead of video */}
        <ImageWithFallback
          src={video.poster}
          alt={video.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-105" : ""
          }`}
        />

        {/* Video-like overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity ${
            isHovered ? "opacity-50" : "opacity-70"
          }`}
        ></div>

        {/* Simulated video controls */}
        <div
          onClick={togglePlay}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-orange-600/80 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${
            isHovered ? "opacity-100" : "opacity-90"
          }`}
        >
          {isPlaying ? (
            <Pause fill="white" size={22} className="text-white" />
          ) : (
            <Play fill="white" size={24} className="text-white ml-1" />
          )}
        </div>

        {/* Video progress bar - animated when "playing" */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
          <div
            className={`h-full bg-orange-600 transition-all duration-200 ${
              isPlaying ? "animate-videoProgress" : ""
            }`}
            style={{
              width: isPlaying ? "100%" : "0%",
              transitionDuration: isPlaying ? "30s" : "0.3s",
            }}
          ></div>
        </div>

        <div className="absolute top-4 left-4">
          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-600 bg-orange-900/30 backdrop-blur-sm px-2 py-0.5 rounded-sm">
            {video.category}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h4 className="text-xl font-black uppercase tracking-tighter mb-2 text-white">
            {video.title}
          </h4>
          <p className="text-sm text-gray-300 mb-4 line-clamp-2 opacity-80">
            {video.description}
          </p>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <Film size={12} className="text-orange-600" /> {video.duration}
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoCarouselSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  useEffect(() => {
    const carouselAutoplaySpeed = 5000;
    if (carouselAutoplaySpeed > 0) {
      const intervalId = setInterval(() => {
        nextSlide();
      }, carouselAutoplaySpeed);

      return () => clearInterval(intervalId);
    }
  }, [currentSlide]);
  return (
    <section id="media" className="bg-black text-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-xs font-black text-orange-600 uppercase tracking-[0.5em] mb-6">
              {t.media.heading}
            </h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
              {t.media.title}
            </h3>
          </div>
          <div className="flex gap-4 mt-8 md:mt-0">
            <button
              onClick={prevSlide}
              className="w-12 h-12 border border-slate-800 flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 border border-slate-800 flex items-center justify-center hover:bg-orange-600 hover:border-orange-600 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {videos.map((video, index) => {
              // Show 1 video on mobile, 2 on tablet, 3 on desktop
              const isVisible =
                index === currentSlide ||
                index === (currentSlide + 1) % videos.length ||
                index === (currentSlide + 2) % videos.length;

              return isVisible && <VideoCard key={video.id} video={video} />;
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            {videos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === idx ? "bg-orange-600" : "bg-slate-800"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="flex items-center justify-between py-6 px-8 bg-slate-900 cursor-pointer hover:bg-slate-800 transition-colors">
          <div className="flex items-center gap-4">
            <Film size={20} className="text-orange-600" />
            <span className="text-xs font-black uppercase tracking-widest">
              {t.media.viewLibrary}
            </span>
          </div>
          <ChevronRight size={18} className="text-orange-600" />
        </div>
      </div>
    </section>
  );
};

export default VideoCarouselSection;
