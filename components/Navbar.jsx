"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { usePlan } from "../context/PlanProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const [menuOpen, setMenuOpen] = useState(false);

  const workoutActive = pathname === "/" || pathname.startsWith("/workout");

  const planActive = pathname.startsWith("/my-plan");

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* LOGO */}
        <div className="navbar-left">
          <Link href="/" className="navbar-brand">
            <img
              src="/images/logo.png"
              alt="FitLog logo"
              className="navbar-logo"
            />

            <span className="navbar-brand-text">FITLOG</span>
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <nav className="navbar-links">
          <Link
            href="/"
            className={workoutActive ? "navbar-link active" : "navbar-link"}
          >
            WORKOUT
          </Link>

          <Link
            href="/my-plan"
            className={planActive ? "navbar-link active" : "navbar-link"}
          >
            MY PLAN
          </Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="navbar-right">
          <div className="navbar-actions">
            <Link href="/my-plan" className="plan-badge">
              <span>PLAN</span>
              <strong>{plan.length}</strong>
            </Link>

            <Link href="/my-plan" className="saved-badge">
              <span>SAVED</span>
              <strong>{saved.length}</strong>
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className={`menu-button ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link
            href="/"
            className={
              workoutActive ? "mobile-menu-link active" : "mobile-menu-link"
            }
            onClick={() => setMenuOpen(false)}
          >
            WORKOUT
          </Link>

          <Link
            href="/my-plan"
            className={
              planActive ? "mobile-menu-link active" : "mobile-menu-link"
            }
            onClick={() => setMenuOpen(false)}
          >
            MY PLAN
          </Link>
        </div>
      )}
    </header>
  );
}
