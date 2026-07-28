import { Link } from "@tanstack/react-router";

export function LegalNav() {
  return (
    <nav className="sticky top-0 z-40 border-b border-[#EAEAEA] bg-white/85 backdrop-blur-md print:hidden">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-sora text-lg font-semibold tracking-tight text-[#111111]">
          tally<span className="text-[#2563EB]">.</span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/blog" className="text-sm font-medium text-[#4B5563] hover:text-[#111111]">
            Blog
          </Link>
          <Link
            to="/legal/privacy"
            className="text-sm font-medium text-[#4B5563] hover:text-[#111111]"
          >
            Privacy
          </Link>
          <Link
            to="/legal/terms"
            className="text-sm font-medium text-[#4B5563] hover:text-[#111111]"
          >
            Terms
          </Link>
          <Link
            to="/legal/security"
            className="text-sm font-medium text-[#4B5563] hover:text-[#111111]"
          >
            Security
          </Link>
          <Link
            to="/contact-us"
            className="text-sm font-medium text-[#4B5563] hover:text-[#111111]"
          >
            Contact
          </Link>
        </div>
        <Link
          to="/auth"
          className="inline-flex h-9 items-center rounded-full bg-[#111111] px-4 text-sm font-medium text-white transition-colors hover:bg-black/85"
        >
          Go to App
        </Link>
      </div>
    </nav>
  );
}
