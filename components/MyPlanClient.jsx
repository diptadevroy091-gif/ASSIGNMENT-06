"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePlan } from "../context/PlanProvider";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22c4 0 7-2.8 7-6.8 0-3.2-1.8-5.6-4.2-7.7.1 2-1 3.2-2.2 3.8.1-3.8-1.7-6.8-4.4-9.3.2 4.5-4.2 6.4-4.2 11.4C4 18.9 7.2 22 12 22Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    </svg>
  );
}

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
      {/* HEADER */}

      <header className="plan-header">
        <div>
          <h1 className="plan-title">MY PLAN</h1>

          <p className="plan-subtitle">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>
      </header>

      {/* METRICS */}

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

      {/* TOOLBAR */}

      <div className="plan-toolbar">
        <div className="plan-tabs">
          <button
            type="button"
            className={activeTab === "plan" ? "plan-tab active" : "plan-tab"}
            onClick={() => setActiveTab("plan")}
          >
            Today's Plan
          </button>

          <button
            type="button"
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

      {/* EMPTY STATE */}

      {sortedItems.length === 0 ? (
        <div className="empty-state">
          <h2>NOTHING HERE YET</h2>

          <p>Browse the library and add a lift to get today moving.</p>

          <Link href="/" className="empty-button">
            GO TO WORKOUTS
          </Link>
        </div>
      ) : (
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
                    <span>
                      <ClockIcon />
                      {workout.duration} min
                    </span>

                    <span>
                      <FlameIcon />
                      {workout.caloriesBurned} kcal
                    </span>

                    <span>
                      <StarIcon />
                      {workout.rating}
                    </span>
                  </div>
                </div>

                {/* ACTIONS */}

                <div className="plan-card-actions">
                  {/* VIEW DETAILS */}

                  <Link href={`/workout/${workout.id}`} className="plan-action">
                    View Details
                  </Link>

                  {/* MARK AS DONE */}

                  {activeTab === "plan" && (
                    <button
                      type="button"
                      className={
                        isDone ? "plan-action done-action" : "plan-action"
                      }
                      disabled={isDone}
                      onClick={() => markDone(workout.id)}
                    >
                      <span className="action-icon">
                        <CheckIcon />
                      </span>

                      <span>{isDone ? "Done" : "Mark as Done"}</span>
                    </button>
                  )}

                  {/* REMOVE */}

                  {activeTab === "plan" ? (
                    <button
                      type="button"
                      className="remove-action"
                      aria-label={`Remove ${workout.name} from plan`}
                      title="Remove from plan"
                      onClick={() => removeFromPlan(workout.id)}
                    >
                      <CloseIcon />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="remove-action"
                      aria-label={`Remove ${workout.name} from saved`}
                      title="Remove from saved"
                      onClick={() => removeSaved(workout.id)}
                    >
                      <CloseIcon />
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
