import React, { useCallback, useEffect, useRef, useState } from "react";
import { priceSheetUrl } from "../../../constants";
import { parseGvizResponse } from "../../utils/utils";

const PriceTracker = () => {
  const [hashRate, setHashRate] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHashRate = async () => {
    try {
      const res = await fetch("https://blockchain.info/q/hashrate");
      const textData = await res.text();

      const gigahashes = parseFloat(textData);
      const exahashes = gigahashes / 1000000000;
      setHashRate(exahashes);
    } catch (e) {
      setError("Failed to load");
    }
  };

  const fetchBannerText = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch the raw CSV data
      const response = await fetch(priceSheetUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch: HTTP status ${response.status}`);
      }

      const csvText = await response.text();
      const parsedData = parseGvizResponse(csvText);
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
    data && (
      <div className="bg-black text-white py-2 px-6 border-b border-slate-800 sticky top-0 z-[60]">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] md:text-xs font-mono tracking-widest uppercase">
          <div className="flex gap-8 items-center overflow-x-auto no-scrollbar whitespace-nowrap">
            {/* <div className="flex items-center gap-2">
            <span className="text-slate-500">PARATAXIS (KOSPI):</span>
            <span className="text-emerald-400 font-bold">
              ₩{Math.floor(prices.stock).toLocaleString()}
            </span>
            <span className="text-emerald-500 text-[9px]">+1.42%</span>
          </div> */}
            {data && data["BTC/USD"] && (
              <div className="flex items-center gap-2 border-l border-slate-800 pl-8">
                <span className="text-slate-500">BTC/USD:</span>
                <span className="text-orange-500 font-bold">
                  ${data["BTC/USD"] || ""}
                </span>
              </div>
            )}
            {data && data["BTC/KRW"] && (
              <div className="flex items-center gap-2 border-l border-slate-800 pl-8">
                <span className="text-slate-500">BTC/KRW:</span>
                <span className="text-orange-500 font-bold">
                  ₩{Number(Math.round(data["BTC/KRW"])).toLocaleString("en-US")}
                </span>
              </div>
            )}
            {hashRate && (
              <div className="hidden lg:flex items-center gap-2 border-l border-slate-800 pl-8">
                <span className="text-slate-500">GLOBAL HASHRATE:</span>
                <span className="text-white">{hashRate?.toFixed(1)} EH/S</span>
              </div>
            )}
          </div>
          <div className="hidden sm:flex items-center gap-2 text-orange-600 font-bold ml-4">
            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse"></div>
            LIVE
          </div>
        </div>
      </div>
    )
  );
};

export default PriceTracker;
