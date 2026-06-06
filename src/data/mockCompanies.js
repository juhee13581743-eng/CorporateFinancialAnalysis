// mockCompanies.js
// 2023 ~ 2025 (일부 2025는 실적 추정치 기반 고정밀 모의 데이터)

export const mockCompanies = [
  {
    id: "005930",
    name: "삼성전자",
    engName: "Samsung Electronics Co., Ltd.",
    code: "005930",
    dartCode: "00126380",
    market: "KOSPI",
    industry: "반도체 및 전자부품 제조업",
    description: "세계 메모리 반도체 1위 및 글로벌 스마트폰, 가전 시장 리더 기업입니다.",
    financialData: [
      {
        year: 2023,
        revenue: 258935500000000, // 258.9조
        operatingProfit: 6567000000000, // 6.56조
        netIncome: 15487100000000, // 15.48조
        assets: 455906200000000, // 455.9조
        liabilities: 92228100000000, // 92.2조
        equity: 363678100000000, // 363.6조
        currentAssets: 218413100000000,
        currentLiabilities: 75311200000000,
        cash: 68142300000000,
      },
      {
        year: 2024,
        revenue: 302830000000000, // 302.8조
        operatingProfit: 36130000000000, // 36.13조
        netIncome: 27540000000000, // 27.54조
        assets: 485120000000000,
        liabilities: 99420000000000,
        equity: 385700000000000,
        currentAssets: 235100000000000,
        currentLiabilities: 81200000000000,
        cash: 72150000000000,
      },
      {
        year: 2025,
        revenue: 315420000000000, // 315.4조
        operatingProfit: 42850000000000, // 42.85조
        netIncome: 32180000000000, // 32.18조
        assets: 512400000000000,
        liabilities: 104200000000000,
        equity: 408200000000000,
        currentAssets: 251800000000000,
        currentLiabilities: 84600000000000,
        cash: 79500000000000,
      }
    ],
    diagnosticComments: "삼성전자는 2023년 메모리 반도체 다운사이클로 인해 영업이익이 급감하였으나, 2024년 HBM 및 고부가 가치 디바이스의 비중 확대 및 IT 업황 회복세에 힙입어 영업이익이 대폭 증가했습니다. 2025년 역시 견조한 선단 공정 메모리 및 가전 분야의 안정적 마진으로 수익성 정상화 궤도에 올랐습니다. 재무 건전성은 현금성 자산 70조원 이상, 부채비율 25% 내외로 극히 우수한 수준을 꾸준히 유지 중입니다."
  },
  {
    id: "000660",
    name: "SK하이닉스",
    engName: "SK Hynix Inc.",
    code: "000660",
    dartCode: "00164779",
    market: "KOSPI",
    industry: "반도체 제조업",
    description: "HBM(고대역폭 메모리) 시장의 독보적 지위를 확보한 글로벌 메모리 반도체 전문 기업입니다.",
    financialData: [
      {
        year: 2023,
        revenue: 32765700000000, // 32.7조
        operatingProfit: -7730300000000, // -7.73조 (적자)
        netIncome: -9137500000000, // -9.13조 (적자)
        assets: 102434000000000,
        liabilities: 49132000000000,
        equity: 53302000000000,
        currentAssets: 23145000000000,
        currentLiabilities: 21542000000000,
        cash: 7421000000000,
      },
      {
        year: 2024,
        revenue: 66820000000000, // 66.8조 (흑자전환)
        operatingProfit: 18210000000000, // 18.21조
        netIncome: 14120000000000, // 14.12조
        assets: 121500000000000,
        liabilities: 54100000000000,
        equity: 67400000000000,
        currentAssets: 32500000000000,
        currentLiabilities: 24800000000000,
        cash: 9850000000000,
      },
      {
        year: 2025,
        revenue: 72540000000000, // 72.5조
        operatingProfit: 21320000000000, // 21.32조
        netIncome: 16850000000000, // 16.85조
        assets: 135400000000000,
        liabilities: 51200000000000,
        equity: 84200000000000,
        currentAssets: 41200000000000,
        currentLiabilities: 21500000000000,
        cash: 12500000000000,
      }
    ],
    diagnosticComments: "SK하이닉스는 2023년 사상 최악의 불황으로 큰 손실을 기록했으나, AI GPU 핵심 부품인 HBM3/HBM3E 분야의 기술 리더십을 선점하여 2024년 역대급 흑자 전환에 성공했습니다. 2025년 또한 고성능 서버향 메모리 공급 주도로 ROE가 무려 20% 수준에 근접할 정도로 폭발적인 성장성과 수익성을 과시하고 있습니다. 차입금 감축 및 부채비율 감소 등 재무구조가 빠른 속도로 건전화되고 있습니다."
  },
  {
    id: "005380",
    name: "현대자동차",
    engName: "Hyundai Motor Company",
    code: "005380",
    dartCode: "00164742",
    market: "KOSPI",
    industry: "자동차 제조업",
    description: "제네시스 브랜드 및 전기차, 하이브리드 라인업으로 글로벌 판매 3위 지위에 오른 완성차 제조사입니다.",
    financialData: [
      {
        year: 2023,
        revenue: 162663000000000, // 162.6조
        operatingProfit: 15126900000000, // 15.12조
        netIncome: 12272600000000, // 12.27조
        assets: 278143000000000,
        liabilities: 182154000000000,
        equity: 95989000000000,
        currentAssets: 89452000000000,
        currentLiabilities: 79154000000000,
        cash: 18456000000000,
      },
      {
        year: 2024,
        revenue: 170560000000000, // 170.5조
        operatingProfit: 16340000000000, // 16.34조
        netIncome: 13520000000000, // 13.52조
        assets: 295400000000000,
        liabilities: 189500000000000,
        equity: 105900000000000,
        currentAssets: 96800000000000,
        currentLiabilities: 82100000000000,
        cash: 21200000000000,
      },
      {
        year: 2025,
        revenue: 178240000000000, // 178.2조
        operatingProfit: 17150000000000, // 17.15조
        netIncome: 14240000000000, // 14.24조
        assets: 312500000000000,
        liabilities: 196800000000000,
        equity: 115700000000000,
        currentAssets: 104500000000000,
        currentLiabilities: 84900000000000,
        cash: 23800000000000,
      }
    ],
    diagnosticComments: "현대자동차는 하이브리드(HEV) 차량의 폭발적인 글로벌 인기와 고부가가치 SUV/제네시스 판매 믹스 개선을 바탕으로 높은 이익률을 창출하고 있습니다. 특히 고금리 국면에서도 금융 자회사를 제외한 제조 부문의 건전한 현금 흐름 창출을 지속하고 있습니다. 부채비율은 금융 부문을 포함해 170% 수준이나, 제조업 단독으로는 50% 미만의 매우 안정적인 상태를 유지하고 있습니다."
  },
  {
    id: "035420",
    name: "NAVER",
    engName: "NAVER Corporation",
    code: "035420",
    dartCode: "00266967",
    market: "KOSPI",
    industry: "포털 및 기타 인터넷 정보매개 서비스업",
    description: "대한민국 1위 인터넷 포털, 전자상거래, 콘텐츠, 클라우드 및 생성형 AI 리더 기업입니다.",
    financialData: [
      {
        year: 2023,
        revenue: 9670600000000, // 9.67조
        operatingProfit: 1488800000000, // 1.48조
        netIncome: 988400000000, // 9884억
        assets: 34156000000000,
        liabilities: 9540000000000,
        equity: 24616000000000,
        currentAssets: 6850000000000,
        currentLiabilities: 5410000000000,
        cash: 3420000000000,
      },
      {
        year: 2024,
        revenue: 10580000000000, // 10.58조
        operatingProfit: 1760000000000, // 1.76조
        netIncome: 1250000000000, // 1.25조
        assets: 36200000000000,
        liabilities: 10100000000000,
        equity: 26100000000000,
        currentAssets: 7450000000000,
        currentLiabilities: 5750000000000,
        cash: 3950000000000,
      },
      {
        year: 2025,
        revenue: 11650000000000, // 11.65조
        operatingProfit: 1980000000000, // 1.98조
        netIncome: 1420000000000, // 1.42조
        assets: 38500000000000,
        liabilities: 10400000000000,
        equity: 28100000000000,
        currentAssets: 8120000000000,
        currentLiabilities: 6100000000000,
        cash: 4200000000000,
      }
    ],
    diagnosticComments: "NAVER는 전통적인 서치플랫폼(검색 광고) 사업의 견조한 성장에 더해, 스마트스토어를 축으로 하는 커머스 사업 및 웹툰을 비롯한 글로벌 콘텐츠 사업이 동반 성장 중입니다. 서치GPT(HyperCLOVA X) 기반 기업형 솔루션 및 클라우드 부문이 미래 성장 동력을 확보하고 있습니다. 부채비율은 약 37~38% 선으로 유지되어 인터넷 플랫폼 업계 최고 수준의 극히 높은 재무적 안전성을 대변합니다."
  },
  {
    id: "035720",
    name: "카카오",
    engName: "Kakao Corp.",
    code: "035720",
    dartCode: "00258816",
    market: "KOSPI",
    industry: "포털 및 기타 인터넷 정보매개 서비스업",
    description: "국민 메신저 카카오톡을 허브로 금융, 모빌리티, 엔터테인먼트 등 라이프 플랫폼 비즈니스를 전개하는 종합 IT 기업입니다.",
    financialData: [
      {
        year: 2023,
        revenue: 8105800000000, // 8.1조
        operatingProfit: 501900000000, // 5019억
        netIncome: -1425400000000, // -1.42조 (SM 인수 관련 무형자산 손상차손 등)
        assets: 23145000000000,
        liabilities: 12450000000000,
        equity: 10695000000000,
        currentAssets: 5120000000000,
        currentLiabilities: 6250000000000,
        cash: 2950000000000,
      },
      {
        year: 2024,
        revenue: 8750000000000, // 8.75조
        operatingProfit: 620000000000, // 6200억
        netIncome: 350000000000, // 3500억 (흑자전환)
        assets: 24500000000000,
        liabilities: 12900000000000,
        equity: 11600000000000,
        currentAssets: 5500000000000,
        currentLiabilities: 6400000000000,
        cash: 3120000000000,
      },
      {
        year: 2025,
        revenue: 9420000000000, // 9.42조
        operatingProfit: 710000000000, // 7100억
        netIncome: 415000000000, // 4150억
        assets: 25800000000000,
        liabilities: 13200000000000,
        equity: 12600000000000,
        currentAssets: 6100000000000,
        currentLiabilities: 6500000000000,
        cash: 3450000000000,
      }
    ],
    diagnosticComments: "카카오는 2023년 영업이익률의 둔화와 자회사(SM엔터테인먼트 등) 무형자산 처분에 따른 비현금성 일회성 비용으로 대규모 순손실을 보였으나, 2024년부터 비핵심 자산 정리 및 경영 효율성 개선을 통해 손익 구조를 빠르게 수습했습니다. 카카오톡 플랫폼 중심의 톡비즈 매출 비중을 지속 확대하여 마진율을 복구하는 추세입니다. 부채비율은 100%대로 비교적 양호한 편이나 유동비율 관리가 필요합니다."
  },
  {
    id: "373220",
    name: "LG에너지솔루션",
    engName: "LG Energy Solution, Ltd.",
    code: "373220",
    dartCode: "01524317",
    market: "KOSPI",
    industry: "일차전지 제조업",
    description: "글로벌 자동차 제조사들을 고객사로 둔 세계 최고 수준의 전기차 배터리(리튬이온) 전문 제조 기업입니다.",
    financialData: [
      {
        year: 2023,
        revenue: 33745500000000, // 33.7조
        operatingProfit: 2163200000000, // 2.16조
        netIncome: 1637900000000, // 1.63조
        assets: 41254000000000,
        liabilities: 18124000000000,
        equity: 23130000000000,
        currentAssets: 15410000000000,
        currentLiabilities: 11450000000000,
        cash: 5240000000000,
      },
      {
        year: 2024,
        revenue: 29500000000000, // 29.5조 (전기차 캐즘 영향으로 다소 둔화)
        operatingProfit: 1450000000000, // 1.45조
        netIncome: 950000000000, // 9500억
        assets: 45200000000000,
        liabilities: 21100000000000,
        equity: 24100000000000,
        currentAssets: 17200000000000,
        currentLiabilities: 13500000000000,
        cash: 5850000000000,
      },
      {
        year: 2025,
        revenue: 32800000000000, // 32.8조
        operatingProfit: 1920000000000, // 1.92조
        netIncome: 1350000000000, // 1.35조
        assets: 49800000000000,
        liabilities: 23500000000000,
        equity: 26300000000000,
        currentAssets: 19100000000000,
        currentLiabilities: 14800000000000,
        cash: 6200000000000,
      }
    ],
    diagnosticComments: "LG에너지솔루션은 글로벌 전기차 수요 일시적 둔화(Chasm)의 영향으로 2024년 매출액 및 영업이익이 전년 대비 소폭 조정되었으나, 미국 세액공제(AMPC) 혜택 및 ESS(에너지저장장치) 배터리 사업의 매출 성장으로 하방을 지지했습니다. 2025년 신규 OEM 완성차 출시와 유럽 환경 규제 강화 흐름에 맞춰 매출 턴어라운드를 시작했으며, 대규모 설비 투자를 안정적으로 유치해 신용 등급도 양호합니다."
  },
  {
    id: "005490",
    name: "POSCO홀딩스",
    engName: "POSCO Holdings Inc.",
    code: "005490",
    dartCode: "00122092",
    market: "KOSPI",
    industry: "철강 및 이차전지 소재 지주회사",
    description: "세계 최고 수준의 포스코 철강업을 모태로 리튬, 니켈 등 친환경 배터리 핵심 소재 공급망을 다변화하는 지주회사입니다.",
    financialData: [
      {
        year: 2023,
        revenue: 77127200000000, // 77.1조
        operatingProfit: 3531400000000, // 3.53조
        netIncome: 1846500000000, // 1.84조
        assets: 98124000000000,
        liabilities: 42125000000000,
        equity: 55999000000000,
        currentAssets: 34125000000000,
        currentLiabilities: 22145000000000,
        cash: 8421000000000,
      },
      {
        year: 2024,
        revenue: 74200000000000, // 74.2조
        operatingProfit: 3120000000000, // 3.12조
        netIncome: 1540000000000, // 1.54조
        assets: 101500000000000,
        liabilities: 44200000000000,
        equity: 57300000000000,
        currentAssets: 35200000000000,
        currentLiabilities: 23100000000000,
        cash: 8950000000000,
      },
      {
        year: 2025,
        revenue: 76500000000000, // 76.5조
        operatingProfit: 3450000000000, // 3.45조
        netIncome: 1820000000000, // 1.82조
        assets: 104800000000000,
        liabilities: 45300000000000,
        equity: 59500000000000,
        currentAssets: 36800000000000,
        currentLiabilities: 22500000000000,
        cash: 9200000000000,
      }
    ],
    diagnosticComments: "POSCO홀딩스는 중국발 철강 과잉 공급 우려와 건설 경기 부진 속에서도 특수강 및 친환경 인프라향 고부가 가치 강재로 안정성을 유지하고 있습니다. 아울러 이차전지 소재 리튬 염호 상업 생산이 2024~2025년부터 단계적으로 매출화되면서 향후 비철강 원자재 부문의 이익 비중이 늘어날 전망입니다. 부채비율은 75~77% 대의 탄탄한 전통 우량 기업의 재무 레버리지를 유지하고 있습니다."
  },
  {
    id: "091990",
    name: "셀트리온",
    engName: "Celltrion, Inc.",
    code: "091990",
    dartCode: "00262174",
    market: "KOSPI",
    industry: "생물학적 제제 제조업",
    description: "램시마, 트룩시마, 허쥬마 등 바이오시밀러 개발 및 글로벌 신약 개발에 주력하는 제약·바이오 기업입니다.",
    financialData: [
      {
        year: 2023,
        revenue: 2176400000000, // 2.17조
        operatingProfit: 651400000000, // 6514억
        netIncome: 539800000000, // 5398억
        assets: 5894000000000,
        liabilities: 1245000000000,
        equity: 4649000000000,
        currentAssets: 2154000000000,
        currentLiabilities: 894000000000,
        cash: 684000000000,
      },
      {
        year: 2024,
        revenue: 3240000000000, // 3.24조 (셀트리온헬스케어 합병 완료 영향)
        operatingProfit: 712000000000, // 7120억
        netIncome: 582000000000, // 5820억
        assets: 12850000000000,
        liabilities: 3450000000000,
        equity: 9400000000000,
        currentAssets: 4850000000000,
        currentLiabilities: 2150000000000,
        cash: 1120000000000,
      },
      {
        year: 2025,
        revenue: 3820000000000, // 3.82조
        operatingProfit: 1120000000000, // 1.12조 (합병 시너지 및 원가율 대폭 절감)
        netIncome: 915000000000, // 9150억
        assets: 13950000000000,
        liabilities: 3250000000000,
        equity: 10700000000000,
        currentAssets: 5820000000000,
        currentLiabilities: 1950000000000,
        cash: 1450000000000,
      }
    ],
    diagnosticComments: "셀트리온은 2024년 초 셀트리온헬스케어와의 합병 완료로 인한 자산 및 매출 확대가 본격화되었습니다. 일시적으로 합병 인수 무형자산 상각비 및 재고 원가 상승으로 이익률이 하락했으나, 2025년에 이르러 짐펜트라(램시마SC 미국 제품명)의 처방 시장 안착과 고마진 신규 바이오시밀러 라인업 다각화로 30%에 근접하는 대규모 영업이익률을 회복했습니다. 부채비율은 30% 내외로 최고 수준의 안전성을 입증합니다."
  },
  {
    id: "000270",
    name: "기아",
    engName: "Kia Corporation",
    code: "000270",
    dartCode: "00115041",
    market: "KOSPI",
    industry: "자동차 제조업",
    description: "스포티지, 쏘렌토 등 핵심 SUV 모델 및 EV3/EV6/EV9 중심의 전동화 포트폴리오를 앞세운 우량 자동차 제조 기업입니다.",
    financialData: [
      {
        year: 2023,
        revenue: 99808400000000, // 99.8조
        operatingProfit: 11607900000000, // 11.6조
        netIncome: 8777800000000, // 8.77조
        assets: 75452000000000,
        liabilities: 32145000000000,
        equity: 43307000000000,
        currentAssets: 2954000000000,
        currentLiabilities: 21540000000000,
        cash: 8520000000000,
      },
      {
        year: 2024,
        revenue: 105600000000000, // 105.6조
        operatingProfit: 12500000000000, // 12.5조
        netIncome: 9850000000000, // 9.85조
        assets: 82500000000000,
        liabilities: 31200000000000,
        equity: 51300000000000,
        currentAssets: 34100000000000,
        currentLiabilities: 22100000000000,
        cash: 10500000000000,
      },
      {
        year: 2025,
        revenue: 110200000000000, // 110.2조
        operatingProfit: 13100000000000, // 13.1조
        netIncome: 10420000000000, // 10.42조
        assets: 90200000000000,
        liabilities: 30500000000000,
        equity: 59700000000000,
        currentAssets: 39500000000000,
        currentLiabilities: 21800000000000,
        cash: 12800000000000,
      }
    ],
    diagnosticComments: "기아는 현대자동차 그룹 내에서도 상대적으로 높은 RV/SUV 비중과 뛰어난 환율 효과로 두 자릿수 영업이익률을 연달아 기록하고 있습니다. 특히 미국 및 유럽에서의 쏘렌토, 스포티지 하이브리드 판매 인기가 지속되고 있고, 주주친화적인 대규모 자사주 매입 및 소각 정책으로 ROE가 18~20% 수준에 육박하는 등 최고 수준의 자본 효율성을 보여줍니다. 부채비율 역시 50% 대로 초우량 재무 상태입니다."
  },
  {
    id: "006400",
    name: "삼성SDI",
    engName: "Samsung SDI Co., Ltd.",
    code: "006400",
    dartCode: "00126353",
    market: "KOSPI",
    industry: "일차전지 제조업",
    description: "자동차용 배터리, ESS 및 전자재료 소재를 제조하는 글로벌 배터리 리딩 기업입니다.",
    financialData: [
      {
        year: 2023,
        revenue: 22708300000000, // 22.7조
        operatingProfit: 1633400000000, // 1.63조
        netIncome: 2062500000000, // 2.06조
        assets: 32684000000000,
        liabilities: 12154000000000,
        equity: 20530000000000,
        currentAssets: 8124000000000,
        currentLiabilities: 6540000000000,
        cash: 2954000000000,
      },
      {
        year: 2024,
        revenue: 19800000000000, // 19.8조 (매출 일시 하락)
        operatingProfit: 1050000000000, // 1.05조
        netIncome: 1250000000000, // 1.25조
        assets: 34500000000000,
        liabilities: 12800000000000,
        equity: 21700000000000,
        currentAssets: 8950000000000,
        currentLiabilities: 6850000000000,
        cash: 3200000000000,
      },
      {
        year: 2025,
        revenue: 21800000000000, // 21.8조
        operatingProfit: 1320000000000, // 1.32조
        netIncome: 1540000000000, // 1.54조
        assets: 37200000000000,
        liabilities: 13900000000000,
        equity: 23300000000000,
        currentAssets: 9800000000000,
        currentLiabilities: 7200000000000,
        cash: 3600000000000,
      }
    ],
    diagnosticComments: "삼성SDI는 무리한 양적 팽창보다는 젠6(Gen.6) 등 고부가 프리미엄 각형 배터리(P6) 위주의 질적 성장 전략으로 경쟁사 대비 캐즘 하방에서 양호한 이익 방어력을 입증했습니다. 미주 합작법인(StarPlus Energy) 가동 본격화로 2025년 실적 회복세가 뚜렷해지고 있습니다. 부채비율은 60% 내외로 유지되어 설비투자가 대량 필요한 이차전지 제조사 그룹 내에서 매우 모범적이고 균형 있는 현금 구조를 보여주고 있습니다."
  }
];

// Helper to format large financial numbers into Korean notation (e.g. 154조 8,710억원)
export const formatKoreanNumber = (value) => {
  if (value === undefined || value === null) return "-";
  
  const isNegative = value < 0;
  const absValue = Math.abs(value);
  
  if (absValue === 0) return "0원";
  
  const trillion = Math.floor(absValue / 1000000000000);
  const remainder = absValue % 1000000000000;
  const hundredMillion = Math.floor(remainder / 100000000);
  
  let result = "";
  if (trillion > 0) {
    result += `${trillion}조 `;
  }
  if (hundredMillion > 0) {
    result += `${hundredMillion.toLocaleString()}억`;
  }
  
  if (result.trim() === "") {
    return `${isNegative ? "-" : ""}${(absValue / 10000).toLocaleString()}만원`;
  }
  
  return `${isNegative ? "-" : ""}${result.trim()}원`;
};

// Helper to calculate ratios from raw data
export const calculateFinancialRatios = (data) => {
  const { revenue, operatingProfit, netIncome, assets, liabilities, equity, currentAssets, currentLiabilities } = data;
  
  return {
    // Stability
    debtRatio: (liabilities / equity) * 100, // 부채비율
    currentRatio: (currentAssets / currentLiabilities) * 100, // 유동비율
    
    // Profitability
    operatingMargin: (operatingProfit / revenue) * 100, // 영업이익률
    netMargin: (netIncome / revenue) * 100, // 당기순이익률
    roe: (netIncome / equity) * 100, // ROE
    roa: (netIncome / assets) * 100, // ROA
    
    // Efficiency (DuPont components)
    assetTurnover: revenue / assets, // 총자산회전율
    equityMultiplier: assets / equity, // 자기자본배수 (레버리지 배수)
  };
};
