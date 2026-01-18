import React from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeProvider";
// import { useTranslation } from "../../context/TranslationContext";

const dashboardItems = [
  {
    id: 1,
    label: "Press",
    route: "/dashboard/press",
    translationKey: "pressDetails",
  },
  {
    id: 2,
    label: "Public FSC Disclosures",
    route: "/dashboard/public-disclosures",
    translationKey: "publicDisclosures",
  },
  {
    id: 3,
    label: "Electronic Disclosures",
    route: "/dashboard/electronic-disclosures",
    translationKey: "electronicDisclosures",
  },
  { id: 4, label: "Media", route: "/dashboard/media", translationKey: "media" },
  {
    id: 5,
    label: "Webcasts and Presentations",
    route: "/dashboard/webcasts",
    translationKey: "webcasts",
  },
];

const Dashboard = () => {
  // const { translate } = useTranslation();
  const { isDayMode } = useTheme();
  const token = sessionStorage.getItem("token");
  if (!token) {
    window.location.href = "/admin";
  }
  return (
    <div
      className={`min-h-screen ${
        isDayMode ? "bg-white text-slate-900" : "bg-slate-900 text-white"
      } transition-colors duration-300`}
    >
      <div className="dashboard">
        <h1
          className={`text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 ${
            isDayMode ? "text-black" : "text-white"
          }`}
        >
          Dashboard
        </h1>
        <div className="dashboard-grid">
          {dashboardItems.map((item) => (
            <Link to={item.route} key={item.id}>
              <div
                key={item.id}
                className={`dashboard-item w-full flex items-center justify-between p-6 ${
                  isDayMode
                    ? "bg-slate-100 hover:bg-slate-200"
                    : "bg-slate-800 text-white hover:bg-slate-700"
                } font-black uppercase tracking-widest text-xs transition-all`}
              >
                <p
                  className={`text-lg max-w-3xl ${
                    isDayMode ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                  {item.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
