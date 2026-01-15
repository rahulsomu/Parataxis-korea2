import React from "react";
import { Calendar, Download, ExternalLink, FileText } from "lucide-react";
import { useTheme } from "../../context/ThemeProvider";
import { useTranslation } from "../../context/LanguageProvider";
import { Link } from "react-router-dom";

const ListItem = ({
  release,
  isPressPage,
  isElectronicDisclosurePage,
  isWebcastsPage,
  pageNumber,
}) => {
  const { isDayMode } = useTheme();
  const { isEnglish } = useTranslation();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isEnglish) {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else {
      return date.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };

  return (
    <div
      key={release.ID}
      className={`group ${
        isDayMode
          ? "bg-slate-50 hover:bg-slate-100"
          : "bg-slate-800 hover:bg-slate-700"
      } transition-colors`}
    >
      <div className="p-8 md:p-10">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
          {/* Left side - Date and Category */}
          <div className="lg:w-48 flex-shrink-0">
            <div className="flex items-center gap-3 mb-3">
              <Calendar size={14} className="text-orange-600" />
              <span
                className={`text-[11px] font-bold uppercase tracking-widest ${
                  isDayMode ? "text-slate-500" : "text-slate-400"
                }`}
              >
                {formatDate(release.date)}
              </span>
            </div>
            {/* <span className="inline-block text-[9px] font-black uppercase tracking-[0.3em] text-orange-600 bg-orange-50 dark:bg-orange-900/30 px-2 py-1 rounded-sm">
                      {release.category}
                    </span> */}
          </div>

          {/* Middle - Content */}
          <div className="flex-1">
            <Link
              to={
                isPressPage
                  ? `/press-details?id=${release.ID}&pageNo=${pageNumber}`
                  : isElectronicDisclosurePage
                  ? `/electronic-disclosures-details?id=${release.ID}&pageNo=${pageNumber}`
                  : isWebcastsPage
                  ? `/webcasts-details?id=${release.ID}&pageNo=${pageNumber}`
                  : `/public-disclosures-details?id=${release.ID}&pageNo=${pageNumber}`
              }
              className={`group/title inline-block mb-4`}
            >
              <h2
                className={`text-2xl md:text-3xl font-black tracking-tighter mb-4 ${
                  isDayMode
                    ? "text-black group-hover/title:text-orange-600"
                    : "text-white group-hover/title:text-orange-600"
                } transition-colors inline-flex items-start gap-3`}
              >
                {isEnglish
                  ? release.heading
                  : release.koreanHeading
                  ? release.koreanHeading
                  : release.heading}
                <ExternalLink
                  size={20}
                  className="opacity-0 group-hover/title:opacity-100 transition-opacity mt-1 flex-shrink-0"
                />
              </h2>
            </Link>
            {/* <p className={`text-base leading-relaxed ${isDayMode ? 'text-slate-600' : 'text-slate-300'}`}>
                      {release.fullDescription}
                    </p> */}
          </div>
          {/* Right side - Download buttons */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="flex flex-col gap-3">
              {release.downloadLinks.map((item) => {
                if (item.fileName && item.downloadUrl) {
                  return (
                    <a
                      href={item.downloadUrl}
                      key={item.index}
                      download
                      target="_blank"
                      className={`flex items-center justify-between gap-3 px-5 py-3 border-2 ${
                        isDayMode
                          ? "border-slate-200 hover:border-black hover:bg-black hover:text-white"
                          : "border-slate-600 hover:border-white hover:bg-white hover:text-black"
                      } transition-all group/kr`}
                    >
                      <div className="flex items-center gap-2">
                        <FileText size={16} />
                        <span className="text-[11px] font-black uppercase tracking-widest">
                          {item.fileName}
                        </span>
                      </div>
                      <Download
                        size={14}
                        className="group-hover/kr:animate-bounce"
                      />
                    </a>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
