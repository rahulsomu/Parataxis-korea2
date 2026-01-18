import React, { useEffect, useState } from "react";
import "./dashboardList.css";
import Loader from "../../components/Loader/Loader";
import {
  dashboardElectronicDisclosuresGetAllApiUrl,
  dashboardMediaGetAllApiUrl,
  dashboardPressGetAllApiUrl,
  dashboardPublicDisclosuresGetAllApiUrl,
  dashboardWebcastsGetAllApiUrl,
} from "../../../constants";
// import { MdError } from "react-icons/md";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "../../components/dropdown/Dropdown";
import AddForm from "../../components/addForm/AddForm";
import DashboardListItem from "../../components/dashboardListItem/DashboardListItem";
import { ArrowLeft, SquarePlus } from "lucide-react";
import { useTheme } from "../../context/ThemeProvider";
import { useTranslation } from "../../context/LanguageProvider";

const DashboardList = ({ heading }) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    window.location.href = "/admin";
  }
  const isPressPage = heading === "News";
  const isElectronicDisclosurePage = heading === "Electronic Disclosures";
  const isWebcastsPage = heading === "Webcasts and Presentations";
  const isPublicDisclosurePage = heading === "Public FSC Disclosures";
  const isMediaPage = heading === "Media";
  const [list, setList] = useState({
    fetching: false,
    success: false,
    data: [],
    error: null,
  });
  const location = useLocation();
  const { pageNo = 1 } = location.state || {};

  const [pageNumber, setPageNumber] = useState(pageNo);
  const order = sessionStorage.getItem("sort");
  const [sortOrder, setSortOrder] = useState(order || "Newest");
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const { isDayMode } = useTheme();
  const { t, isEnglish } = useTranslation();

  function isValidJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }

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
            : isMediaPage
              ? dashboardMediaGetAllApiUrl(params)
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
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Link
          to="/dashboard"
          className={`flex items-center gap-2 mb-4 text-[11px] font-black uppercase tracking-widest ${
            isDayMode
              ? "text-slate-500 hover:text-black"
              : "text-slate-400 hover:text-white"
          } transition-colors`}
        >
          <ArrowLeft size={16} />
          {/* {`${translate("buttons.backToHome")}`} */}
          {"Back to Dashboard"}
        </Link>
        <div className="heading">
          <h1
            className={`text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 ${
              isDayMode ? "text-black" : "text-white"
            }`}
          >
            {isPressPage
              ? "Press Releases"
              : isElectronicDisclosurePage
                ? "Electronic Disclosures"
                : isWebcastsPage
                  ? "Webcasts and Presentations"
                  : isMediaPage
                    ? "Media"
                    : "Public FSC Disclosures"}
          </h1>
        </div>
        <button
          onClick={() => setAddFormVisible(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2 mb-6"
        >
          <SquarePlus size={16} />
          Add Record
        </button>
        <div className="content">
          {addFormVisible ? (
            <AddForm
              setAddFormVisible={setAddFormVisible}
              isPressPage={isPressPage}
              isMediaPage={isMediaPage}
              isPublicDisclosurePage={isPublicDisclosurePage}
              isElectronicDisclosurePage={isElectronicDisclosurePage}
              isWebcastsPage={isWebcastsPage}
              fetchData={fetchData}
            />
          ) : null}
          {list.fetching ? (
            <div className="loader flex justify-center items-center">
              <Loader />
            </div>
          ) : list.success ? (
            <div className="list-container">
              {list?.data && list?.data?.length > 0 ? (
                <>
                  <Dropdown value={sortOrder} onChange={handleDropdown} />
                  {list.data?.map((item, index) => {
                    return (
                      <DashboardListItem
                        item={item}
                        key={index}
                        isPressPage={isPressPage}
                        isElectronicDisclosurePage={isElectronicDisclosurePage}
                        isPublicDisclosurePage={isPublicDisclosurePage}
                        isMediaPage={isMediaPage}
                        isWebcastsPage={isWebcastsPage}
                        pageNumber={pageNumber}
                        fetchData={fetchData}
                      />
                    );
                  })}
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
                <div className="error-screen">
                  {/* <MdError /> */}
                  <p>No records found!</p>
                </div>
              )}
            </div>
          ) : (
            <div className="error-screen">
              {/* <MdError /> */}
              <p>Something went wrong!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardList;
