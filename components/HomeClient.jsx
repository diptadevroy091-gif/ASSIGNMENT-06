import WorkoutCard from "./WorkoutCard";

export default function HomeClient({ workouts = [] }) {
  return (
    <main className="home">
      {/* =========================
          HERO / BANNER
      ========================== */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-eyebrow">WORKOUT LIBRARY</p>

          <h1 className="hero-title">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="hero-description">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>

          <a href="#library" className="hero-button">
            <span>BROWSE WORKOUTS</span>
            <span className="hero-button-arrow">↓</span>
          </a>
        </div>

        {/* HERO IMAGE */}
        <div className="hero-visual">
          <img
            src="/images/banner.png"
            alt="FitLog workout banner"
            className="hero-image"
          />
        </div>
      </section>

      {/* =========================
          LIBRARY
      ========================== */}
      <section className="library" id="library">
        <div className="library-heading">
          <div>
            <p className="library-eyebrow">EXPLORE</p>

            <h2 className="section-title">THE LIBRARY</h2>

            <p className="section-subtitle">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
        </div>

        {/* WORKOUT CARDS */}
        {workouts.length === 0 ? (
          <div className="loading">LOADING WORKOUTS...</div>
        ) : (
          <div className="workout-grid">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
