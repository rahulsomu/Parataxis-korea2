import React, { createContext, useContext, useState, useCallback } from "react";

const TranslationContext = createContext();

export const LanguageProvider = ({ children }) => {
  const hasLanguageSelected = sessionStorage.getItem("language");
  const [isEnglish, setIsEnglish] = useState(
    hasLanguageSelected ? hasLanguageSelected : true
  );
  const t = {
    nav: {
      strategy: isEnglish ? 'Strategy' : '전략',
      investors: isEnglish ? 'Investors' : '투자자',
      team: isEnglish ? 'Team' : '팀',
      media: isEnglish ? 'Media' : '미디어',
      earnings: isEnglish ? 'Earnings' : '실적',
      day: isEnglish ? 'DAY' : '주간',
      night: isEnglish ? 'NIGHT' : '야간',
    },
    hero: {
      badge: isEnglish ? 'KOSPI listed • BTC Pure Play' : 'KOSPI 상장 • BTC 순수 투자',
      title1: isEnglish ? 'Bridging' : '자본을',
      title2: isEnglish ? 'Capital to' : '디지털',
      title3: isEnglish ? 'Digital Assets.' : '자산으로.',
      description: isEnglish 
        ? 'Parataxis Korea is the institutional pressure valve for the domestic market, providing high-conviction exposure to the Bitcoin economy through a transparent public wrapper.'
        : 'Parataxis Korea는 국내 시장의 제도적 압력 밸브로서 투명한 공개 래퍼를 통해 비트코인 경제에 대한 확신 있는 노출을 제공합니다.',
      corporateProfile: isEnglish ? 'Corporate Profile' : '기업 프로필',
      latestFilings: isEnglish ? 'Latest Filings' : '최신 공시',
      fyOutlook: isEnglish ? 'FY2026 Outlook' : '2026 회계연도 전망',
      targetMining: isEnglish ? 'Target Mining Capacity' : '목표 채굴 용량',
      treasuryGoal: isEnglish ? 'Treasury Goal' : '재무 목표',
      operational: isEnglish ? 'Operationally Vertical' : '운영상 수직 통합',
      banner: isEnglish 
        ? '2026Q1 Investor Relations meeting set for February 29th, 2026. Register <a href="https://www.naver.com" class="underline decoration-orange-600 hover:text-orange-600" target="_blank" rel="noopener noreferrer">today</a>!'
        : '2026년 1분기 투자자 관계 회의가 2026년 2월 29일로 예정되어 있습니다. <a href="https://www.naver.com" class="underline decoration-orange-600 hover:text-orange-600" target="_blank" rel="noopener noreferrer">오늘</a> 등록하세요!'
    },
    media: {
      heading: isEnglish ? 'Media Center' : '미디어 센터',
      title: isEnglish ? 'Featured Media' : '주요 미디어',
      viewLibrary: isEnglish ? 'View Full Media Library' : '전체 미디어 라이브러리 보기'
    },
    pillars: {
      heading: isEnglish ? 'Strategic Infrastructure' : '전략적 인프라',
      title: isEnglish ? 'Four Pillars of Dominance' : '4대 핵심 기둥'
    },
    investors: {
      title: isEnglish ? 'Investor Hub' : '투자자 허브',
      description: isEnglish
        ? 'We maintain rigorous transparency through regular disclosures. Access our latest earnings calls, operational updates, and media segments.'
        : '정기적인 공시를 통해 엄격한 투명성을 유지합니다. 최신 실적 발표, 운영 업데이트 및 미디어 세그먼트에 액세스하세요.',
      earningsPresentation: isEnglish ? 'Latest Earnings Presentation' : '최신 실적 발표',
      pressReleases: isEnglish ? 'Press Releases' : '보도 자료'
    },
    team: {
      heading: isEnglish ? 'Leadership' : '리더십',
      title: isEnglish ? 'Our Team' : '우리 팀',
      description: isEnglish
        ? 'Meet the industry veterans and technical specialists leading Parataxis Korea\'s mission to bridge institutional capital with Bitcoin infrastructure.'
        : 'Parataxis Korea의 제도적 자본과 비트코인 인프라를 연결하는 임무를 이끄는 업계 베테랑과 기술 전문가를 만나보세요.',
      viewFull: isEnglish ? 'View Full Team' : '전체 팀 보기',
      achievements: isEnglish ? 'Key Achievements' : '주요 성과',
      profile: isEnglish ? 'Full Team Profile' : '전체 팀 프로필'
    },
    footer: {
      network: isEnglish ? 'Network' : '네트워크',
      investors: isEnglish ? 'Investors' : '투자자',
      globalOffice: isEnglish ? 'Global Office' : '글로벌 오피스',
      strategyPillars: isEnglish ? 'Strategy Pillars' : '전략 기둥',
      miningOps: isEnglish ? 'Mining Operations' : '채굴 운영',
      institutional: isEnglish ? 'Institutional Portal' : '기관 포털',
      earningsFilings: isEnglish ? 'Earnings & Filings' : '실적 및 공시',
      governance: isEnglish ? 'Governance' : '거버넌스',
      mediaCenter: isEnglish ? 'Media Center' : '미디어 센터',
      address1: isEnglish ? 'Gwanghwamun-ro, Jongno-gu' : '종로구 광화문로',
      address2: isEnglish ? 'Seoul, Republic of Korea' : '대한민국 서울',
      tagline1: isEnglish ? 'Strategic Juxtaposition' : '전략적 병치',
      tagline2: isEnglish ? 'Institutional Integrity' : '제도적 무결성',
      tagline3: isEnglish ? 'Digital Sovereignty' : '디지털 주권',
      copyright: isEnglish ? '© 2025 Parataxis Korea Co., Ltd. All Rights Reserved.' : '© 2025 Parataxis Korea Co., Ltd. 모든 권리 보유.',
      privacy: isEnglish ? 'Privacy' : '개인정보',
      legal: isEnglish ? 'Legal' : '법률',
      audit: isEnglish ? 'Audit' : '감사'
    }
  };

 const toggleLanguage = useCallback(() => {
      setIsEnglish(prev => !prev);
    }, []);

  const value = {
   t,
    isEnglish,
    toggleLanguage
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
