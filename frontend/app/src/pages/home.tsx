import Header from "../components/Header";
import { CalendarComponent } from "../components/calendarComponent";

export default function Home() {
  return (
    <>
      <Header />
      <div className="h-screen w-screen bg-yellow-50 text-xl">
        <CalendarComponent />
      </div>
    </>
  );
}
