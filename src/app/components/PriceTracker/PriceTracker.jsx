import React, { useEffect, useRef, useState } from "react";

const PriceTracker = () => {
  const wsRef = useRef(null);
  const [btcPrice, setBtcPrice] = useState("");
  const [kosdaqPrice, setKosdaqPrice] = useState("");
  const [usdtKrw, setUsdtKrw] = useState(null);
  const [hashRate, setHashRate] = useState(null);

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

  const fetchKosdaqData = async () => {
    try {
      const res = await fetch(
        "https://query1.finance.yahoo.com/v8/finance/chart/288330.KQ",
      );
      const json = await res.json();
      const price = json?.chart?.result?.[0]?.meta?.regularMarketPrice;
      setKosdaqPrice(price);
    } catch (e) {
      setError("Failed to load");
    }
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setPrices((prev) => ({
  //       stock: prev.stock + (Math.random() - 0.45) * 20,
  //       btc: prev.btc + (Math.random() - 0.5) * 50,
  //       hashrate: 14.2 + Math.random() * 0.1,
  //       efficiency: 18.5,
  //     }));
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    // fetchBitcoinPrice();
    // const btcInterval = setInterval(fetchBitcoinPrice, 60000); // Update BTC price every minute
    // return () => clearInterval(btcInterval);
    const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

    wsRef.current = ws;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const value = Number(data.p);
      if (!Number.isNaN(value)) {
        setBtcPrice(value);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
    };
    // const interval = setInterval(fetchKosdaqData, 3000);
    const hashrateInterval = setInterval(fetchHashRate, 10000);
    return () => {
      ws.close();
      // clearInterval(interval);
      clearInterval(hashrateInterval);
    };
  }, []);
  useEffect(() => {
    const fetchRate = async () => {
      const res = await fetch(
        "https://api.upbit.com/v1/ticker?markets=KRW-USDT",
      );
      const json = await res.json();
      setUsdtKrw(json[0].trade_price);
    };

    fetchRate();
    const interval = setInterval(fetchRate, 10000);
    return () => clearInterval(interval);
  }, []);
  return (
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
          {btcPrice && (
            <div className="flex items-center gap-2 border-l border-slate-800 pl-8">
              <span className="text-slate-500">BTC/USD:</span>
              <span className="text-orange-500 font-bold">${btcPrice}</span>
            </div>
          )}
          {usdtKrw && (
            <div className="flex items-center gap-2 border-l border-slate-800 pl-8">
              <span className="text-slate-500">BTC/KWR:</span>
              <span className="text-orange-500 font-bold">
                W
                {Number(Math.round(btcPrice * usdtKrw)).toLocaleString("en-US")}
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
  );
};

export default PriceTracker;
