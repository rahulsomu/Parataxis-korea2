import React, { useState } from "react";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { ArrowUpRight, Menu, Moon, Newspaper, Sun, X } from "lucide-react";
import { useTranslation } from "../../context/LanguageProvider";
import { useTheme } from "../../context/ThemeProvider";

const Navigation = () => {
  const { t, isEnglish, toggleLanguage } = useTranslation();
  const { isDayMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <nav
        className={`sticky top-[32px] md:top-[36px] z-50 ${
          isDayMode ? "bg-white/90" : "bg-slate-800/90"
        } backdrop-blur-lg border-b ${
          isDayMode ? "border-slate-100" : "border-slate-700"
        } transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div
            className={`flex items-center gap-3 ${
              isDayMode ? "bg-white" : "bg-slate-800"
            } px-4 py-2`}
          >
            <ImageWithFallback
              src="https://wimg.mk.co.kr/news/cms/202509/17/news-p.v1.20250917.575a07f52b6e4b5ab904349f55a2d436_P1.jpg"
              alt="Parataxis Korea Logo"
              className={`h-14 w-auto object-contain ${
                isDayMode ? "" : "invert"
              }`}
            />
            <div className="sr-only">Parataxis Korea</div>
          </div>

          <div
            className={`hidden lg:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] ${
              isDayMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
            <a
              href="#media"
              className={`${
                isDayMode ? "hover:text-black" : "hover:text-white"
              } transition-colors`}
            >
              {t.nav.media}
            </a>
            <a
              href="#pillars"
              className={`${
                isDayMode ? "hover:text-black" : "hover:text-white"
              } transition-colors`}
            >
              {t.nav.strategy}
            </a>
            <a
              href="#investors"
              className={`${
                isDayMode ? "hover:text-black" : "hover:text-white"
              } transition-colors`}
            >
              {t.nav.investors}
            </a>
            <a
              href="#team"
              className={`${
                isDayMode ? "hover:text-black" : "hover:text-white"
              } transition-colors`}
            >
              {t.nav.team}
            </a>

            {/* DAY | NIGHT Toggle */}
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center p-2 rounded-full w-8 h-8 ${
                isDayMode
                  ? "bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white"
                  : "bg-slate-700 text-slate-200 hover:bg-white hover:text-slate-900"
              } transition-all`}
              aria-label={
                isDayMode ? "Switch to night mode" : "Switch to day mode"
              }
            >
              {isDayMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {/* KOREAN | ENGLISH Toggle */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center justify-center p-2 rounded-full w-8 h-8 ${
                isDayMode
                  ? "bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white"
                  : "bg-slate-700 text-slate-200 hover:bg-white hover:text-slate-900"
              } transition-all text-[10px] font-black`}
              aria-label={isEnglish ? "Switch to Korean" : "Switch to English"}
            >
              {isEnglish ? "KR" : "EN"}
            </button>

            <div
              className={`h-4 w-px ${
                isDayMode ? "bg-slate-200" : "bg-slate-600"
              }`}
            ></div>
            <button className="flex items-center justify-center gap-2 bg-black text-white px-6 py-3 rounded-sm hover:bg-orange-600 transition-all group min-w-[140px]">
              <Newspaper size={14} />
              <span>{t.nav.earnings}</span>
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white p-10 lg:hidden">
          <div className="flex justify-end mb-12">
            <button onClick={() => setIsMenuOpen(false)}>
              <X size={32} />
            </button>
          </div>
          <div className="flex flex-col gap-8 text-3xl font-black uppercase tracking-tighter">
            <a href="#pillars" onClick={() => setIsMenuOpen(false)}>
              Strategy
            </a>
            <a href="#investors" onClick={() => setIsMenuOpen(false)}>
              Investors
            </a>
            <a href="#team" onClick={() => setIsMenuOpen(false)}>
              Team
            </a>
            <a href="#" className="text-orange-600">
              Media Center
            </a>
            <a href="#" className="text-orange-600">
              Earnings
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
