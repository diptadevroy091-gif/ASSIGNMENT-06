"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePlan } from "../context/PlanProvider";

export default function MyPlanClient() {
  const { plan, saved, done, removeFromPlan, markDone, removeSaved, hydrated } =
    usePlan();

  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  // ==========================================
  // CURRENT TAB DATA
  // ==========================================

  const currentItems = activeTab === "plan" ? plan : saved;

  // ==========================================
  // SORT
  // ==========================================

  const sortedItems = useMemo(() => {
    const copy = [...currentItems];

    if (sortBy === "duration") {
      copy.sort((a, b) => Number(a.duration || 0) - Number(b.duration || 0));
    }

    if (sortBy === "calories") {
      copy.sort(
        (a, b) => Number(a.caloriesBurned || 0) - Number(b.caloriesBurned || 0),
      );
    }

    if (sortBy === "rating") {
      copy.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    }

    return copy;
  }, [currentItems, sortBy]);

  // ==========================================
  // METRICS
  // ==========================================
  // IMPORTANT:
  // These now use CURRENT TAB data.
  //
  // Today's Plan -> plan
  // Saved        -> saved

  const totalExercises = currentItems.length;

  const totalMinutes = currentItems.reduce(
    (sum, item) => sum + Number(item.duration || 0),
    0,
  );

  const totalCalories = currentItems.reduce(
    (sum, item) => sum + Number(item.caloriesBurned || 0),
    0,
  );

  // ==========================================
  // LOADING
  // ==========================================

  if (!hydrated) {
    return (
      <div className="loading-page">
        <span className="loading-spinner" />
        LOADING WORKOUTS...
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <main className="plan-page">
      {/* ======================================
          HEADER
      ====================================== */}

      <header className="plan-header">
        <div>
          <h1 className="plan-title">MY PLAN</h1>

          <p className="plan-subtitle">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>
      </header>

      {/* ======================================
          METRICS
      ====================================== */}

      <section className="metrics">
        <div className="metric">
          <span className="metric-label">Exercises</span>

          <strong className="metric-value">{totalExercises}</strong>
        </div>

        <div className="metric">
          <span className="metric-label">Minutes</span>

          <strong className="metric-value">{totalMinutes}</strong>
        </div>

        <div className="metric">
          <span className="metric-label">Calories</span>

          <strong className="metric-value">{totalCalories}</strong>
        </div>
      </section>

      {/* ======================================
          TOOLBAR
      ====================================== */}

      <div className="plan-toolbar">
        <div className="plan-tabs">
          <button
            className={activeTab === "plan" ? "plan-tab active" : "plan-tab"}
            onClick={() => setActiveTab("plan")}
          >
            Today's Plan
          </button>

          <button
            className={activeTab === "saved" ? "plan-tab active" : "plan-tab"}
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </button>
        </div>

        <label className="sort-box">
          Sort By
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="duration">Duration</option>

            <option value="calories">Calories</option>

            <option value="rating">Rating</option>
          </select>
        </label>
      </div>

      {/* ======================================
          EMPTY STATE
      ====================================== */}

      {sortedItems.length === 0 ? (
        <div className="empty-state">
          <h2>NOTHING HERE YET</h2>

          <p>Browse the library and add a lift to get today moving.</p>

          <Link href="/" className="empty-button">
            GO TO WORKOUTS
          </Link>
        </div>
      ) : (
        /* ====================================
           WORKOUT LIST
        ==================================== */

        <div className="plan-list">
          {sortedItems.map((workout) => {
            const isDone = done.some((id) => String(id) === String(workout.id));

            return (
              <article
                className={isDone ? "plan-card done" : "plan-card"}
                key={workout.id}
              >
                {/* IMAGE */}

                <img
                  src={workout.image}
                  alt={workout.name}
                  className="plan-thumb"
                />

                {/* INFO */}

                <div>
                  <h2 className="plan-card-title">{workout.name}</h2>

                  <p className="plan-card-equipment">{workout.equipment}</p>

                  <div className="plan-card-stats">
                    <span>◷ {workout.duration} min</span>

                    <span>♥ {workout.caloriesBurned} kcal</span>

                    <span>☆ {workout.rating}</span>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="plan-card-actions">
                  <Link href={`/workout/${workout.id}`} className="plan-action">
                    View Details
                  </Link>

                  {/* MARK AS DONE ONLY FOR PLAN */}

                  {activeTab === "plan" && (
                    <button
                      className={
                        isDone ? "plan-action done-action" : "plan-action"
                      }
                      disabled={isDone}
                      onClick={() => markDone(workout.id)}
                    >
                      {isDone ? "Done" : "Mark as Done"}
                    </button>
                  )}

                  {/* REMOVE */}

                  {activeTab === "plan" ? (
                    <button
                      className="remove-action"
                      aria-label="Remove from plan"
                      onClick={() => removeFromPlan(workout.id)}
                    >
                      ×
                    </button>
                  ) : (
                    <button
                      className="remove-action"
                      aria-label="Remove from saved"
                      onClick={() => removeSaved(workout.id)}
                    >
                      ×
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
