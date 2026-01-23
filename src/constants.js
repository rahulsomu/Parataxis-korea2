import moment from "moment";

export const TEAM_MEMBERS = [
  {
    id: 1,
    name: "Park Ji-hoon",
    title: "Chief Executive Officer",
    department: "Executive",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    shortBio:
      "Former CIO at Hana Bank with 15+ years in institutional finance and blockchain innovation.",
    fullBio:
      "Park Ji-hoon brings over 15 years of institutional finance experience to Parataxis Korea, having previously served as Chief Investment Officer at Hana Bank, one of Korea's largest financial institutions.\n\nUnder his leadership, Parataxis Korea has transformed into the KOSPI's premier pure-play Bitcoin investment vehicle, creating a regulatory-compliant bridge between traditional capital markets and digital assets.\n\nHis vision of positioning Bitcoin as an institutional treasury asset has attracted significant capital from both domestic Korean funds and international investors seeking exposure to the Korean market's unique structural advantages.",
    achievements: [
      "Secured ₩280 billion in investment capital during Series B",
      "Led acquisition of Busan Mining Operations (100MW)",
      "Pioneer of the 'Korean Bitcoin Treasury Standard' framework",
    ],
    linkedin: true,
    twitter: true,
  },
  {
    id: 2,
    name: "Kim Min-ji",
    title: "Chief Financial Officer",
    department: "Finance",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
    shortBio:
      "Previously Samsung Treasury, specializing in balance sheet innovation and regulatory compliance.",
    fullBio:
      "Kim Min-ji leads Parataxis Korea's financial strategy and treasury operations, bringing her expertise from Samsung's corporate treasury department where she managed multi-billion dollar capital allocation decisions.\n\nHer pioneering work on Parataxis Korea's Bitcoin reserve policy has created the blueprint for corporate treasury allocation among Korean institutional players, with a focus on regulatory compliance and financial transparency.\n\nMin-ji holds a Masters in Finance from Seoul National University and was recognized as one of Korea Economic Daily's '40 Under 40' finance professionals in 2024.",
    achievements: [
      "Structured Parataxis Korea's 85% Bitcoin reserve ratio framework",
      "Led compliance strategy for Korea's first public BTC balance sheet",
      "Negotiated ₩120B strategic investment from Korean pension funds",
    ],
    linkedin: true,
    twitter: false,
  },
  {
    id: 3,
    name: "Lee Sang-woo",
    title: "Chief Technology Officer",
    department: "Technology",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
    shortBio:
      "Bitcoin Core contributor and mining optimization specialist from Korea Advanced Institute of Science and Technology.",
    fullBio:
      "Dr. Lee Sang-woo oversees Parataxis Korea's mining infrastructure and technical operations, bringing deep expertise in Bitcoin protocol development and large-scale ASIC deployment.\n\nPrior to joining Parataxis, Dr. Lee was a researcher at the Korea Advanced Institute of Science and Technology (KAIST) where he specialized in cryptographic optimization and distributed systems architecture.\n\nAs a Bitcoin Core contributor, he has made significant contributions to mining efficiency optimizations and authored multiple BIPs (Bitcoin Improvement Proposals). His technical leadership has positioned Parataxis Korea as one of the most efficient mining operations in Asia.",
    achievements: [
      "Designed Parataxis Korea's 50 EH/s mining expansion roadmap",
      "Reduced mining operational costs by 23% through custom firmware",
      "Filed 6 patents for ASIC cooling innovations",
    ],
    linkedin: true,
    twitter: true,
  },
  {
    id: 4,
    name: "Choi Ji-yeon",
    title: "Chief Marketing Officer",
    department: "Marketing",
    image:
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=1989&auto=format&fit=crop",
    shortBio:
      "Brand strategist with background in institutional financial communications and digital asset positioning.",
    fullBio:
      "Choi Ji-yeon directs Parataxis Korea's market positioning and institutional communications strategy, having previously led branding for major Korean financial institutions.\n\nHer expertise in communicating complex financial instruments to institutional investors has been instrumental in establishing Parataxis Korea's reputation as a trusted gateway to Bitcoin exposure on the Korean exchanges.\n\nJi-yeon's background includes leading digital transformation initiatives at Korea Investment & Securities, where she built institutional trust in emerging asset classes through educational content and strategic communications.",
    achievements: [
      "Established Parataxis Korea's institutional research division",
      "Developed the annual Bitcoin Treasury Summit (Seoul)",
      "Created Parataxis Korea's investor education program adopted by 3 Korean universities",
    ],
    linkedin: true,
    twitter: true,
  },
  {
    id: 5,
    name: "Kang Tae-sung",
    title: "Head of Mining Operations",
    department: "Operations",
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop",
    shortBio:
      "Infrastructure expert managing Parataxis Korea's mining facilities across multiple locations.",
    fullBio:
      "Kang Tae-sung leads Parataxis Korea's mining operations, managing the company's vertically integrated Bitcoin mining infrastructure across multiple facilities in Korea and Mongolia.\n\nHis background in large-scale data center operations and power infrastructure gives Parataxis Korea a competitive advantage in securing low-cost, sustainable energy contracts for Bitcoin mining operations.\n\nTae-sung previously worked at Korea Electric Power Corporation (KEPCO) where he specialized in grid-scale power management and industrial power optimization, skills he now applies to maximize mining efficiency and sustainability.",
    achievements: [
      "Established 100MW mining facility in Busan Free Economic Zone",
      "Negotiated 70% renewable energy mix for mining operations",
      "Reduced mining operating expenses by 31% through infrastructure optimization",
    ],
    linkedin: false,
    twitter: true,
  },
  {
    id: 6,
    name: "Jung Hye-jin",
    title: "Head of Regulatory Affairs",
    department: "Legal",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    shortBio:
      "Former regulator specializing in financial compliance and digital asset regulatory frameworks.",
    fullBio:
      "Jung Hye-jin directs Parataxis Korea's regulatory strategy and compliance operations, leveraging her experience as a former regulator at the Financial Services Commission (FSC) of Korea.\n\nHer intimate knowledge of Korea's evolving digital asset regulatory landscape has positioned Parataxis Korea as a leader in compliance and governance, facilitating institutional adoption through regulatory clarity.\n\nHye-jin holds a law degree from Yonsei University and serves on the Korean Blockchain Association's Regulatory Affairs Committee, where she helps shape policy recommendations for the digital asset industry in Korea.",
    achievements: [
      "Secured KOSPI listing approval for Bitcoin-backed equity structure",
      "Developed Korea's first approved Bitcoin treasury disclosure framework",
      "Advised three regulatory working groups on digital asset standards",
    ],
    linkedin: true,
    twitter: false,
  },
];

export const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

export const DATE_FORMAT = "YYYY-MM-DD";

export const API_BASE_URL =
  "https://parataxiskorea-app-rxyyk.ondigitalocean.app/api";

export const pressApiUrl = (params) => {
  let url = `${API_BASE_URL}/ParataxisPress?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};
export const dashboardPressGetAllApiUrl = (params) => {
  let url = `${API_BASE_URL}/v2/ParataxisPressv2/GetAll?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const publicDisclosuresApiUrl = (params) => {
  let url = `${API_BASE_URL}/ParataxisPublicFSCDisclosures?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const dashboardPublicDisclosuresGetAllApiUrl = (params) => {
  let url = `${API_BASE_URL}/v2/ParataxisPublicFSCDisclosuresv2/GetAll?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const ElectronicDisclosuresApiUrl = (params) => {
  let url = `${API_BASE_URL}/ParataxisPublicElectronicDisclosures?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};
export const dashboardElectronicDisclosuresGetAllApiUrl = (params) => {
  let url = `${API_BASE_URL}/v2/ParataxisPublicElectronicDisclosuresv2/GetAll?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const mediaApiUrl = (params) => {
  let url = `${API_BASE_URL}/ParataxisMedia?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const dashboardMediaGetAllApiUrl = (params) => {
  let url = `${API_BASE_URL}/v2/ParataxisMediav2/GetAll?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const webcastsApiUrl = (params) => {
  let url = `${API_BASE_URL}/ParataxisWebcastsAndPresentations?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const dashboardWebcastsGetAllApiUrl = (params) => {
  let url = `${API_BASE_URL}/v2/ParataxisWebcastsAndPresentationsv2/GetAll?`;
  Object.keys(params).forEach((paramKey) => {
    url = `${url}${paramKey}=${params[paramKey]}&`;
  });
  return url;
};

export const adminLoginApiUrl = `${API_BASE_URL}/Auth/login`;

export const pressDataApiUrl = `${API_BASE_URL}/v2/ParataxisPressV2`;
export const publicDisclosuresDataApiUrl = `${API_BASE_URL}/v2/ParataxisPublicFSCDisclosuresV2`;
export const electronicNoticesDataApiUrl = `${API_BASE_URL}/v2/ParataxisPublicElectronicDisclosuresV2`;

export const webcastsDataApiUrl = `${API_BASE_URL}/v2/ParataxisWebcastsAndPresentationsV2`;
export const mediaDataApiUrl = `${API_BASE_URL}/v2/ParataxisMediaV2`;
export const saveEmail = `${API_BASE_URL}/ParataxisPopupEmail/SaveEmail`;

export const pressInitialState = {
  date: moment().format(DATE_FORMAT),
  imgUrl: "",
  heading: "",
  fullDescription: "",
  koreanHeading: "",
  koreanDescription: "",
  ID: "",
  downloadLink1: {
    index: 1,
    fileName: "",
    downloadUrl: "",
  },
  downloadLink2: {
    index: 2,
    fileName: "",
    downloadUrl: "",
  },
  downloadLink3: {
    index: 3,
    fileName: "",
    downloadUrl: "",
  },
};

export const mediaInitialState = {
  date: moment().format(DATE_FORMAT),
  thumbnail: "",
  heading: "",
  fullDescription: "",
  koreanHeading: "",
  koreanDescription: "",
  id: "",
  mediaUrl: "",
  tags: "",
};

export const generateSignedUrl = `${API_BASE_URL}/DocumentsStorage/generate-upload-url`;
export const editorApiKey = "r62bd3abd01wts5ledkwv0i9tnsl1mv3i76xlu8lhcctnomf";
export const sheetUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6RNI3a1w4F2-wwDS6r5t9NNkwSJCODVmo15zi3t9s5yMN9gJ7gdj-P2lpTh8GkngRglzTRZU1PdiZ/pub?gid=1874007269&output=csv";
export const priceSheetUrl =
  "https://docs.google.com/spreadsheets/d/1OX5MbGcR8xGxCRH2s6_g45fpx1-vDDsdL84bOdfJZsc/gviz/tq?tqx=out:json";
