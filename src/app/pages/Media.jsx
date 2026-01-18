import React, { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { dashboardMediaGetAllApiUrl, mediaApiUrl } from "../../constants";
import axios from "axios";
// import { FaArrowLeft } from "react-icons/fa";
// import { useTranslation } from "../../context/TranslationContext";
// import axios from 'axios';
// import { mediaApiUrl } from '../../constants';
// import Loader from "../../components/loader/Loader";
// import { MdError } from "react-icons/md";
// import Dropdown from "../../components/dropdown/Dropdown";
// import './media.css'
// import MediaItem from '../../components/mediaItem/MediaItem';
import {
  ChevronLeft,
  Play,
  Pause,
  Film,
  ArrowLeft,
  Sun,
  Moon,
  X,
  Tag,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ImageWithFallback } from "../components/ui/ImageWithFallback";
import { useTheme } from "../context/ThemeProvider";
import { useTranslation } from "../context/LanguageProvider";
import VideoPlayer from "../components/videoPlayer/VideoPlayer";
import Loader from "../components/Loader/Loader";

const Media = ({ heading }) => {
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
  const { isDayMode, toggleTheme } = useTheme();
  const { t, isEnglish, toggleLanguage } = useTranslation();
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [playMode, setPlayMode] = useState(true);
  const [searchParams] = useSearchParams();
  const idFromUrl = searchParams.get("id");

  // Get pinned videos
  const pinnedVideos = list?.data?.data?.filter((video) => video.pinned);
  const categories = Array.from(
    new Set(list?.data?.data?.map((video) => video.tags[0])),
  ).sort();
  // Get all unique categories from videos
  // const categories = Array.from(new Set(list?.data?.data?.map(video => video.tags[0]))).sort();

  // Get videos by category
  const getVideosByCategory = (category) => {
    return list?.data?.data?.filter((video) => video.tags[0] === category);
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };
  function isValidJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }
  const fetchData = async () => {
    setList({ ...list, fetching: true, success: false, data: [], error: null });
    try {
      let params = {
        limit: 10,
        page: pageNumber,
        sort: sortOrder === "Newest" ? 1 : 0,
      };
      const url = dashboardMediaGetAllApiUrl(params);
      const response = await axios.get(url);
      if (response.status === 200) {
        setList({ ...list, fetching: false, success: true, error: null });
        if (response.data) {
          const data = response.data
            ?.filter((item) => isValidJSON(item.data))
            .map((item) => ({
              ...JSON.parse(item.data),
              id: item.id,
            }));
          const dataWithTags = data.map((item) => {
            let tags = [];
            if (item.tags) {
              tags = item.tags.split(",").map((tag) => tag.trim());
            }
            return {
              ...item,
              tags: tags,
            };
          });
          setList({ ...list, success: true, data: { data: dataWithTags } });
          if (idFromUrl) {
            const videoFromUrl = data.find(
              (video) => video.id == parseInt(idFromUrl),
            );
            setSelectedVideo(videoFromUrl || data[0]);
          } else setSelectedVideo(data[0]);
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
  const handlePlayMode = () => {
    setPlayMode(true);
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
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [pageNumber, sortOrder]);

  return (
    <div
      className={`min-h-screen ${
        isDayMode ? "bg-white text-slate-900" : "bg-slate-900 text-white"
      } transition-colors duration-300 `}
    >
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
        <div className="mb-16">
          <div className="text-xs font-black text-orange-600 uppercase tracking-[0.5em] mb-6">
            {t.mediaPage.subtitle}
          </div>
          <h1
            className={`text-5xl md:text-7xl font-black tracking-tighter uppercase ${
              isDayMode ? "text-black" : "text-white"
            }`}
          >
            {t.mediaPage.title}
          </h1>
        </div>

        {/* Two Column Layout: Video Player Left, Categories Right */}
        {list.fetching ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : list.success ? (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Video Player and Pinned Videos */}
            <div className="flex-1 lg:w-0">
              {/* Video Player Area */}
              <div className="mb-12">
                <div
                  className={`text-xs font-black uppercase tracking-widest mb-4 ${
                    isDayMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {t.mediaPage.nowPlaying}
                </div>
                {playMode ? (
                  <VideoPlayer url={selectedVideo?.mediaUrl} />
                ) : (
                  <div className="relative aspect-video bg-black mb-6 overflow-hidden">
                    <ImageWithFallback
                      src={selectedVideo?.thumbnail}
                      alt={selectedVideo?.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <button
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-orange-600/80 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-orange-600 transition-colors"
                      onClick={handlePlayMode}
                    >
                      <Play
                        fill="white"
                        size={32}
                        className="text-white ml-1"
                      />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-600 bg-orange-900/30 backdrop-blur-sm px-2 py-0.5 rounded-sm">
                          {selectedVideo.tags[0]}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {formatDate(selectedVideo?.date)}
                        </span>
                      </div>
                      <h2 className="text-3xl font-black uppercase tracking-tighter mb-3 text-white">
                        {selectedVideo?.title}
                      </h2>
                      <p className="text-slate-300 mb-4 max-w-3xl">
                        {selectedVideo?.fullDescription}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                        <Film size={12} className="text-orange-600" />{" "}
                        {selectedVideo?.duration}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Pinned Videos Carousel */}
              <div>
                <div
                  className={`text-xs font-black uppercase tracking-widest mb-6 ${
                    isDayMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {t.mediaPage.pinnedVideos}
                </div>
                <div className="overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 scrollbar-thin">
                  <div className="flex gap-4 min-w-min">
                    {list?.data?.data?.map((video) => (
                      <div
                        key={video.id}
                        onClick={() => setSelectedVideo(video)}
                        className={`cursor-pointer group flex-shrink-0 w-[280px] md:w-[320px] ${
                          selectedVideo?.id === video.id
                            ? "ring-2 ring-orange-600"
                            : ""
                        }`}
                      >
                        <div className="relative aspect-video overflow-hidden bg-black mb-3">
                          <ImageWithFallback
                            src={video.thumbnail}
                            alt={video.heading}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-orange-600/80 rounded-full flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play
                              fill="white"
                              size={18}
                              className="text-white ml-0.5"
                            />
                          </div>
                          <div className="absolute top-3 left-3">
                            {video.tags &&
                              Array.isArray(video.tags) &&
                              video.tags.length > 0 && (
                                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-orange-600 bg-orange-900/30 backdrop-blur-sm px-1.5 py-0.5 rounded-sm">
                                  {video.tags[0]}
                                </span>
                              )}
                          </div>
                          <div className="absolute bottom-2 right-2">
                            <span className="text-[9px] font-bold text-white bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded-sm">
                              {video.duration}
                            </span>
                          </div>
                        </div>
                        <h3
                          className={`text-sm font-black uppercase tracking-tighter mb-1 line-clamp-2 ${
                            isDayMode
                              ? "text-black group-hover:text-orange-600"
                              : "text-white group-hover:text-orange-600"
                          } transition-colors`}
                        >
                          {video.title}
                        </h3>
                        <p
                          className={`text-xs ${
                            isDayMode ? "text-slate-500" : "text-slate-400"
                          }`}
                        >
                          {video.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Category Navigation */}
            <div className="w-full lg:w-[380px] flex-shrink-0 lg:sticky lg:top-[140px] lg:self-start">
              <div
                className={`text-xs font-black uppercase tracking-widest mb-6 ${isDayMode ? "text-slate-500" : "text-slate-400"}`}
              >
                {t.mediaPage.allVideos}
              </div>

              <div className="space-y-4">
                {categories.map((category) => {
                  const categoryVideos = getVideosByCategory(category);
                  const isExpanded = expandedCategories.includes(category);

                  return (
                    <div
                      key={category}
                      className={`border-2 ${isDayMode ? "border-slate-200" : "border-slate-700"} overflow-hidden transition-all`}
                    >
                      <button
                        onClick={() => toggleCategory(category)}
                        className={`w-full flex items-center justify-between p-4 ${
                          isExpanded
                            ? "bg-orange-600 text-white"
                            : isDayMode
                              ? "bg-white text-slate-900 hover:bg-slate-50"
                              : "bg-slate-800 text-white hover:bg-slate-750"
                        } transition-all`}
                      >
                        <div className="flex flex-col items-start gap-2">
                          <div className="flex items-center gap-2">
                            <Tag
                              size={14}
                              className={
                                isExpanded ? "text-white" : "text-orange-600"
                              }
                            />
                            <h3 className="text-[11px] font-black uppercase tracking-wider">
                              {category}
                            </h3>
                          </div>
                          <span
                            className={`text-[9px] font-bold ${isExpanded ? "text-orange-200" : isDayMode ? "text-slate-500" : "text-slate-400"}`}
                          >
                            {categoryVideos.length}{" "}
                            {categoryVideos.length === 1 ? "video" : "videos"}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </button>

                      {isExpanded && (
                        <div
                          className={`${isDayMode ? "bg-slate-50" : "bg-slate-800/50"}`}
                        >
                          <div className="divide-y ${isDayMode ? 'divide-slate-200' : 'divide-slate-700'}">
                            {categoryVideos.map((video) => (
                              <div
                                key={video.id}
                                onClick={() => setSelectedVideo(video)}
                                className={`cursor-pointer group p-3 hover:bg-orange-600/10 transition-colors ${selectedVideo.id === video.id ? "bg-orange-600/20" : ""}`}
                              >
                                <div className="flex gap-3">
                                  <div className="relative w-24 h-16 flex-shrink-0 overflow-hidden bg-black">
                                    <ImageWithFallback
                                      src={video.thumbnail}
                                      alt={video.heading}
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Play
                                        fill="white"
                                        size={12}
                                        className="text-white"
                                      />
                                    </div>
                                    <div className="absolute bottom-1 right-1">
                                      <span className="text-[7px] font-bold text-white bg-black/70 px-1 py-0.5 rounded-sm">
                                        {video.duration}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4
                                      className={`text-[11px] font-black uppercase tracking-tight mb-1 line-clamp-2 ${isDayMode ? "text-black group-hover:text-orange-600" : "text-white group-hover:text-orange-600"} transition-colors`}
                                    >
                                      {isEnglish
                                        ? video.heading
                                        : video.koreanHeading
                                          ? video.koreanHeading
                                          : video.heading}
                                    </h4>
                                    <p
                                      className={`text-[9px] ${isDayMode ? "text-slate-500" : "text-slate-400"}`}
                                    >
                                      {formatDate(video.date)}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <p>Error Loading Media</p>
        )}
      </div>
    </div>
  );
};

export default Media;
