import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: any) => twMerge(clsx(inputs));

/************************************
  type
************************************/

type ScheduleType = {
  name: string;
  year: number;
  month: number;
  day: number;
  color: string;
};

type ScheduleCalendarProps = {
  id?: string;
  schedules: ScheduleType[];
  className?: string;
  defaultYear?: number;
  defaultMonth?: number;
  startOnMonday?: boolean;
};

/************************************
  animation
************************************/

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : direction === 0 ? 0 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 100;

const CarouselArea = ({ page, direction, children, onPrev, onNext }: any) => {
  return (
    <motion.div
      className="slider-item h-[100%] w-[100%]"
      key={page}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={(_e, { offset, velocity }) => {
        const swipe = swipePower(offset.x, velocity.x);
        if (swipe < -swipeConfidenceThreshold) {
          onNext();
        } else if (swipe > swipeConfidenceThreshold) {
          onPrev();
        }
      }}
    >
      {children}
    </motion.div>
  );
};

/************************************
  calendar
************************************/

const toDouble: any = (number: number) => {
  return `0${String(number)}`.slice(-2);
};

const init = () => {
  return ["", "", "", "", "", "", ""];
};

const getData = (yy: number, mm: number, startOnMonday: boolean) => {
  const first = new Date(yy, mm - 1, 1);
  const last = new Date(yy, mm, 0);
  let firstWeek = first.getDay();
  const lastDate = last.getDate();
  const result = [];
  let weekArray = init();

  if (startOnMonday) {
    if (firstWeek === 0) {
      firstWeek = 6;
    } else {
      firstWeek = firstWeek - 1;
    }
  }

  for (let i = 1; i <= lastDate; i += 1) {
    weekArray[firstWeek] = String(i);
    if (firstWeek === 6 || i === lastDate) {
      result.push(weekArray);
      weekArray = init();
      firstWeek = -1;
    }
    firstWeek += 1;
  }
  return result;
};

const getCalendar = (year: number, month: number, startOnMonday: boolean) => {
  let yy = year;
  let mm = month;
  if (month === 13) {
    yy += 1;
    mm = 1;
  } else if (month === 0) {
    yy -= 1;
    mm = 12;
  }
  const calendar = getData(yy, mm, startOnMonday);
  const result = { year: yy, month: mm, calendar };
  return result;
};

const ScheduleItem = ({ color }: { color?: string }) => {
  return (
    <span
      className="h-[6px] w-[6px] rounded-full"
      style={{ background: color }}
    />
  );
};

const WeekHeader = ({ startOnMonday }: { startOnMonday?: boolean }) => {
  // const monday = startOnMonday ?? true;
  return (
    <div className="week-header grid w-[100%] grid-cols-7 border-b border-white text-center text-sm font-bold shadow-sm">
      {startOnMonday ? null : (
        <span className="py-3 text-xs text-red-400">Sun</span>
      )}
      <span className="py-3 text-xs">Mon</span>
      <span className="py-3 text-xs">Tue</span>
      <span className="py-3 text-xs">Wed</span>
      <span className="py-3 text-xs">Thu</span>
      <span className="py-3 text-xs">Fri</span>
      <span className="py-3 text-xs text-blue-400">Sat</span>
      {startOnMonday ? (
        <span className="py-3 text-xs text-red-400">Sun</span>
      ) : null}
    </div>
  );
};

const WeekRow = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        // ボーダーカラーは横枠線の色
        "flex w-[100%] flex-1 border-b border-white text-center",
        className,
      )}
    >
      {children}
    </div>
  );
};

const Calendar = (props: any) => {
  const { year, month, schedules, onClick, startOnMonday } = props;
  const data = getCalendar(year, month, startOnMonday);

  return (
    <div className="flex h-[100%] w-[100%] flex-1 flex-col">
      {data.calendar.map((week: string[], key: number) => {
        return (
          <WeekRow
            className={cn(
              key === data?.calendar.length - 1 ? "border-b-0" : "",
            )}
          >
            {week.map((e, _key) => {
              return (
                <div
                  key={`day-${_key}`}
                  className={cn(
                    // text-gray-400は印のついてない日のフォントカラー
                    // ボーダーカラーは枠線
                    `flex flex-1 flex-col border-r border-white py-2 text-sm text-gray-400 [&:nth-child(7n)]:border-r-0`,
                    e === "" ? "bg-green-100" : "",
                    schedules.find(
                      (s: ScheduleType) =>
                        s.day === Number(e) &&
                        s.month === month &&
                        s.year === year,
                    )
                      ? // 印のついた日付のフォントカラー
                        "cursor-pointer font-bold text-gray-800"
                      : "",
                  )}
                  onClick={() => onClick(e)}
                >
                  <span>{e}</span>
                  <div className="mt-1 flex justify-center gap-[2px]">
                    {schedules?.map((s: any, key: number) => {
                      if (
                        s.day === Number(e) &&
                        s.month === month &&
                        s.year === year
                      ) {
                        return (
                          <ScheduleItem
                            key={`${s.year}${s.month}${s.day}${key}`}
                            color={s.color}
                          />
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </WeekRow>
        );
      })}
    </div>
  );
};

/************************************
  schedule component
************************************/

export const ScheduleCalendar = (props: ScheduleCalendarProps) => {
  const { id, schedules, className, defaultYear, defaultMonth, startOnMonday } =
    props;
  let t: any = null;
  if (defaultYear && defaultMonth) {
    t = new Date(`${defaultYear}-${defaultMonth}-1`);
  } else {
    t = new Date();
  }
  const [y, setY]: any = useState(t.getFullYear());
  const [m, setM]: any = useState(t.getMonth() + 1);

  const [[page, direction], setPage] = React.useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const onClick = (d: any) => {
    console.log(`${y}-${m}-${d}`);
  };

  const onNext = () => {
    paginate(1);
    if (m < 12) {
      setM(m + 1);
    } else {
      setY(y + 1);
      setM(1);
    }
  };

  const onPrev = () => {
    paginate(-1);
    if (m > 1) {
      setM(m - 1);
    } else {
      setY(y - 1);
      setM(12);
    }
  };

  return (
    <div
      id={id}
      className={cn(
        "flex w-[100%] flex-col rounded-xl bg-green-100",
        className,
      )}
    >
      <div className="calendar-header mb-3 flex w-[100%] items-center justify-between px-1 text-gray-700">
        <div className="buttons mt-1 flex items-center gap-5 text-sm font-black">
          <button onClick={onPrev}>&lt;&lt;</button>
        </div>
        <h2 className="heading-2 text-xl font-bold">
          {y}-{toDouble(m)}
        </h2>
        <div className="buttons mt-1 flex items-center gap-5 text-sm font-black">
          <button onClick={onNext}>&gt;&gt;</button>
        </div>
      </div>
      <div className="h-[100%] w-[100%] flex-1 select-none">
        <div
          id={id}
          className="flex h-[100%] w-[100%] select-none flex-col overflow-hidden rounded-md shadow-md"
        >
          <WeekHeader startOnMonday={startOnMonday} />
          <AnimatePresence>
            <CarouselArea
              page={page}
              direction={direction}
              onNext={onNext}
              onPrev={onPrev}
            >
              <Calendar
                year={y}
                month={m}
                onClick={onClick}
                schedules={schedules}
                startOnMonday={startOnMonday}
              />
            </CarouselArea>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
