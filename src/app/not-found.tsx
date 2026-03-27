import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-6">
      <div className="text-center max-w-md">
        <h1 className="font-paperlogy font-bold text-8xl text-accent mb-6">404</h1>
        <h2 className="font-paperlogy font-bold text-2xl mb-4">페이지를 찾을 수 없습니다</h2>
        <p className="text-muted mb-8">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-all"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
