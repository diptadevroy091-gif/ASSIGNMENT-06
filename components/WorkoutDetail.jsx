"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePlan } from "../context/PlanProvider";

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
        <div className={`toast toast-${toast.type}`}>
          <span className="toast-icon">
            {toast.type === "success" ? "✓" : "!"}
          </span>

          <span>{toast.message}</span>
        </div>
      )}

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
                <span className="already-added-icon">✓</span>

                <span>Already in Today's Plan</span>
              </button>
            ) : (
              <button
                type="button"
                className="primary-action"
                disabled={planFull}
                onClick={handleAddToPlan}
              >
                {planFull ? "Plan Full" : "Add to Today's Plan"}
              </button>
            )}

            <button
              type="button"
              className="secondary-action"
              onClick={handleSave}
            >
              Save for Later
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
