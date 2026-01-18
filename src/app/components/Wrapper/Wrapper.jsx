import React, { useEffect } from "react";
import { useTheme } from "../../context/ThemeProvider";
import HeroSection from "../HeroSection/HeroSection";
import PillarsSection from "../Pillars/PillarsSection";
import VideoCarouselSection from "../VideoSection/VideoCarouselSection";
import InvestorRelationMedia from "../InvesterRelationMedia/InvestorRelationMedia";
import TeamSection from "../Team/TeamSection";
import { useLocation } from "react-router-dom";

const Wrapper = () => {
  const { isDayMode } = useTheme();
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div
      className={`min-h-screen ${
        isDayMode ? "bg-white text-slate-900" : "bg-slate-900 text-white"
      } font-sans selection:bg-orange-100 transition-colors duration-300`}
    >
      {/* Custom animation for video progress */}
      <style>{`
        @keyframes videoProgress {
          from { width: 0; }
          to { width: 100%; }
        }
        .animate-videoProgress {
          animation: videoProgress 30s linear;
        }
      `}</style>

      {/* REAL-TIME TICKER BANNER */}

      {/* MOBILE MENU */}

      {/* HERO SECTION */}
      <HeroSection />

      {/* VIDEO CAROUSEL SECTION */}
      <VideoCarouselSection />

      {/* THE 4 PILLARS GRID */}
      <PillarsSection />

      {/* INVESTOR RELATIONS & MEDIA */}
      <InvestorRelationMedia />

      {/* TEAM SECTION */}
      <TeamSection />
    </div>
  );
};

export default Wrapper;
