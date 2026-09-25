"use client";

import { usePlan } from "../context/PlanProvider";

export default function Toast() {
  const { toast } = usePlan();

  if (!toast) return null;

  return (
    <div className="toast-container">
      <div className="toast">{toast}</div>
    </div>
  );
}
