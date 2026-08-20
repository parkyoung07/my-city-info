import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import cityData from "../../../../public/data/city-info.json";

export async function generateStaticParams() {
  const posts = getAllPosts();
  if (posts.length === 0) {
    return [{ slug: "_placeholder" }];
  }
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "글을 찾을 수 없습니다 | 우리 동네 생활 정보",
    };
  }

  return {
    title: `${post.title} | ${cityData.city} 생활 정보 블로그`,
    description: post.summary,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 상단 네비게이션 */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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
          <div className="flex items-center gap-3">
            <Link
              href="/blog/"
              className="text-xs sm:text-sm font-semibold text-slate-600 hover:text-blue-600 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              블로그 목록
            </Link>
            <Link
              href="/"
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors"
            >
              홈으로
            </Link>
          </div>
        </div>
      </header>

      {/* 블로그 상세 본문 */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* 상단 경로 (Breadcrumbs) & 목록 링크 */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <nav className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              홈
            </Link>
            <span>›</span>
            <Link href="/blog/" className="hover:text-blue-600 transition-colors">
              블로그
            </Link>
            <span>›</span>
            <span className="text-slate-700 font-semibold truncate max-w-[200px] sm:max-w-none">
              {post.category}
            </span>
          </nav>

          <Link
            href="/blog/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100 px-3 py-1.5 rounded-lg border border-blue-200 transition-colors"
          >
            <span>←</span>
            <span>블로그 목록</span>
          </Link>
        </div>

        {/* 아티클 컨테이너 */}
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          {/* 글 헤더 */}
          <header className="p-6 sm:p-10 border-b border-slate-100 bg-gradient-to-b from-blue-50/40 via-white to-white space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {post.category}
              </span>
              <time className="text-xs font-medium text-slate-400">
                {post.date}
              </time>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {post.title}
            </h1>

            {post.summary && (
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {post.summary}
              </p>
            )}

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-slate-500 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* 마크다운 본문 영역 */}
          <div className="p-6 sm:p-10">
            <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-img:rounded-2xl prose-pre:bg-slate-900 prose-pre:text-slate-100 leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
              </ReactMarkdown>
            </div>

            {/* 글 하단 네비게이션 & 액션 */}
            <div className="mt-12 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/blog/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-center"
              >
                ← 블로그 목록으로 돌아가기
              </Link>

              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors text-center"
              >
                홈으로 이동
              </Link>
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
              공공데이터포털 기반 맞춤 생활 정보
            </p>
          </div>
          <Link href="/blog/" className="text-sky-400 hover:underline font-medium">
            ← 블로그 목록
          </Link>
        </div>
      </footer>
    </div>
  );
}
