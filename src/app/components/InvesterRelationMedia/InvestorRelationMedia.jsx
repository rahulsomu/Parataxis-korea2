import { ArrowUpRight, ChevronRight, Newspaper } from "lucide-react";
import React from "react";
import { useTranslation } from "../../context/LanguageProvider";
import { useTheme } from "../../context/ThemeProvider";
import { Link } from "react-router-dom";

const InvestorRelationMedia = () => {
  const { t } = useTranslation();
  const { isDayMode } = useTheme();
  return (
    <section
      id="investors"
      className={`py-32 ${isDayMode ? "bg-white" : "bg-slate-900"}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-20">
          <div className="lg:col-span-4">
            <h3
              className={`text-4xl font-black uppercase tracking-tighter mb-8 leading-none ${
                isDayMode ? "text-black" : "text-white"
              }`}
            >
              {t.investors.title}
            </h3>
            <p
              className={`${
                isDayMode ? "text-slate-500" : "text-slate-400"
              } mb-10 leading-relaxed`}
            >
              {t.investors.description}
            </p>
            <div className="space-y-4">
              <a
                href="https://dart.fss.or.kr/html/search/SearchCompany_M2.html?textCrpNM=288330"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-between p-6 border-2 ${
                  isDayMode
                    ? "border-black hover:bg-black hover:text-white"
                    : "border-white text-white hover:bg-white hover:text-black"
                } font-black uppercase tracking-widest text-xs transition-all`}
              >
                {t.investors.fscDisclosures} <ArrowUpRight size={18} />
              </a>
              <Link
                to="/press"
                className={`w-full flex items-center justify-between p-6 ${
                  isDayMode
                    ? "bg-slate-100 hover:bg-slate-200"
                    : "bg-slate-800 text-white hover:bg-slate-700"
                } font-black uppercase tracking-widest text-xs transition-all`}
              >
                {t.investors.pressReleases} <Newspaper size={18} />
              </Link>
              <Link
                to="/media"
                className={`w-full flex items-center justify-between p-6 ${
                  isDayMode
                    ? "bg-slate-100 hover:bg-slate-200"
                    : "bg-slate-800 text-white hover:bg-slate-700"
                } font-black uppercase tracking-widest text-xs transition-all`}
              >
                {t.investors.media} <Newspaper size={18} />
              </Link>
              <Link
                to="/webcasts"
                className={`w-full flex items-center justify-between p-6 ${
                  isDayMode
                    ? "bg-slate-100 hover:bg-slate-200"
                    : "bg-slate-800 text-white hover:bg-slate-700"
                } font-black uppercase tracking-widest text-xs transition-all`}
              >
                {t.investors.webcasts} <Newspaper size={18} />
              </Link>
              <Link
                to="/electronic-disclosures"
                className={`w-full flex items-center justify-between p-6 ${
                  isDayMode
                    ? "bg-slate-100 hover:bg-slate-200"
                    : "bg-slate-800 text-white hover:bg-slate-700"
                } font-black uppercase tracking-widest text-xs transition-all`}
              >
                {t.investors.electronicNotices} <Newspaper size={18} />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8 grid md:grid-cols-2 gap-8">
            {[
              {
                type: "Press Releases",
                title: "Q3 2025 Financial Performance",
                date: "Nov 17, 2025",
                duration: "1.4MB PDF",
              },
              {
                type: "Media",
                title: "Institutional BTC Strategies: KOSPI Analysis",
                date: "Oct 30, 2025",
                duration: "14 Min Video",
              },
              {
                type: "Webcasts",
                title: "Expansion Phase: Global Hashrate Update",
                date: "Oct 12, 2025",
                duration: "Report",
              },
              {
                type: "Public Disclosures",
                title: "BTC Reserve Allocation Disclosure",
                date: "Sep 22, 2025",
                duration: "Filing",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`group cursor-pointer border-b ${
                  isDayMode
                    ? "border-slate-100 hover:border-black"
                    : "border-slate-800 hover:border-orange-600"
                } pb-8 transition-colors`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-600 bg-orange-50 px-2 py-0.5">
                    {item.type}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {item.date}
                  </span>
                </div>
                <h4
                  className={`text-xl font-black uppercase tracking-tighter mb-4 ${
                    isDayMode ? "text-black" : "text-white"
                  } group-hover:text-orange-600 transition-colors`}
                >
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <ChevronRight size={14} className="text-orange-600" />{" "}
                  {item.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestorRelationMedia;
