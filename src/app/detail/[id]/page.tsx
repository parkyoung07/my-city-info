import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import cityData from "../../../../public/data/city-info.json";

interface ItemData {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  dateDisplay: string;
  time?: string;
  location: string;
  target: string;
  fee?: string;
  contact?: string;
  summary: string;
  description?: string;
  link: string;
  amount?: string;
  tag: string;
}

// 1. Static Export를 위한 모든 ID 목록 생성
export async function generateStaticParams() {
  const allItems = [...cityData.events, ...cityData.benefits];
  return allItems.map((item) => ({
    id: item.id,
  }));
}

// 2. 동적 페이지 메타데이터 생성 (SEO)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const allItems: ItemData[] = [...cityData.events, ...cityData.benefits];
  const item = allItems.find((i) => i.id === id);

  if (!item) {
    return {
      title: "정보를 찾을 수 없습니다 | 우리 동네 생활 정보",
    };
  }

  return {
    title: `${item.title} - ${item.category} | 성남시 생활 정보`,
    description: item.summary,
  };
}

// 3. 상세 페이지 컴포넌트
export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const allItems: ItemData[] = [...cityData.events, ...cityData.benefits];
  const item = allItems.find((i) => i.id === id);

  if (!item) {
    notFound();
  }

  const isEvent = item.category.includes("행사") || item.category.includes("축제");

  return (
    <div className="flex flex-col min-h-screen">
      {/* 상단 네비게이션 */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 text-white shadow-sm font-bold text-lg group-hover:scale-105 transition-transform">
              🏙️
            </span>
            <div>
              <span className="text-lg font-bold text-slate-900 tracking-tight">
                우리 동네 생활 정보
              </span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {cityData.city}
              </span>
            </div>
          </Link>
          <Link
            href="/"
            className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1"
          >
            <span>←</span>
            <span>홈으로 이동</span>
          </Link>
        </div>
      </header>

      {/* 메인 상세 본문 */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* 상단 경로 (Breadcrumbs) & 목록으로 가기 */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              홈
            </Link>
            <span>›</span>
            <span className="text-slate-700 font-semibold">{item.category}</span>
          </nav>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
          >
            <span>←</span>
            <span>목록으로 돌아가기</span>
          </Link>
        </div>

        {/* 상세 아티클 컨테이너 */}
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* 아티클 헤더 */}
          <div className="p-6 sm:p-10 border-b border-slate-100 bg-gradient-to-b from-blue-50/40 via-white to-white">
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  isEvent
                    ? "bg-sky-50 text-sky-700 border-sky-200"
                    : "bg-blue-50 text-blue-700 border-blue-200"
                }`}
              >
                {item.tag}
              </span>
              <span className="text-xs font-medium text-slate-500">
                {item.category}
              </span>
              {item.amount && (
                <span className="text-xs font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                  {item.amount}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              {item.title}
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {item.summary}
            </p>
          </div>

          {/* 주요 정보 요약 그리드 */}
          <div className="p-6 sm:p-10 bg-slate-50/70 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>📋</span>
              <span>주요 정보 안내</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-white p-4 rounded-2xl border border-slate-200/70 space-y-1">
                <span className="text-xs font-medium text-slate-400 block">
                  🗓️ {isEvent ? "행사 기간" : "신청 기간"}
                </span>
                <span className="font-semibold text-slate-800">
                  {item.dateDisplay}
                </span>
                {item.time && (
                  <span className="text-xs text-slate-500 block">
                    운영 시간: {item.time}
                  </span>
                )}
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/70 space-y-1">
                <span className="text-xs font-medium text-slate-400 block">
                  📍 {isEvent ? "행사 장소" : "신청처 / 접수처"}
                </span>
                <span className="font-semibold text-slate-800">
                  {item.location}
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/70 space-y-1">
                <span className="text-xs font-medium text-slate-400 block">
                  👥 대상 / 자격
                </span>
                <span className="font-semibold text-slate-800">
                  {item.target}
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/70 space-y-1">
                <span className="text-xs font-medium text-slate-400 block">
                  📞 문의처 / 비용
                </span>
                <span className="font-semibold text-slate-800">
                  {item.contact || "지자체 관련 부서"}
                </span>
                {item.fee && (
                  <span className="text-xs text-slate-500 block">
                    비용: {item.fee}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* 상세 설명 전문 */}
          <div className="p-6 sm:p-10 space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>📖</span>
              <span>상세 내용</span>
            </h2>

            <div className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-white rounded-2xl p-5 sm:p-6 border border-slate-100 shadow-2xs">
              {item.description || item.summary}
            </div>

            {/* 하단 액션 버튼 영역 */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-center"
              >
                ← 목록으로 돌아가기
              </Link>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all text-center flex items-center justify-center gap-2"
              >
                <span>자세히 보기 (공식 홈페이지)</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </article>
      </main>

      {/* 푸터 */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="font-semibold text-slate-200">
              우리 동네 생활 정보 ({cityData.city})
            </p>
            <p className="text-slate-500 mt-0.5">
              공공데이터포털(data.go.kr) 기반 맞춤 생활 정보
            </p>
          </div>
          <Link
            href="/"
            className="text-sky-400 hover:underline font-medium"
          >
            ← 메인 목록으로 가기
          </Link>
        </div>
      </footer>
    </div>
  );
}
