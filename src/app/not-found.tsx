import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-[-1]"
        style={{ backgroundImage: 'url("/hero.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="glass-modal p-12 text-center max-w-lg mx-4">
        <h1 className="text-6xl font-light mb-4">404</h1>
        <h2 className="text-2xl mb-6">Page Not Found</h2>
        <p className="text-[#a9a9a9] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          href="/"
          className="btn-glass inline-flex items-center gap-2"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
