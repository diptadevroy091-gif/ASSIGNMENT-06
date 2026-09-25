"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePlan } from "../context/PlanProvider";

function PlusIcon() {
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
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function BookmarkIcon({ filled = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 3.5A1.5 1.5 0 0 1 7.5 2h9A1.5 1.5 0 0 1 18 3.5V21l-6-3.8L6 21V3.5Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
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

function AlertIcon() {
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
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16h.01" />
    </svg>
  );
}

export default function WorkoutDetail({ workout }) {
  const { plan, saveWorkout, addToPlan } = usePlan();

  const [toast, setToast] = useState(null);

  const alreadyAdded = plan.some(
    (item) => String(item.id) === String(workout.id),
  );

  const planFull = plan.length >= 5 && !alreadyAdded;

  function showToast(type, message) {
    setToast({ type, message });
  }

  function handleAddToPlan() {
    if (alreadyAdded) {
      showToast("error", "Already added to today's plan.");
      return;
    }

    if (planFull) {
      showToast("error", "Today's plan is full.");
      return;
    }

    addToPlan(workout);

    showToast("success", "Added to today's plan.");
  }

  function handleSave() {
    saveWorkout(workout);

    showToast("success", "Saved for later.");
  }

  useEffect(() => {
    if (!toast) return;

    const timer = setTimeout(() => {
      setToast(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <main className="detail-page">
      {/* TOAST */}
      {toast && (
        <div
          className={`toast toast-${toast.type}`}
          role="status"
          aria-live="polite"
        >
          <span className="toast-icon">
            {toast.type === "success" ? <CheckIcon /> : <AlertIcon />}
          </span>

          <span>{toast.message}</span>
        </div>
      )}

      {/* BACK */}
      <Link href="/" className="back-link">
        ← Back to workouts
      </Link>

      <div className="detail-layout">
        {/* IMAGE */}
        <div>
          <img
            src={workout.image}
            alt={workout.name}
            className="detail-image"
          />
        </div>

        {/* CONTENT */}
        <div className="detail-content">
          <h1 className="detail-title">{workout.name}</h1>

          <p className="detail-description">{workout.description}</p>

          {/* TAGS */}
          <div className="detail-tags">
            {workout.muscleGroups?.map((group) => (
              <span className="tag" key={group}>
                {group}
              </span>
            ))}
          </div>

          {/* SPEC TABLE */}
          <div className="spec-table">
            <div className="spec-row">
              <span className="spec-label">EQUIPMENT</span>
              <span className="spec-value">{workout.equipment}</span>
            </div>

            <div className="spec-row">
              <span className="spec-label">DIFFICULTY</span>
              <span className="spec-value">{workout.difficulty}</span>
            </div>

            <div className="spec-row">
              <span className="spec-label">SETS</span>
              <span className="spec-value">{workout.sets}</span>
            </div>

            <div className="spec-row">
              <span className="spec-label">REPS</span>
              <span className="spec-value">{workout.reps}</span>
            </div>

            <div className="spec-row">
              <span className="spec-label">DURATION</span>
              <span className="spec-value">{workout.duration} min</span>
            </div>

            <div className="spec-row">
              <span className="spec-label">CALORIES</span>
              <span className="spec-value">{workout.caloriesBurned} kcal</span>
            </div>

            <div className="spec-row">
              <span className="spec-label">RATING</span>
              <span className="spec-value">{workout.rating}</span>
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <h2 className="instructions-title">INSTRUCTIONS</h2>

          <ol className="instructions">
            {workout.instructions?.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>

          {/* ACTIONS */}
          <div className="detail-actions">
            {alreadyAdded ? (
              <button
                type="button"
                className="already-added-action"
                onClick={handleAddToPlan}
              >
                <span className="action-icon">
                  <CheckIcon />
                </span>

                <span>Already in Today's Plan</span>
              </button>
            ) : (
              <button
                type="button"
                className="primary-action"
                disabled={planFull}
                onClick={handleAddToPlan}
              >
                <span className="action-icon">
                  {planFull ? <AlertIcon /> : <PlusIcon />}
                </span>

                <span>{planFull ? "Plan Full" : "Add to Today's Plan"}</span>
              </button>
            )}

            <button
              type="button"
              className="secondary-action"
              onClick={handleSave}
            >
              <span className="action-icon">
                <BookmarkIcon />
              </span>

              <span>Save for Later</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
