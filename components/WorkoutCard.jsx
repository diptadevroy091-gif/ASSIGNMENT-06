import Link from "next/link";

export default function WorkoutCard({ workout }) {
  return (
    <article className="workout-card">
      <Link href={`/workout/${workout.id}`} className="card-link">
        <div className="card-image-wrapper">
          <img src={workout.image} alt={workout.name} className="card-image" />
        </div>

        <div className="card-content">
          <div className="tag-row">
            {workout.muscleGroups?.map((group) => (
              <span className="tag" key={group}>
                {group}
              </span>
            ))}
          </div>

          <h3>{workout.name}</h3>

          <p className="equipment">{workout.equipment}</p>

          <div className="stats-row">
            <span className="stat">
              <span className="stat-icon">◷</span>
              {workout.duration} min
            </span>

            <span className="stat">
              <span className="stat-icon">♥</span>
              {workout.caloriesBurned} kcal
            </span>

            <span className="stat">
              <span className="stat-icon">☆</span>
              {workout.rating}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
