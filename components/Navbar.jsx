"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "../context/PlanProvider";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const workoutActive = pathname === "/" || pathname.startsWith("/workout");

  const planActive = pathname.startsWith("/my-plan");

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* BRAND */}
        <Link href="/" className="navbar-brand">
          <img
            src="/images/logo.png"
            alt="FitLog logo"
            className="navbar-logo"
          />

          <span className="navbar-brand-text">FITLOG</span>
        </Link>

        {/* NAVIGATION */}
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

        {/* STATUS BADGES */}
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
    </header>
  );
}
