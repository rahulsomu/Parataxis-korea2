import React from "react";
import { useTheme } from "../../context/ThemeProvider";
import PriceTracker from "../PriceTracker/PriceTracker";
import Navigation from "../Navigation/Navigation";
import HeroSection from "../HeroSection/HeroSection";
import PillarsSection from "../Pillars/PillarsSection";
import VideoCarouselSection from "../VideoSection/VideoCarouselSection";
import InvestorRelationMedia from "../InvesterRelationMedia/InvestorRelationMedia";
import TeamSection from "../Team/TeamSection";
import FooterSection from "../Footer/FooterSection";

const Wrapper = () => {
  const { isDayMode } = useTheme();
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
      <PriceTracker />

      {/* NAVIGATION */}
      <Navigation />

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

      {/* FOOTER */}
      <FooterSection />
    </div>
  );
};

export default Wrapper;
