import React, { useEffect, useState } from "react";

const PriceTracker = () => {
  const [prices, setPrices] = useState({
    stock: 12450,
    btc: 96420.5,
    hashrate: 14.2,
    efficiency: 18.5,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices((prev) => ({
        stock: prev.stock + (Math.random() - 0.45) * 20,
        btc: prev.btc + (Math.random() - 0.5) * 50,
        hashrate: 14.2 + Math.random() * 0.1,
        efficiency: 18.5,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="bg-black text-white py-2 px-6 border-b border-slate-800 sticky top-0 z-[60]">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-[10px] md:text-xs font-mono tracking-widest uppercase">
        <div className="flex gap-8 items-center overflow-x-auto no-scrollbar whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">PARATAXIS (KOSPI):</span>
            <span className="text-emerald-400 font-bold">
              ₩{Math.floor(prices.stock).toLocaleString()}
            </span>
            <span className="text-emerald-500 text-[9px]">+1.42%</span>
          </div>
          <div className="flex items-center gap-2 border-l border-slate-800 pl-8">
            <span className="text-slate-500">BTC/USD:</span>
            <span className="text-orange-500 font-bold">
              $
              {prices.btc.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
          <div className="hidden lg:flex items-center gap-2 border-l border-slate-800 pl-8">
            <span className="text-slate-500">GLOBAL HASHRATE:</span>
            <span className="text-white">
              {prices.hashrate.toFixed(1)} EH/S
            </span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-orange-600 font-bold ml-4">
          <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse"></div>
          LIVE
        </div>
      </div>
    </div>
  );
};

export default PriceTracker;
