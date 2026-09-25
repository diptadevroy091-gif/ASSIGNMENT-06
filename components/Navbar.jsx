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
        {/* LEFT SIDE */}
        <div className="navbar-left">
          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* LOGO */}
          <Link href="/" className="navbar-brand">
            <img
              src="/images/logo.png"
              alt="FitLog logo"
              className="navbar-logo"
            />

            <span className="navbar-brand-text">FITLOG</span>
          </Link>
        </div>

        {/* CENTER NAVIGATION */}
        <nav className={`navbar-links ${menuOpen ? "mobile-open" : ""}`}>
          <Link
            href="/"
            className={workoutActive ? "navbar-link active" : "navbar-link"}
            onClick={() => setMenuOpen(false)}
          >
            WORKOUT
          </Link>

          <Link
            href="/my-plan"
            className={planActive ? "navbar-link active" : "navbar-link"}
            onClick={() => setMenuOpen(false)}
          >
            MY PLAN
          </Link>
        </nav>

        {/* RIGHT SIDE */}
        <div className="navbar-actions">
          <Link
            href="/my-plan"
            className="plan-badge"
            aria-label={`Today's plan: ${plan.length} workouts`}
          >
            <span>PLAN</span>
            <strong>{plan.length}</strong>
          </Link>

          <Link
            href="/my-plan"
            className="saved-badge"
            aria-label={`Saved workouts: ${saved.length}`}
          >
            <span>SAVED</span>
            <strong>{saved.length}</strong>
          </Link>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
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
