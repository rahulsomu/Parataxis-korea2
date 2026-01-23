import { Activity, ArrowRight, BarChart } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "../../context/LanguageProvider";
import { useTheme } from "../../context/ThemeProvider";
import { sheetUrl } from "../../../constants";
import { htmlDecoder } from "../../utils/utils";

const HeroSection = () => {
  const { t, isEnglish } = useTranslation();
  const { isDayMode } = useTheme();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function sanitizeSheetHTML(html) {
    return html
      ?.replace(/\"\"/g, '"') // fix double quotes
      .replace(/^"|"$/g, ""); // remove wrapping quotes
  }
  const fetchBannerText = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch the raw CSV data
      const response = await fetch(sheetUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch: HTTP status ${response.status}`);
      }

      const csvText = await response.text();

      // 2. Simple manual CSV parsing
      // This assumes your data does NOT contain commas or newlines within cell values.
      const rows = csvText.trim().split("\n");
      if (rows.length < 1) {
        setData([]);
        setLoading(false);
        return;
      }

      const headers = rows[0].split(",").map((h) => h.trim());

      const parsedData = rows.slice(1).map((row) => {
        const values = row.split(",");
        let item = {};
        // Map values to headers
        headers.forEach((header, index) => {
          item[header] = values[index] ? htmlDecoder(values[index].trim()) : "";
        });
        return item;
      });

      setData(...parsedData);
    } catch (err) {
      console.error("Read-only Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchBannerText();
  }, []);
  return (
    <section className="relative pt-2 pb-32 overflow-hidden md:pt-6">
      {/* Editable Announcement Banner */}
      {!loading &&
        !error &&
        data &&
        data.bannerText &&
        (isEnglish ? (
          <div
            className={`w-full flex justify-center items-center py-3 mb-4 ${
              isDayMode ? "bg-black/60" : "bg-black"
            } backdrop-blur-sm`}
          >
            <div
              className={`text-center whitespace-nowrap text-sm md:text-base font-bold ${
                isDayMode ? "text-white" : "text-white"
              }`}
              dangerouslySetInnerHTML={{
                __html: sanitizeSheetHTML(data.bannerText),
              }}
            />
          </div>
        ) : (
          <div
            className={`w-full flex justify-center items-center py-3 mb-4 ${
              isDayMode ? "bg-black/60" : "bg-black"
            } backdrop-blur-sm`}
          >
            <div
              className={`text-center whitespace-nowrap text-sm md:text-base font-bold ${
                isDayMode ? "text-white" : "text-white"
              }`}
              dangerouslySetInnerHTML={{
                __html: sanitizeSheetHTML(
                  data.koreanBannerText || data.bannerText,
                ),
              }}
            />
          </div>
        ))}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-7">
          <div
            className={`inline-block px-4 py-1.5 ${
              isDayMode
                ? "bg-slate-100 text-slate-900"
                : "bg-slate-800 text-white"
            } text-[10px] font-black uppercase tracking-[0.3em] mb-8`}
          >
            {t.hero.badge}
          </div>
          <h1
            className={`text-6xl md:text-8xl font-black ${
              isDayMode ? "text-black" : "text-white"
            } leading-[0.85] tracking-tighter mb-8`}
          >
            {t.hero.title1} <br /> {t.hero.title2} <br />{" "}
            <span className="text-orange-600">{t.hero.title3}</span>
          </h1>
          <p
            className={`text-xl ${
              isDayMode ? "text-slate-500" : "text-slate-400"
            } leading-relaxed mb-12 max-w-xl`}
          >
            {t.hero.description}
          </p>
          <div className="flex flex-wrap gap-6">
            <button className="bg-black text-white px-10 py-5 font-black uppercase tracking-widest text-[11px] flex items-center gap-3 hover:bg-orange-600 transition-colors">
              {t.hero.corporateProfile} <ArrowRight size={18} />
            </button>
            <button
              className={`border-2 ${
                isDayMode
                  ? "border-black hover:bg-black hover:text-white"
                  : "border-white hover:bg-white hover:text-black"
              } px-10 py-5 font-black uppercase tracking-widest text-[11px] flex items-center gap-3 transition-all`}
            >
              {t.hero.latestFilings}
            </button>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="bg-white border-[12px] border-slate-50 p-10 shadow-2xl relative z-10 text-slate-900">
            <div className="flex justify-between items-start mb-12">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 underline decoration-orange-600 underline-offset-8">
                {t.hero.fyOutlook}
              </div>
              <BarChart className="text-slate-200" size={40} />
            </div>
            <div className="space-y-8">
              <div>
                <div className="text-4xl font-black tracking-tighter uppercase mb-1">
                  {t.hero.targetMining}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  50.0 EH/s
                </div>
              </div>
              <div>
                <div className="text-4xl font-black tracking-tighter uppercase mb-1">
                  {t.hero.treasuryGoal}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  1,500 BTC
                </div>
              </div>
              <div className="pt-8 border-t border-slate-100">
                <div className="flex items-center gap-3 bg-orange-50 p-4 border border-orange-100">
                  <Activity size={20} className="text-orange-600" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-900">
                    {t.hero.operational}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`absolute top-12 -right-8 w-full h-full border ${
              isDayMode ? "border-slate-200" : "border-slate-700"
            } -z-10`}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
