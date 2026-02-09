import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "RENT.PERMABAN.CZ",
  description: "Rezervace vozidel",
};

function Header() {
  return (
    <>
      <div className="topline" />
      <header className="bg-white/95 backdrop-blur border-b border-black/10 sticky top-0 z-50">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-extrabold tracking-wider">
            RENT<span className="text-black/40">.</span>PERMABAN
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-black/70">
            <Link className="hover:text-black" href="/vozidla">Vozidla</Link>
            <Link className="hover:text-black" href="/rezervace">Rezervace</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/rezervace" className="btn">
              Vytvořit rezervaci
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="mt-20 border-t border-black/10 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-black/60 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <div>© {new Date().getFullYear()} RENT.PERMABAN.CZ</div>
        <div className="flex gap-4">
          <a className="hover:text-black" href="/api/cars" target="_blank" rel="noreferrer">API /cars</a>
          <a className="hover:text-black" href="/api/bookings" target="_blank" rel="noreferrer">API /bookings</a>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        <Header />
        <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
