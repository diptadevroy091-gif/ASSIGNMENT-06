import HomeClient from "../components/HomeClient";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkouts() {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load workouts");
  }

  return response.json();
}

export default async function HomePage() {
  const workouts = await getWorkouts();

  return <HomeClient workouts={workouts} />;
}
