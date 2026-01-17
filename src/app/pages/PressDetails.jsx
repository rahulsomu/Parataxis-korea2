import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Sun,
  Moon,
  Download,
  ExternalLink,
  FileText,
  Calendar,
} from "lucide-react";
import { ImageWithFallback } from "../components/ui/ImageWithFallback";
import { useTheme } from "../context/ThemeProvider";
import { useTranslation } from "../context/LanguageProvider";
import {
  dashboardElectronicDisclosuresGetAllApiUrl,
  dashboardPressGetAllApiUrl,
  dashboardPublicDisclosuresGetAllApiUrl,
  dashboardWebcastsGetAllApiUrl,
  ElectronicDisclosuresApiUrl,
  pressApiUrl,
  publicDisclosuresApiUrl,
  webcastsApiUrl,
} from "../../constants";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import Dropdown from "../components/dropdown/Dropdown";
import { htmlDecoder, isEmpty, isValidJSON } from "../utils/utils";

const PressDetails = ({ title }) => {
  const { isDayMode, toggleTheme } = useTheme();
  const { t, isEnglish, toggleLanguage } = useTranslation();
  const isPressPage = title === "News";
  const isElectronicDisclosurePage = title === "Electronic Disclosures";
  const isWebcastsPage = title === "Webcasts and Presentations";
  const [searchParams] = useSearchParams();
  const idFromUrl = searchParams.get("id");
  const pageNoFromUrl = searchParams.get("pageNo") || 1;
  const [list, setList] = useState({
    fetching: false,
    success: false,
    data: [],
    error: null,
    loadMoreFetching: false,
  });
  const [filteredData, setFilteredData] = useState({});
  const location = useLocation();
  const { pageNo = 1 } = location.state || {};

  const [pageNumber, setPageNumber] = useState(pageNo);
  const order = sessionStorage.getItem("sort");
  const [sortOrder, setSortOrder] = useState(order || "Newest");

  const fetchData = async (loadMore = false, pageToFetch) => {
    setList({ ...list, fetching: true, success: false, data: [], error: null });
    try {
      let params = {
        limit: 10,
        page: pageNoFromUrl,
        // sort: sortOrder === "Newest" ? 1 : 0,
      };
      const url = isPressPage
        ? dashboardPressGetAllApiUrl(params)
        : isElectronicDisclosurePage
          ? dashboardElectronicDisclosuresGetAllApiUrl(params)
          : isWebcastsPage
            ? dashboardWebcastsGetAllApiUrl(params)
            : dashboardPublicDisclosuresGetAllApiUrl(params);
      const response = await axios.get(url);
      if (response.status === 200) {
        if (response.data) {
          const newData = response.data
            ?.filter((item) => isValidJSON(item.data))
            .map((item) => ({
              ...JSON.parse(item.data),
              ID: item.id,
            }));
          setList({
            fetching: false,
            success: true,
            data: newData,
            error: null,
          });

          // Find and set the filtered data based on title
          const found = newData.find((item) => item.ID == idFromUrl);
          if (found) {
            setFilteredData(found);
          }
        }
      }
    } catch (error) {
      console.error(error, "error");
      setList({ ...list, fetching: false, data: [], error: true });
    }
  };

  const {
    date = "",
    heading = "",
    downloadLink = "",
    downloadLinks = [],
    fullDescription = "",
    imgUrl = null,
    koreanHeading = "",
    koreanDescription = "",
  } = !isEmpty(filteredData) ? filteredData : location.state || {};

  const getDescription = () => {
    const desc = isEnglish
      ? fullDescription
      : koreanDescription
        ? koreanDescription
        : fullDescription;
    return desc;
  };
  const handleDropdown = (value) => {
    sessionStorage.setItem("sort", value);
    setPageNumber(1);
    setSortOrder(value);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    if (idFromUrl) {
      fetchData();
    } else if (!location.state) {
      navigate(
        isPressPage
          ? "/press"
          : isElectronicDisclosurePage
            ? "/electronic-disclosures"
            : isWebcastsPage
              ? "/webcasts"
              : "/public-disclosures",
      );
    }
  }, [idFromUrl]);

  const handleLoadMore = () => {
    setPageNumber(pageNumber + 1);
    fetchData(true, pageNumber + 1);
  };

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
      className={`min-h-screen ${
        isDayMode ? "bg-slate-50 text-slate-900" : "bg-slate-900 text-white"
      } transition-colors duration-300 `}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <Link
          to={
            isPressPage
              ? "/press"
              : isElectronicDisclosurePage
                ? "/electronic-disclosures"
                : isWebcastsPage
                  ? "/webcasts"
                  : "/public-disclosures"
          }
          className={`flex items-center gap-2 mb-4 text-[11px] font-black uppercase tracking-widest ${
            isDayMode
              ? "text-slate-500 hover:text-black"
              : "text-slate-400 hover:text-white"
          } transition-colors`}
        >
          <ArrowLeft size={16} />
          {t.nav.viewAll}
        </Link>
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* pressPage Header */}
          {/* <div className="mb-16">
          <div className="text-xs font-black text-orange-600 uppercase tracking-[0.5em] mb-6">
            {t.pressPage.subtitle}
          </div>
          <h1
            className={`text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 ${
              isDayMode ? "text-black" : "text-white"
            }`}
          >
            {t.pressPage.title}
          </h1>
          <p
            className={`text-lg max-w-3xl ${
              isDayMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {t.pressPage.description}
          </p>
        </div> */}

          {/* Press Releases List */}
          <div className="space-y-1 min-h-full relative">
            {list.fetching ? (
              <div className="flex items-center justify-center">
                <Loader />
              </div>
            ) : list.success ? (
              isEmpty(filteredData) ? (
                <div className="error-screen">
                  {/* <MdError /> */}
                  <p>Data not found!</p>
                </div>
              ) : (
                <div className="details-content">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar size={14} className="text-orange-600" />
                    <span
                      className={`text-[11px] font-bold uppercase tracking-widest ${
                        isDayMode ? "text-slate-500" : "text-slate-400"
                      }`}
                    >
                      {formatDate(date)}
                    </span>
                  </div>
                  <h1
                    className={`text-2xl md:text-3xl font-black tracking-tighter mb-4 ${
                      isDayMode
                        ? "text-black group-hover/title:text-orange-600"
                        : "text-white group-hover/title:text-orange-600"
                    } transition-colors inline-flex items-start gap-3`}
                  >
                    {isEnglish
                      ? heading
                      : koreanHeading
                        ? koreanHeading
                        : heading}
                  </h1>
                  {downloadLink ? (
                    <a className="download" href={downloadLink} download>
                      {/* <BsFileEarmarkPdf /> */}
                      Download
                    </a>
                  ) : null}
                  {downloadLinks?.length > 0 ? (
                    <div className="flex-shrink-0 mb-12">
                      <div className="flex gap-3">
                        {downloadLinks.map((item) => {
                          if (item.fileName && item.downloadUrl) {
                            return (
                              <a
                                key={item.index}
                                href={item.downloadUrl}
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
                  ) : null}
                  {imgUrl ? <img src={imgUrl} alt={heading} /> : null}
                  {fullDescription ? (
                    <div
                      className="html-content"
                      dangerouslySetInnerHTML={{
                        __html: htmlDecoder(getDescription()),
                      }}
                    />
                  ) : null}
                  {/* <Link
                to={
                  isPressPage
                    ? "/press"
                    : isElectronicDisclosurePage
                    ? "/electronic-disclosures"
                    : isWebcastsPage
                    ? "/webcasts"
                    : "/public-disclosures"
                }
                state={{ pageNo: pageNo }}
                className="view-all-bottom"
              >
                <FaArrowLeft />
                {`${translate("buttons.viewAll")} ${translate(
                  `${
                    isPressPage
                      ? "pressDetails"
                      : isElectronicDisclosurePage
                      ? "electronicDisclosures"
                      : isWebcastsPage
                      ? "webcasts"
                      : "publicDisclosures"
                  }.title`
                )}`}
              </Link> */}
                </div>
              )
            ) : (
              <div className="text-center py-20">
                {isEnglish
                  ? "Failed to load press releases. Please try again later."
                  : "보도 자료를 불러오지 못했습니다. 나중에 다시 시도해주세요."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PressDetails;
