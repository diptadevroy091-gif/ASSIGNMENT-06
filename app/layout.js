import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PlanProvider } from "../context/PlanProvider";
import Toast from "../components/Toast";

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          <Navbar />
          <Toast />
          <main>{children}</main>
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}
