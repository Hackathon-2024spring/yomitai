import { ScheduleCalendar } from "./calendar";

export const CalendarComponent = () => {
  const date = new Date();
  const schedules = [
    {
      name: "Schedule1",
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: 20,
      color: "#ff0049",
    },
    {
      name: "Schedule2",
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: 25,
      color: "#0ce7ff",
    },
    {
      name: "Schedule3",
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: 25,
      color: "#68df00",
    },
  ];
  return (
    <div className="flex items-center justify-center p-0 sm:p-5">
      <ScheduleCalendar
        schedules={schedules}
        className="h-[95vh] w-[90%] sm:h-[380px] sm:w-[380px]"
        startOnMonday
      />
    </div>
  );
};
