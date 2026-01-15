import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useTheme } from "../context/ThemeProvider";
import { useTranslation } from "../context/LanguageProvider";
import {
  dashboardElectronicDisclosuresGetAllApiUrl,
  dashboardPressGetAllApiUrl,
  dashboardPublicDisclosuresGetAllApiUrl,
  dashboardWebcastsGetAllApiUrl,
} from "../../constants";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import Dropdown from "../components/dropdown/Dropdown";
import { isValidJSON } from "../utils/utils";
import ListItem from "../components/listItem/ListItem";

const Press = ({ heading }) => {
  const { isDayMode } = useTheme();
  const { t, isEnglish } = useTranslation();
  const isPressPage = heading === "News";
  const isElectronicDisclosurePage = heading === "Electronic Disclosures";
  const isWebcastsPage = heading === "Webcasts and Presentations";
  const [list, setList] = useState({
    fetching: false,
    success: false,
    data: [],
    error: null,
    loadMoreFetching: false,
  });
  const location = useLocation();
  const { pageNo = 1 } = location.state || {};

  const [pageNumber, setPageNumber] = useState(pageNo);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const order = sessionStorage.getItem("sort");
  const [sortOrder, setSortOrder] = useState(order || "Newest");
  const fetchData = async (loadMore = false, pageToFetch) => {
    !loadMore &&
      setList({
        ...list,
        fetching: true,
        success: false,
        data: [],
        error: null,
      });
    loadMore && setList({ ...list, loadMoreFetching: true });
    try {
      let params = {
        limit: 10,
        page: loadMore ? pageToFetch : pageNumber,
        sort: sortOrder === "Newest" ? 1 : 0,
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
        setList({
          ...list,
          fetching: false,
          success: true,
          error: null,
          loadMoreFetching: false,
        });
        if (response.data) {
          const data = response.data
            ?.filter((item) => isValidJSON(item.data))
            .map((item) => ({
              ...JSON.parse(item.data),
              ID: item.id,
            }));
          if (loadMore && data.length === 0) {
            setList({
              ...list,
              loadMoreFetching: false,
            });
            return;
          }
          if (data.length < 10) {
            setShowLoadMore(false);
          }
          setList({
            ...list,
            success: true,
            data: loadMore ? [...list.data, ...data] : data,
          });
        }
      }
    } catch (error) {
      console.error(error, "error");

      setList({ ...list, fetching: false, data: [], error: true });
    }
  };
  const handleDropdown = (value) => {
    sessionStorage.setItem("sort", value);
    setPageNumber(1);
    setSortOrder(value);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [sortOrder]);

  const handleLoadMore = () => {
    setPageNumber(pageNumber + 1);
    fetchData(true, pageNumber + 1);
  };

  return (
    <div
      className={`min-h-screen ${
        isDayMode ? "bg-white text-slate-900" : "bg-slate-900 text-white"
      } transition-colors duration-300`}
    >
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <Link
          to="/"
          className={`flex items-center gap-2 mb-4 text-[11px] font-black uppercase tracking-widest ${
            isDayMode
              ? "text-slate-500 hover:text-black"
              : "text-slate-400 hover:text-white"
          } transition-colors`}
        >
          <ArrowLeft size={16} />
          {t.nav.backToHome}
        </Link>
        {/* pressPage Header */}
        <div className="mb-16">
          <div className="text-xs font-black text-orange-600 uppercase tracking-[0.5em] mb-6">
            {t.pressPage.subtitle}
          </div>
          <h1
            className={`text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 ${
              isDayMode ? "text-black" : "text-white"
            }`}
          >
            {isPressPage
              ? t.pressPage.title
              : isElectronicDisclosurePage
              ? t.electronicDisclosurePage.title
              : isWebcastsPage
              ? t.webcastsPage.title
              : t.publicDisclosuresPage.title}
          </h1>
          <p
            className={`text-lg max-w-3xl ${
              isDayMode ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {isPressPage
              ? t.pressPage.description
              : isElectronicDisclosurePage
              ? t.electronicDisclosurePage.description
              : isWebcastsPage
              ? t.webcastsPage.description
              : t.publicDisclosuresPage.description}
          </p>
        </div>

        {/* Press Releases List */}
        <div className="space-y-1 min-h-full relative">
          {list.fetching ? (
            <div className="flex items-center justify-center">
              <Loader />
            </div>
          ) : list.success ? (
            <>
              {list?.data && list?.data?.length > 0 ? (
                <>
                  <Dropdown value={sortOrder} onChange={handleDropdown} />
                  {list.data?.map((release, index) => (
                    <ListItem
                      key={index}
                      release={release}
                      isPressPage={isPressPage}
                      isElectronicDisclosurePage={isElectronicDisclosurePage}
                      isWebcastsPage={isWebcastsPage}
                      pageNumber={pageNumber}
                    />
                  ))}
                  {/* Load More Button (optional for pagination) */}
                  {list.loadMoreFetching ? (
                    <div className="flex items-center justify-center">
                      <Loader />
                    </div>
                  ) : (
                    showLoadMore && (
                      <div className="mt-16 flex justify-center">
                        {
                          <button
                            onClick={handleLoadMore}
                            className={`px-12 py-4 border-2 ${
                              isDayMode
                                ? "border-black hover:bg-black hover:text-white"
                                : "border-white hover:bg-white hover:text-black"
                            } text-[11px] font-black uppercase tracking-widest transition-all`}
                          >
                            {isEnglish ? "Load More" : "더 보기"}
                          </button>
                        }
                      </div>
                    )
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  {isEnglish
                    ? "No press releases found."
                    : "보도 자료가 없습니다."}
                </div>
              )}
            </>
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
  );
};

export default Press;
