import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Portal',
  description: 'Private client access for Neqtex.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-background">
      {children}
    </div>
  );
}
