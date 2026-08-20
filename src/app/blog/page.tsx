import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import cityData from "../../../public/data/city-info.json";

export const metadata: Metadata = {
  title: `생활 정보 블로그 | ${cityData.city} 생활 정보`,
  description: `${cityData.city}의 다양한 생활 소식, 축제 정보, 복지 혜택 가이드를 전해드립니다.`,
};

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 상단 헤더 네비게이션 */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
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
          <nav className="flex items-center gap-2 sm:gap-4 text-sm font-medium text-slate-600">
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg hover:bg-slate-100 hover:text-blue-600 transition-colors"
            >
              홈으로
            </Link>
            <Link
              href="/blog/"
              className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-semibold"
            >
              블로그
            </Link>
          </nav>
        </div>
      </header>

      {/* 히어로 배너 */}
      <section className="bg-gradient-to-b from-blue-50 via-sky-50/50 to-[#F8FAFC] py-10 px-4 sm:px-6 border-b border-blue-100/60">
        <div className="max-w-5xl mx-auto text-center sm:text-left space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-semibold">
            <span>📝</span>
            <span>생활 정보 & 꿀팁 블로그</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {cityData.city} 소식과 유용한 정보
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            공공데이터와 지역 소식을 바탕으로 꼭 필요한 정보를 알기 쉽게 정리해 드립니다.
          </p>
        </div>
      </section>

      {/* 블로그 포스트 목록 */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10">
        {posts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 shadow-xs">
            <span className="text-4xl block mb-3">✍️</span>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              등록된 블로그 글이 아직 없습니다
            </h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              새로운 유용한 생활 정보와 축제 가이드가 곧 업데이트될 예정입니다.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col justify-between bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-400 transition-all duration-200 p-6 overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                      {post.category}
                    </span>
                    <time className="text-xs text-slate-400 font-medium">
                      {post.date}
                    </time>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    <Link href={`/blog/${post.slug}/`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/blog/${post.slug}/`}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>읽기</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* 하단 푸터 */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-xs py-8 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p className="font-semibold text-slate-200">
              우리 동네 생활 정보 ({cityData.city})
            </p>
            <p className="text-slate-500 mt-0.5">
              공공데이터포털(data.go.kr) 기반 맞춤 생활 정보 블로그
            </p>
          </div>
          <Link href="/" className="text-sky-400 hover:underline font-medium">
            ← 메인 홈으로 가기
          </Link>
        </div>
      </footer>
    </div>
  );
}
