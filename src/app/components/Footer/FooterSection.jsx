import React from "react";
import { ImageWithFallback } from "../ui/ImageWithFallback";
import { useTranslation } from "../../context/LanguageProvider";

const FooterSection = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-black text-white pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-10">
              <ImageWithFallback
                src="https://wimg.mk.co.kr/news/cms/202509/17/news-p.v1.20250917.575a07f52b6e4b5ab904349f55a2d436_P1.jpg"
                alt="Parataxis Korea Logo white"
                className="h-24 w-auto object-contain invert -my-4"
              />
            </div>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest leading-loose">
              {t.footer.tagline1} <br />
              {t.footer.tagline2} <br />
              {t.footer.tagline3}
            </p>
          </div>

          <div>
            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-10">
              {t.footer.network}
            </h5>
            <ul className="space-y-5 text-[11px] font-black uppercase tracking-widest text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t.footer.strategyPillars}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t.footer.miningOps}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t.footer.institutional}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-10">
              {t.footer.investors}
            </h5>
            <ul className="space-y-5 text-[11px] font-black uppercase tracking-widest text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t.footer.earningsFilings}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t.footer.governance}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t.footer.mediaCenter}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-10">
              {t.footer.globalOffice}
            </h5>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
              {t.footer.address1} <br />
              {t.footer.address2} <br />
              <span className="text-white mt-4 block underline underline-offset-4 decoration-orange-600">
                ir@parataxis.co.kr
              </span>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
          <span>
            &copy;{`${new Date().getFullYear()} ${t.footer.copyright}`}
          </span>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">
              {t.footer.privacy}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t.footer.legal}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t.footer.audit}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
