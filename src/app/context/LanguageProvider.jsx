import React, { createContext, useContext, useState, useCallback } from "react";

const TranslationContext = createContext();

export const LanguageProvider = ({ children }) => {
  const hasLanguageSelected = sessionStorage.getItem("language");
  const [isEnglish, setIsEnglish] = useState(
    hasLanguageSelected ? hasLanguageSelected : true,
  );
  const t = {
    nav: {
      strategy: isEnglish ? "Strategy" : "전략",
      investors: isEnglish ? "Investors" : "투자자",
      team: isEnglish ? "Team" : "팀",
      media: isEnglish ? "Media" : "미디어",
      earnings: isEnglish ? "Earnings" : "실적",
      day: isEnglish ? "DAY" : "주간",
      night: isEnglish ? "NIGHT" : "야간",
      backToHome: isEnglish ? "Back to Home" : "홈으로",
      viewAll: isEnglish ? "View All" : "전체 보기",
    },
    hero: {
      badge: isEnglish
        ? "KOSPI listed • BTC Pure Play"
        : "KOSPI 상장 • BTC 순수 투자",
      title1: isEnglish ? "Bridging" : "자본을",
      title2: isEnglish ? "Capital to" : "디지털",
      title3: isEnglish ? "Digital Assets." : "자산으로.",
      description: isEnglish
        ? "Parataxis Korea is the institutional pressure valve for the domestic market, providing high-conviction exposure to the Bitcoin economy through a transparent public wrapper."
        : "Parataxis Korea는 국내 시장의 제도적 압력 밸브로서 투명한 공개 래퍼를 통해 비트코인 경제에 대한 확신 있는 노출을 제공합니다.",
      corporateProfile: isEnglish ? "Corporate Profile" : "기업 프로필",
      latestFilings: isEnglish ? "Latest Filings" : "최신 공시",
      fyOutlook: isEnglish ? "FY2026 Outlook" : "2026 회계연도 전망",
      targetMining: isEnglish ? "Target Mining Capacity" : "목표 채굴 용량",
      treasuryGoal: isEnglish ? "Treasury Goal" : "재무 목표",
      operational: isEnglish ? "Operationally Vertical" : "운영상 수직 통합",
      banner: isEnglish
        ? '2026Q1 Investor Relations meeting set for February 29th, 2026. Register <a href="https://www.naver.com" class="underline decoration-orange-600 hover:text-orange-600" target="_blank" rel="noopener noreferrer">today</a>!'
        : '2026년 1분기 투자자 관계 회의가 2026년 2월 29일로 예정되어 있습니다. <a href="https://www.naver.com" class="underline decoration-orange-600 hover:text-orange-600" target="_blank" rel="noopener noreferrer">오늘</a> 등록하세요!',
    },
    media: {
      heading: isEnglish ? "Media Center" : "미디어 센터",
      title: isEnglish ? "Featured Media" : "주요 미디어",
      viewLibrary: isEnglish
        ? "View Full Media Library"
        : "전체 미디어 라이브러리 보기",
    },
    pillars: {
      heading: isEnglish ? "Strategic Infrastructure" : "전략적 인프라",
      title: isEnglish ? "Four Pillars of Dominance" : "4대 핵심 기둥",
    },
    investors: {
      title: isEnglish ? "Investor Hub" : "투자자 허브",
      description: isEnglish
        ? "We maintain rigorous transparency through regular disclosures. Access our latest earnings calls, operational updates, and media segments."
        : "정기적인 공시를 통해 엄격한 투명성을 유지합니다. 최신 실적 발표, 운영 업데이트 및 미디어 세그먼트에 액세스하세요.",
      earningsPresentation: isEnglish
        ? "Latest Earnings Presentation"
        : "최신 실적 발표",
      pressReleases: isEnglish ? "Press Releases" : "보도 자료",
      fscDisclosures: isEnglish ? "FSC Disclosures (DART)" : "FSC 공시 (DART)",
      media: isEnglish ? "Media" : "미디어",
      webcasts: isEnglish ? "Webcasts" : "웹캐스트",
      publicDisclosures: isEnglish ? "Public Disclosures" : "공시",
      electronicNotices: isEnglish ? "Electronic Notices" : "전자 공지",
    },
    team: {
      heading: isEnglish ? "Leadership" : "리더십",
      title: isEnglish ? "Our Team" : "우리 팀",
      description: isEnglish
        ? "Meet the industry veterans and technical specialists leading Parataxis Korea's mission to bridge institutional capital with Bitcoin infrastructure."
        : "Parataxis Korea의 제도적 자본과 비트코인 인프라를 연결하는 임무를 이끄는 업계 베테랑과 기술 전문가를 만나보세요.",
      viewFull: isEnglish ? "View Full Team" : "전체 팀 보기",
      achievements: isEnglish ? "Key Achievements" : "주요 성과",
      profile: isEnglish ? "Full Team Profile" : "전체 팀 프로필",
    },
    footer: {
      network: isEnglish ? "Network" : "네트워크",
      investors: isEnglish ? "Investors" : "투자자",
      globalOffice: isEnglish ? "Global Office" : "글로벌 오피스",
      strategyPillars: isEnglish ? "Strategy Pillars" : "전략 기둥",
      miningOps: isEnglish ? "Mining Operations" : "채굴 운영",
      institutional: isEnglish ? "Institutional Portal" : "기관 포털",
      earningsFilings: isEnglish ? "Earnings & Filings" : "실적 및 공시",
      governance: isEnglish ? "Governance" : "거버넌스",
      mediaCenter: isEnglish ? "Media Center" : "미디어 센터",
      address1: isEnglish ? "Gwanghwamun-ro, Jongno-gu" : "종로구 광화문로",
      address2: isEnglish ? "Seoul, Republic of Korea" : "대한민국 서울",
      tagline1: isEnglish ? "Strategic Juxtaposition" : "전략적 병치",
      tagline2: isEnglish ? "Institutional Integrity" : "제도적 무결성",
      tagline3: isEnglish ? "Digital Sovereignty" : "디지털 주권",
      copyright: isEnglish
        ? "Parataxis Korea Co., Ltd. All Rights Reserved."
        : "Parataxis Korea Co., Ltd. 모든 권리 보유.",
      privacy: isEnglish ? "Privacy" : "개인정보",
      legal: isEnglish ? "Legal" : "법률",
      audit: isEnglish ? "Audit" : "감사",
    },
    mediaPage: {
      title: isEnglish ? "Media Library" : "미디어 라이브러리",
      subtitle: isEnglish ? "Full Collection" : "전체 컬렉션",
      nowPlaying: isEnglish ? "Now Playing" : "재생 중",
      allVideos: isEnglish ? "All Videos" : "모든 비디오",
      pinnedVideos: isEnglish ? "Pinned Videos" : "고정된 비디오",
    },
    pressPage: {
      subtitle: isEnglish ? "Investor Relations" : "투자자 관계",
      title: isEnglish ? "Press Releases" : "보도 자료",
      description: isEnglish
        ? "Access the latest press releases, corporate announcements, and media coverage from Parataxis Korea."
        : "Parataxis Korea의 최신 보도 자료, 기업 발표 및 미디어 보도에 액세스하세요.",
      downloadKorean: isEnglish ? "Download KR" : "한국어 다운로드",
      downloadEnglish: isEnglish ? "Download EN" : "영어 다운로드",
      viewRelease: isEnglish ? "View Full Release" : "전체 보도 자료 보기",
      categories: {
        all: isEnglish ? "All" : "전체",
        operations: isEnglish ? "Operations" : "운영",
        earnings: isEnglish ? "Earnings" : "실적",
        corporate: isEnglish ? "Corporate" : "기업",
        funding: isEnglish ? "Funding" : "자금",
        governance: isEnglish ? "Governance" : "거버넌스",
        regulatory: isEnglish ? "Regulatory" : "규제",
        events: isEnglish ? "Events" : "행사",
        research: isEnglish ? "Research" : "연구",
      },
    },
    electronicDisclosurePage: {
      title: isEnglish ? "Electronic Notices" : "전자 공지",
      description: isEnglish
        ? "Browse Parataxis Korea's electronic disclosures and regulatory filings submitted to the Financial Supervisory Service (FSS)."
        : "금융감독원(FSS)에 제출된 Parataxis Korea의 전자 공시 및 규제 공시를 찾아보세요.",
    },
    webcastsPage: {
      title: isEnglish ? "Webcasts" : "웹캐스트",
      description: isEnglish
        ? "Watch Parataxis Korea's latest webcasts, presentations, and investor calls covering financial results and strategic updates."
        : "재무 결과 및 전략적 업데이트를 다루는 Parataxis Korea의 최신 웹캐스트, 프레젠테이션 및 투자자 전화를 시청하세요.",
    },
    publicDisclosuresPage: {
      title: isEnglish ? "Public Disclosures" : "공시",
      description: isEnglish
        ? "Access Parataxis Korea's public disclosures and mandatory filings as required by the Financial Supervisory Service (FSS)."
        : "금융감독원(FSS)에서 요구하는 Parataxis Korea의 공시 및 필수 제출 서류에 액세스하세요.",
    },
    teamMembers: {
      edwardChin: {
        id: "edwardChin",
        image:
          "https://parataxis.sfo2.digitaloceanspaces.com/Photos/ed.e965575d2ba060295ffe.webp",
        name: isEnglish ? "Edward Chin" : "에드워드 진",
        designation: isEnglish
          ? "Chairman & Inside Director"
          : "회장 및 사내 이사",
        bio: isEnglish
          ? "Edward Chin is the Founder and CEO of Parataxis Holdings, and Co-founder, CEO, and Co-CIO of Parataxis Capital. Prior to Co-Founding Parataxis Capital in 2019, Ed was an investment banker at digital asset merchant bank Galaxy Digital. Before joining the digital asset space, Ed spent over a decade as an investment banker covering the Technology, Media & Telecom sectors, starting his career at Lehman Brothers. Previously, he served as a Captain in the United States Army and was a Fulbright Research Fellow in South Korea. Ed is a graduate of The Wharton School (MBA), Yonsei University (MA) and UC Berkeley (BA)."
          : "에드워드 진은 파라택시스 홀딩스의 창립자 겸 대표이사(CEO)이며, 파라택시스 캐피탈의 공동 창립자, 대표이사(CEO), 공동 최고투자책임자(CIO)를 맡고 있습니다. 미 육군 대위로 전역 후, UC 버클리 학사, 연세대 석사 및 와튼 스쿨 MBA를 졸업하였습니다. 리먼 브라더스(Lehman Brothers)에서 10년 이상 테크놀로지, 미디어 및 통신 분야의 투자은행가로 활동했으며, 2019년 파라택시스 캐피탈 설립 전에는 디지털 자산 분야의 투자은행인 갤럭시 디지털(Galaxy Digital)에서 근무했습니다.",
      },
      andrewKim: {
        id: "andrewKim",
        image:
          "https://parataxis.sfo2.digitaloceanspaces.com/Photos/andrew2.jpg",
        name: isEnglish ? "Andrew Kim" : "앤드류 김",
        designation: isEnglish
          ? "CEO & Representative Director"
          : "대표이사 및 등기 이사",
        bio: isEnglish
          ? 'Andrew Kim is CEO of Parataxis Korea, the first institutionally backed BTC treasury platform in Korea. Andrew Kim was previously a Partner at Parataxis Capital and Parataxis Holdings (collectively, "Parataxis"), a US based digital asset investment firm. Prior to joining Parataxis, Andrew was a partner at a family office, managing digital asset trading and mining infrastructure investments. Before entering the digital asset space, Andrew held an operator role at AuditBoard ($3 billion+ private equity exit), helping scale the business from $10 million in revenue to $100 million in revenue. Prior to his operating role, Andrew was a research analyst at Ares Management, a global alternative asset manager with over $500 billion in AUM, and an investment banker at Credit Suisse and Jefferies. Andrew is a graduate of New York University (BS, Finance).'
          : "국내 최초 기관 투자 비트코인 트레저리 플랫폼인 파라택시스 코리아의 대표이사(CEO)앤드류 김은 미국 기반 디지털 자산 투자회사인 파라택시스 캐피탈 및 파라택시스 홀딩스의 파트너를 역임했습니다. 파라택시스 합류 전에는 패밀리 오피스에서 디지털 자산 거래 및 채굴 인프라 투자를 담당했습니다. 디지털 자산 분야 입문 전에는 오딧보드(AuditBoard)에서 운영 역할을 맡아 연 매출 1,000만 달러에서 1억 달러로 성장시켰고(오딧보드는 30억 달러 이상의 금액에 사모펀드에 인수), 아레스 매니지먼트(Ares Management)의 분석가, 운용자산(AUM) 5,000억 달러 이상 보유한 글로벌 대체자산운용사인 Credit Suisse and Jefferies의 투자은행가로 활동했습니다. 앤드류 김은 뉴욕대 금융학 학사 졸업자입니다.",
      },
      jamesLee: {
        id: "jamesLee",
        image:
          "https://parataxis.sfo2.digitaloceanspaces.com/Photos/james.42dee4f7382d9663d70c.webp",
        name: isEnglish ? "James Lee" : "이정규",
        designation: isEnglish ? "Inside Director" : "사내 이사",
        bio: isEnglish
          ? "James Lee is a serial entrepreneur who most recently founded Bridge Biotherapeutics in 2015, and took the company public in 2019. He previously founded Rexbio Inc, a biotech focused on therapeutics and diagnostics for the treatment of pancreatic cancer. Prior to Rexbio, James co-founded CrystalGenomics a KOSDAQ listed biotech firm focused on the treatment of arthritis. Prior to being an entrepreneur, James held several roles including Deputy GM at LG Life Sciences. James is a graduate of Seoul National University (BS, Chemistry and MS, Protein Biochemistry)."
          : "2015년 브릿지바이오테라퓨틱스를 설립해 2019년 상장까지 이끈 이정규 사내이사는 서울대 화학 학사와 석사 학위를 보유하고 있습니다. LG생명과학 연구 및 사업개발을 포함한 여러 직책을 역임했으며, 그 후 관절염 치료 전문 코스닥 상장 바이오텍 기업인 크리스탈지노믹스(CrystalGenomics)의 공동 설립자이자, 췌장암 치료에 주력한 렉스바이오(Rexbio)를 설립자입니다. ",
      },
      joonKeeHong: {
        id: "joonKeeHong",
        image:
          "https://parataxis.sfo2.digitaloceanspaces.com/Photos/joonkee.5869a05f4ec239a605c9.webp",
        name: isEnglish ? "Joonkee Hong" : "홍준기",
        designation: isEnglish ? "Outside Director" : "사외 이사",
        bio: isEnglish
          ? 'Joonkee leads Vogo Fund Labs, which serves as the innovation lab of Vogo Fund Asset Management, a leading private alternative asset manager with approximately $9 billion in assets under management. Before Vogo Fund, he was Head of Korea and Asia for Cumberland DRW, a global digital assets trading firm. Joonkee offers prior board experience, having served as an independent board director of KakaoBank. He is also currently an auditor for Hashed Ventures. Prior to his digital assets career, he was Korea country head for UBS Group, Asia Head of Global Finance at Nomura, and Asia Head of Global Finance at Lehman Brothers. Joonkee has also served in various economic and policy advisory roles for government offices such as the President Office ("Blue House"), MoEF (Ministry of Economy and Finance), FSS (Financial Supervisory Service) and Bank of Korea (the central bank). Joonkee is a graduate of MIT (SB and SM in engineering, and MBA).'
          : "홍준기는 약 90억 달러 규모의 자산을 운용하는 사모 대체자산운용사인 보고펀드자산운용의 혁신 연구소, 보고펀드랩스(Vogo Fund Labs)를 이끌고 있으며, 해시드 벤처스(Hashed Ventures)의 감사위원으로도 활동하고 있습니다. MIT에서 공학 학사, 석사 및 MBA를 취득한 후, 뉴욕과 홍콩의 월스트리트 금융기관에서 파생상품과 자본시장 분야에서 오랜 경험을 쌓았습니다. 과거 Cumberland DRW 한국 및 아시아 대표, UBS 그룹 한국 총괄 대표, 카카오뱅크 사외이사, 청와대를 비롯한 정부 주요 기관(한국은행, 금융위원회 및 기획재정부) 에 경제 정책 자문을 수행하는 등 금융 산업 발전에 기여했습니다.",
      },
      anthonyChoi: {
        id: "anthonyChoi",
        image:
          "https://parataxis.sfo2.digitaloceanspaces.com/Photos/anthony.7034bf6c6dbdce431edc.webp",
        name: isEnglish ? "Anthony Choi" : "최충인",
        designation: isEnglish ? "Outside Director" : "사외 이사",
        bio: isEnglish
          ? "Anthony is a Senior Foreign Attorney at Shin & Kim with extensive experienced in cross-border M&A transactions and capital raising. His specialty includes advising global private equity and investment firms in domestic investment in Korea; Given his bicultural and bilingual differentiator Anthony has a unique advantage in cross-border transactions. Anthony was previously and attorney at Yulchon LLC, Kim & Chang, Simpson Thacher & Bartlett LLP, and Asiana Airlines Inc. Anthony is a seasoned board member serving as outside director of  TEST TECH Co., Ltd, NOROO Paint & Coatings Co., Ltd, KISG (Korea Institute for Shared Growth), and Monalisa Co., Ltd. Anthony is a graduate of Georgetown University Law Center (JD, cum laude) and Seoul National University (BA)."
          : "최충인은 법무법인 세종(Shin&Kim)의 선임 외국인 변호사로서, 크로스보더 M&A 거래와 자본 조달 분야에 많은 경험을 보유하고 있습니다. 영미권에 대한 뛰어난 이해와 언어 실력을 바탕으로 글로벌 사모펀드와 투자회사의 한국 내 투자 자문의 전문성으로 크로스보더 딜에 독보적인 경쟁력을 가지고 있습니다.   . 서울대와 조지타운 로스쿨(JD, 우등 졸업) 졸업 후 율촌,  김앤장, 심슨 대처 & 바틀렛(Simpson Thacher & Bartlett LLP), 아시아나항공에서 근무했습니다. ㈜TEST TECH, ㈜노루페인트, 한국상생연구원(KISG), ㈜모나리자에서 사외이사로 역임하였습니다.",
      },
      hyunIlHwang: {
        id: "hyunIlHwang",
        image:
          "https://parataxis.sfo2.digitaloceanspaces.com/Photos/hyunil.75d850fd5952e74eba2a.webp",
        name: isEnglish ? "Hyun-il Hwang" : "황현일",
        designation: isEnglish ? "Statutory Auditor" : "감사",
        bio: isEnglish
          ? "Hyun-il Hwang is a Partner at Shin & Kim, with extensive experience in capital markets and securities regulation. Prior to joining Shin & Kim, he was an officer at the Capital Market Investigation Unit of the Financial Services Commission (FSC). Prior to joining the FSC, he was at Samsung Securities. Hyun-il currently serves as Vice President of the Council of Financial Lawyers of the Korean Bar Association, an auditor of the Korea Fintech Industry Association, and a member of the Korea Exchange's Examination Committee for Listing on KOSDAQ Market. Hyun-il is a graduate of Sogang Law School (JD) and Korea University (BA, Politics)"
          : "황현일은 법무법인 세종(Shin&Kim)의 파트너로 자본시장과 증권 규제 분야 전문가입니다. 고려대 정치외교학과를 졸업하고 서강대 법학전문대학원을 마쳤으며, 삼성증권에 재직 및 금융위원회 자본시장조사단 사무관으로 재직하였습니다. 현재 대한변호사협회 금융변호사회 부회장, 한국핀테크산업협회 감사, 코스닥시장 상장심사위원회 위원으로도 활발히 활동 중입니다.",
      },
    },
  };

  const toggleLanguage = useCallback(() => {
    setIsEnglish((prev) => !prev);
  }, []);

  const value = {
    t,
    isEnglish,
    toggleLanguage,
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
