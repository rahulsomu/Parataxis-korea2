import { Cpu, Globe, ShieldCheck, TrendingUp } from 'lucide-react';
import React from 'react'
import { useTranslation } from '../../context/LanguageProvider';
import { useTheme } from '../../context/ThemeProvider';

const pillars = [
    {
      title: "BTC Treasury Strategy",
      icon: <ShieldCheck className="text-orange-600" />,
      desc: "Aggressive balance sheet transformation using Bitcoin as the primary reserve asset, creating a high-beta institutional wrapper.",
      metrics: ["Target: 1,000+ BTC", "85% Reserve Ratio"]
    },
    {
      title: "Bitcoin Mining Expansion",
      icon: <Cpu className="text-orange-600" />,
      desc: "Vertically integrated mining facilities generating organic BTC yield. Scaling to 100MW+ infrastructure capacity by 2026.",
      metrics: ["14.2 EH/s Active", "Target: 50 EH/s"]
    },
    {
      title: "Strategic Arbitrage",
      icon: <TrendingUp className="text-orange-600" />,
      desc: "Leveraging the 'Kimchi Premium' through structural arbitrage and supply-side optimization to capture market inefficiencies.",
      metrics: ["Avg Premium: 4.2%", "Flow Optimization"]
    },
    {
      title: "Institutional Access",
      icon: <Globe className="text-orange-600" />,
      desc: "Providing the first pure-play BTC equity vehicle on KOSPI/KOSDAQ, removing regulatory barriers for traditional funds.",
      metrics: ["KOSPI Listing", "Tier 1 Audited"]
    }
  ];

const PillarsSection = () => {
  const { t } = useTranslation()
  const { isDayMode } = useTheme();
  return (
         <section id="pillars" className={`py-32 ${isDayMode ? 'bg-slate-50' : 'bg-slate-950'}`}>
           <div className="max-w-7xl mx-auto px-6">
             <div className="mb-24 text-center max-w-3xl mx-auto">
               <h2 className="text-xs font-black text-orange-600 uppercase tracking-[0.5em] mb-6">{t.pillars.heading}</h2>
               <h3 className={`text-5xl md:text-6xl font-black tracking-tighter uppercase mb-8 ${isDayMode ? 'text-black' : 'text-white'}`}>{t.pillars.title}</h3>
               <div className={`w-20 h-2 ${isDayMode ? 'bg-black' : 'bg-white'} mx-auto mb-8`}></div>
             </div>
   
             <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-px ${isDayMode ? 'bg-slate-200 border-slate-200' : 'bg-slate-800 border-slate-800'} border`}>
               {pillars.map((pillar, idx) => (
                 <div key={idx} className={`${isDayMode ? 'bg-white hover:bg-black' : 'bg-slate-900 hover:bg-orange-600'} p-12 group transition-all duration-500 cursor-default`}>
                   <div className={`mb-10 w-14 h-14 ${isDayMode ? 'bg-slate-50' : 'bg-slate-800'} flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors`}>
                     {React.cloneElement(pillar.icon, { className: "group-hover:text-white transition-colors" })}
                   </div>
                   <h4 className={`text-2xl font-black uppercase tracking-tighter mb-6 ${isDayMode ? 'text-black' : 'text-white'} group-hover:text-white transition-colors`}>
                     {pillar.title.split(' ')[0]} <br/> {pillar.title.split(' ').slice(1).join(' ')}
                   </h4>
                   <p className={`text-sm ${isDayMode ? 'text-slate-500' : 'text-slate-400'} leading-relaxed mb-10 group-hover:text-slate-200 transition-colors`}>
                     {pillar.desc}
                   </p>
                   <div className="space-y-3">
                     {pillar.metrics.map((metric, i) => (
                       <div key={i} className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 bg-orange-600"></div>
                         <span className={`text-[10px] font-black uppercase tracking-widest ${isDayMode ? 'text-slate-900' : 'text-white'} group-hover:text-white transition-colors`}>{metric}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </section>
  )
}

export default PillarsSection
