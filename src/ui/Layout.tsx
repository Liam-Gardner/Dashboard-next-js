import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: ReactNode;
  businessName: string;
};

export default function Layout({ businessName, children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header businessName={businessName} />
      <main className="container mx-auto p-4 flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
