"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const PlanContext = createContext(null);

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
const DONE_KEY = "fitlog-done";

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [toast, setToast] = useState("");
  const [hydrated, setHydrated] = useState(false);

  // Keeps track of the current toast timer
  const toastTimerRef = useRef(null);

  // =========================
  // LOAD FROM LOCAL STORAGE
  // =========================
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_KEY);
      const storedSaved = localStorage.getItem(SAVED_KEY);
      const storedDone = localStorage.getItem(DONE_KEY);

      if (storedPlan) {
        setPlan(JSON.parse(storedPlan));
      }

      if (storedSaved) {
        setSaved(JSON.parse(storedSaved));
      }

      if (storedDone) {
        setDone(JSON.parse(storedDone));
      }
    } catch (error) {
      console.error("Failed to load FitLog data:", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  // =========================
  // CLEAN TOAST TIMER
  // =========================
  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  // =========================
  // SAVE PLAN
  // =========================
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  // =========================
  // SAVE SAVED
  // =========================
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  // =========================
  // SAVE DONE
  // =========================
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(DONE_KEY, JSON.stringify(done));
  }, [done, hydrated]);

  // =========================
  // TOAST
  // =========================
  function showToast(message) {
    // Cancel previous timer
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }

    // Show new message
    setToast(message);

    // Hide after 3 seconds
    toastTimerRef.current = setTimeout(() => {
      setToast("");
      toastTimerRef.current = null;
    }, 3000);
  }

  // =========================
  // ADD TO TODAY'S PLAN
  // =========================
  function addToPlan(workout) {
    setPlan((currentPlan) => {
      const alreadyExists = currentPlan.some(
        (item) => String(item.id) === String(workout.id),
      );

      // Already added
      if (alreadyExists) {
        showToast("Already in Today's Plan.");
        return currentPlan;
      }

      // Maximum 5 workouts
      if (currentPlan.length >= 5) {
        showToast("Today's plan is full.");
        return currentPlan;
      }

      // New workout added
      showToast(`${workout.name} added to today's plan.`);

      return [...currentPlan, workout];
    });
  }

  // =========================
  // REMOVE FROM PLAN
  // =========================
  function removeFromPlan(id) {
    // Remove workout from today's plan
    setPlan((currentPlan) =>
      currentPlan.filter((item) => String(item.id) !== String(id)),
    );

    // IMPORTANT:
    // Also remove the workout from DONE state.
    // This means if the same workout is added again,
    // it will show "Mark as Done" instead of "Done".
    setDone((currentDone) =>
      currentDone.filter((doneId) => String(doneId) !== String(id)),
    );

    showToast("Removed from today's plan.");
  }

  // =========================
  // SAVE FOR LATER
  // =========================
  function saveWorkout(workout) {
    setSaved((currentSaved) => {
      const alreadySaved = currentSaved.some(
        (item) => String(item.id) === String(workout.id),
      );

      if (alreadySaved) {
        showToast("Already saved.");
        return currentSaved;
      }

      showToast(`${workout.name} saved for later.`);

      return [...currentSaved, workout];
    });
  }

  // =========================
  // REMOVE SAVED
  // =========================
  function removeSaved(id) {
    setSaved((currentSaved) =>
      currentSaved.filter((item) => String(item.id) !== String(id)),
    );

    showToast("Removed from saved.");
  }

  // =========================
  // MARK AS DONE
  // =========================
  function markDone(id) {
    setDone((currentDone) => {
      const alreadyDone = currentDone.some(
        (doneId) => String(doneId) === String(id),
      );

      if (alreadyDone) {
        showToast("Workout is already done.");
        return currentDone;
      }

      showToast("Workout marked as done.");

      return [...currentDone, id];
    });
  }

  // =========================
  // CONTEXT VALUE
  // =========================
  const value = useMemo(
    () => ({
      plan,
      saved,
      done,
      toast,
      hydrated,

      addToPlan,
      removeFromPlan,
      saveWorkout,
      removeSaved,
      markDone,
    }),
    [plan, saved, done, toast, hydrated],
  );

  return (
    <PlanContext.Provider value={value}>
      {children}

      {toast && <div className="toast">{toast}</div>}
    </PlanContext.Provider>
  );
}

// =========================
// USE PLAN HOOK
// =========================
export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used inside PlanProvider");
  }

  return context;
}
