import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        {/* BRAND */}
        <Link href="/" className="footer-brand">
          <img
            src="/images/logo.png"
            alt="FitLog logo"
            className="footer-logo"
          />

          <span>FITLOG</span>
        </Link>

        {/* COPYRIGHT */}
        <p className="footer-copy">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
