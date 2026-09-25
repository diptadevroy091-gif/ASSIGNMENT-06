import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <div>
        <h1>404</h1>

        <h2>Workout Not Found</h2>

        <p>The page you are looking for does not exist.</p>

        <Link href="/" className="empty-button">
          GO TO WORKOUTS
        </Link>
      </div>
    </div>
  );
}
