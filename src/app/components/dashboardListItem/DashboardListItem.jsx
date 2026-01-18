import React from "react";
import "./dashboardListItem.css";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  electronicNoticesDataApiUrl,
  mediaDataApiUrl,
  pressDataApiUrl,
  publicDisclosuresDataApiUrl,
  webcastsDataApiUrl,
} from "../../../constants";
import axios from "axios";
import Modal from "../modal/Modal";
import AddForm from "../addForm/AddForm";
import { Calendar, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "../../context/LanguageProvider";
import { useTheme } from "../../context/ThemeProvider";

const DashboardListItem = ({
  item,
  isPressPage,
  pageNumber,
  isElectronicDisclosurePage,
  isPublicDisclosurePage,
  isMediaPage,
  isWebcastsPage,
  fetchData,
}) => {
  const {
    date,
    heading,
    downloadLink,
    koreanHeading,
    downloadLinks = [],
    ID,
  } = item;
  const { isEnglish } = useTranslation();
  const token = sessionStorage.getItem("token");
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const { isDayMode } = useTheme();
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

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = () => {
    if (!ID) return;
    const payload = {
      id: ID,
    };
    const url = isPressPage
      ? pressDataApiUrl
      : isElectronicDisclosurePage
        ? electronicNoticesDataApiUrl
        : isPublicDisclosurePage
          ? publicDisclosuresDataApiUrl
          : isMediaPage
            ? mediaDataApiUrl
            : isWebcastsPage
              ? webcastsDataApiUrl
              : "";
    try {
      axios
        .delete(url, {
          headers: { Authorization: `Bearer ${token}` },
          data: payload,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Record deleted successfully");
            closeDeleteModal();
            fetchData();
          }
        });
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div
      className={`group ${
        isDayMode
          ? "bg-slate-50 hover:bg-slate-100"
          : "bg-slate-800 hover:bg-slate-700"
      } transition-colors mb-2`}
    >
      <div className="p-8 md:p-10">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
          {showEditModal ? (
            <AddForm
              setAddFormVisible={setShowEditModal}
              isPressPage={isPressPage}
              isMediaPage={isMediaPage}
              isPublicDisclosurePage={isPublicDisclosurePage}
              isElectronicDisclosurePage={isElectronicDisclosurePage}
              isWebcastsPage={isWebcastsPage}
              fetchData={fetchData}
              isEditMode={true}
              existingData={item}
            />
          ) : null}
          {showDeleteModal ? (
            <Modal onClose={closeDeleteModal}>
              <div
                className={`delete-modal relative p-4 group ${
                  isDayMode ? "bg-slate-100" : "bg-slate-800"
                } transition-colors`}
              >
                <p
                  className={`text-lg p-4 ${
                    isDayMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  Do you want to delete this Record?
                </p>
                <div className="delete-buttons">
                  <button
                    className={`flex items-center justify-between gap-3 px-5 py-3 border-2 ${
                      isDayMode
                        ? "border-slate-200  hover:border-black hover:bg-black hover:text-white"
                        : "border-slate-600 text-white hover:border-white hover:bg-white hover:text-black"
                    } transition-all group/kr`}
                    onClick={closeDeleteModal}
                  >
                    Cancel
                  </button>
                  <button
                    className={`flex items-center justify-between gap-3 px-5 py-3 border-2 ${
                      isDayMode
                        ? "border-red-600 text-white hover:bg-red-700 text-white bg-red-600"
                        : "border-red-600 text-white hover:bg-red-700 text-black bg-red-600"
                    } transition-all group/kr`}
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </Modal>
          ) : null}

          <div className="lg:w-48 flex-shrink-0">
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
          </div>
          <div className="flex-1">
            <Link
              to={
                isPressPage
                  ? `/press-details?id=${ID}&pageNo=${pageNumber}`
                  : isElectronicDisclosurePage
                    ? `/electronic-disclosures-details?id=${ID}&pageNo=${pageNumber}`
                    : isWebcastsPage
                      ? `/webcasts-details?id=${ID}&pageNo=${pageNumber}`
                      : isPublicDisclosurePage
                        ? `/public-disclosures-details?id=${ID}&pageNo=${pageNumber}`
                        : `/media-details?id=${ID}&pageNo=${pageNumber}`
              }
              className={`group/title inline-block mb-4`}
              state={{ ...item, pageNo: pageNumber }}
            >
              <h2
                className={`text-2xl md:text-3xl font-black tracking-tighter mb-4 ${
                  isDayMode
                    ? "text-black group-hover/title:text-orange-600"
                    : "text-white group-hover/title:text-orange-600"
                } transition-colors inline-flex items-start gap-3`}
              >
                {isEnglish ? heading : koreanHeading ? koreanHeading : heading}
                <ExternalLink
                  size={20}
                  className="opacity-0 group-hover/title:opacity-100 transition-opacity mt-1 flex-shrink-0"
                />
              </h2>
            </Link>
          </div>
          <div className="lg:w-64 flex-shrink-0">
            <div className="flex flex-col gap-3">
              <button
                className={`flex items-center justify-between gap-3 px-5 py-3 border-2 ${
                  isDayMode
                    ? "border-slate-200 hover:border-black hover:bg-black hover:text-white"
                    : "border-slate-600 hover:border-white hover:bg-white hover:text-black"
                } transition-all group/kr`}
                onClick={() => setShowEditModal(true)}
              >
                <span>Edit</span>
                <Pencil size={16} />
              </button>
              <button
                className={`flex items-center justify-between gap-3 px-5 py-3 border-2 ${
                  isDayMode
                    ? "border-slate-200 hover:border-red-600 hover:bg-red-600 hover:text-white"
                    : "border-slate-600 hover:border-red-600 hover:bg-red-600 hover:text-white"
                } transition-all group/kr`}
                onClick={() => setShowDeleteModal(true)}
              >
                <span>Delete</span>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardListItem;
