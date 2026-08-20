import Link from "next/link";
import cityData from "../../public/data/city-info.json";

interface EventItem {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  dateDisplay: string;
  location: string;
  target: string;
  summary: string;
  link: string;
  tag: string;
  badgeColor?: string;
}

interface BenefitItem {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  dateDisplay: string;
  location: string;
  target: string;
  summary: string;
  link: string;
  amount?: string;
  tag: string;
  badgeColor?: string;
}

export default function HomePage() {
  const events = cityData.events as EventItem[];
  const benefits = cityData.benefits as BenefitItem[];
  const { city, lastUpdated } = cityData;

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. 상단 네비게이션 바 */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white shadow-sm font-bold text-lg group-hover:scale-105 transition-transform">
              🏙️
            </span>
            <div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                우리 동네 생활 정보
              </span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {city}
              </span>
            </div>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4 text-sm font-medium text-slate-600">
            <a
              href="#events-section"
              className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors"
            >
              행사·축제
            </a>
            <a
              href="#benefits-section"
              className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors"
            >
              지원금·혜택
            </a>
            <Link
              href="/blog/"
              className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold hover:bg-blue-100 transition-colors"
            >
              블로그
            </Link>
          </nav>
        </div>
      </header>

      {/* 2. 시원하고 깔끔한 블루 히어로 배너 */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-sky-50/50 to-[#F8FAFC] pt-10 pb-12 px-4 sm:px-6 border-b border-blue-100/60">
        <div className="max-w-6xl mx-auto text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-semibold">
              <span>📢</span>
              <span>{city} 주민을 위한 실시간 맞춤 생활 소식</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {city} 생활 정보, <br className="hidden sm:inline" />
              <span className="text-blue-600">축제부터 지원금까지</span> 한눈에
              확인하세요!
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              공공데이터 기반으로 검증된 믿을 수 있는 지역 행사 일정과 놓치기 쉬운
              지자체 복지 혜택을 매일 업데이트해 드립니다.
            </p>
          </div>

          {/* 간이 통계 카드 */}
          <div className="mt-6 sm:mt-0 flex sm:flex-col gap-3 justify-center">
            <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-sky-100 shadow-xs flex items-center gap-3.5 min-w-[155px]">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                🎪
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-500 font-medium">이달의 행사</p>
                <p className="text-lg font-bold text-slate-900">
                  {events.length}
                  <span className="text-xs font-normal text-slate-500 ml-1">건</span>
                </p>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-xs p-4 rounded-2xl border border-blue-100 shadow-xs flex items-center gap-3.5 min-w-[155px]">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-xl">
                💳
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-500 font-medium">지원금·혜택</p>
                <p className="text-lg font-bold text-slate-900">
                  {benefits.length}
                  <span className="text-xs font-normal text-slate-500 ml-1">건</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-10 space-y-14">
        {/* 3. 이번 달 행사/축제 섹션 */}
        <section id="events-section" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🌸</span>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  이번 달 주요 행사 & 축제
                </h2>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                가족, 친구와 함께 즐길 수 있는 {city}의 다채로운 문화 행사입니다.
              </p>
            </div>
            <span className="text-xs font-medium text-slate-400">
              총 {events.length}개의 행사 등록됨
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <article
                key={event.id}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-400 transition-all duration-200 overflow-hidden"
              >
                {/* 카드 상단 배지 및 일정 */}
                <div className="p-5 pb-3 border-b border-slate-100">
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                      {event.tag}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    <Link href="/blog/">
                      {event.title}
                    </Link>
                  </h3>
                </div>

                {/* 카드 본문 상세 정보 */}
                <div className="p-5 pt-3 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                    <div className="flex items-start gap-2">
                      <span className="text-slate-400 font-medium shrink-0">
                        🗓️ 일정:
                      </span>
                      <span className="font-semibold text-slate-800">
                        {event.dateDisplay}
                      </span>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-slate-400 font-medium shrink-0">
                        📍 장소:
                      </span>
                      <span className="text-slate-700">{event.location}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <span className="text-slate-400 font-medium shrink-0">
                        👥 대상:
                      </span>
                      <span className="text-slate-700 line-clamp-1">
                        {event.target}
                      </span>
                    </div>

                    <p className="pt-2 text-slate-600 text-xs leading-relaxed border-t border-slate-100">
                      {event.summary}
                    </p>
                  </div>

                  {/* 카드 버튼 */}
                  <div className="pt-3">
                    <Link
                      href="/blog/"
                      className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-slate-50 text-slate-700 hover:bg-blue-600 hover:text-white border border-slate-200 hover:border-blue-600 transition-all duration-200 text-center"
                    >
                      상세 정보 확인하기 →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 4. 지원금/혜택 정보 섹션 */}
        <section id="benefits-section" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200/80 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">💰</span>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  놓치면 아쉬운 지원금 & 복지 혜택
                </h2>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                {city} 주민이라면 꼭 챙겨야 할 맞춤 지원금 및 생활 복지 정책입니다.
              </p>
            </div>
            <span className="text-xs font-medium text-slate-400">
              총 {benefits.length}개의 혜택 등록됨
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <article
                key={benefit.id}
                className="group flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-400 transition-all duration-200 p-6 relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {benefit.tag}
                  </span>
                  {benefit.amount && (
                    <span className="text-xs font-bold text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-lg">
                      {benefit.amount}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-3">
                  <Link href="/blog/">
                    {benefit.title}
                  </Link>
                </h3>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-600 flex-1">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 font-medium shrink-0">
                      🎯 대상:
                    </span>
                    <span className="text-slate-800 font-medium">
                      {benefit.target}
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 font-medium shrink-0">
                      🗓️ 접수:
                    </span>
                    <span className="text-slate-700">{benefit.dateDisplay}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 font-medium shrink-0">
                      📍 신청처:
                    </span>
                    <span className="text-slate-700">{benefit.location}</span>
                  </div>

                  <p className="pt-3 text-slate-600 text-xs leading-relaxed border-t border-slate-100">
                    {benefit.summary}
                  </p>
                </div>

                <div className="mt-5 pt-3">
                  <Link
                    href="/blog/"
                    className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 hover:border-blue-600 transition-all duration-200 text-center"
                  >
                    신청 방법 및 상세 내용 보기 →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 5. 안내 배너 */}
        <section className="bg-blue-50/70 rounded-2xl p-5 sm:p-6 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="text-sm font-bold text-slate-800">
                더 많은 동네 소식이 궁금하신가요?
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                매일 공공데이터포털에서 최신 정보를 수집하여 자동으로 업데이트하고
                있습니다.
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold text-blue-700 bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-2xs">
            신뢰할 수 있는 공공데이터 연동
          </span>
        </section>
      </main>

      {/* 6. 하단 푸터 */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div>
              <p className="font-semibold text-slate-200 text-sm">
                우리 동네 생활 정보 ({city})
              </p>
              <p className="text-slate-400 mt-1">
                지역 주민을 위한 행사 및 복지 혜택 안내 서비스
              </p>
            </div>
            <div className="flex flex-col sm:items-end gap-1">
              <p>
                데이터 출처:{" "}
                <span className="text-slate-300 font-medium">
                  공공데이터포털 (data.go.kr)
                </span>
              </p>
              <p>
                마지막 업데이트:{" "}
                <span className="text-sky-400 font-medium">
                  {lastUpdated}
                </span>
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 text-slate-400 text-center flex flex-col sm:flex-row justify-between items-center gap-2">
            <p>© 2026 우리 동네 생활 정보. All rights reserved.</p>
            <p className="text-slate-400 text-[11px]">
              본 사이트의 정보는 공공누리 라이선스를 준수하여 제공됩니다.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
