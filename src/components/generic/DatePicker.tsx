import { ReactNode, useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import {
  format,
  addMonths,
  subMonths,
  isBefore,
  isAfter,
  isEqual,
  startOfMonth,
  lastDayOfMonth,
  getDate,
  endOfMonth,
  addDays,
  isSameDay,
} from "date-fns";

interface DatePickerProps {
  appearContent: ReactNode;
  containerClassname: string;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DatePicker = ({
  appearContent,
  containerClassname,
  date: selectedDate,
  setDate: setSelectedDate,
}: DatePickerProps) => {
  const [show, setShow] = useState(false);

  const toggleDatePicker = () => {
    setShow(!show);
  };

  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [date, setDate] = useState(new Date());
  const [datesInMonth, setDatesInMonth] = useState<Date[]>([]);
  const [startCalendarFromWeekIndex, setStartCalendarFromWeekIndex] =
    useState(0);

  const addMonth = () => {
    let newDate = addMonths(date, 1);
    setDate(newDate);
  };

  const subtractMonth = () => {
    let newDate = subMonths(date, 1);
    setDate(newDate);
  };

  const handleDateChange = () => {
    if (date) {
      setDatesInMonth([]);
      console.log("Date: ", date);
      const firstOfMonth = startOfMonth(date); // eg 1 aug
      const weekdayName = format(firstOfMonth, "EEEE"); // eg thursday
      let index = daysOfWeek.findIndex(
        (item) => item.toLowerCase() === weekdayName.toLowerCase(), // eg 5
      );
      console.log(weekdayName);

      setStartCalendarFromWeekIndex(index);
      console.log(index);

      let tempDate = firstOfMonth;
      let lastDate = endOfMonth(date); // eg 31 aug
      let firstDateValue = getDate(firstOfMonth); // eg 1
      let lastDateValue = getDate(lastDate); // eg 31

      let availableDates = [];
      let today = new Date();
      for (let i = firstDateValue; i <= lastDateValue; i++) {
        // console.log("Iterat: ", tempDate);
        if (isAfter(tempDate, today) || isSameDay(tempDate, today)) {
          availableDates.push(tempDate); // eg 2 aug, 3 aug, 4 aug, ...
        }

        tempDate = addDays(tempDate, 1);
      }
      setDatesInMonth(availableDates);
      console.log(availableDates);
    }
  };

  useEffect(() => {
    handleDateChange();
  }, [date]);

  return (
    <div className={containerClassname}>
      <div className="relative">
        <div onClick={toggleDatePicker}>{appearContent}</div>
        {show && (
          <div
            ref={popupRef}
            className="absolute left-0 top-0 mt-10 cursor-default rounded-lg bg-white shadow-[0_4px_4px_4px_rgba(0,0,0,0.11)]  z-[10]"
          >
            <div className="w-[450px] p-4 md:w-[500px]">
              {/* MONTH AND CONTROLS */}
              <div className="flex items-center justify-between">
                {isAfter(date, new Date()) ? (
                  <div
                    onClick={() => subtractMonth()}
                    className="cursor-pointer"
                  >
                    <HiChevronLeft size={25} />
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="text-center text-lg font-semibold">
                  {format(date, "MMMM yyyy")}
                </div>
                <div onClick={() => addMonth()} className="cursor-pointer">
                  <HiChevronRight size={25} />
                </div>
              </div>
              <div className="mt-8 text-center">
                <div className="grid grid-cols-7">
                  {/* DAYS OF WEEK TEXT */}
                  {daysOfWeek?.map((day) => (
                    <div className="text-sm text-gray-700" key={day}>
                      {day.slice(0, 2)}
                    </div>
                  ))}

                  {/* Blank dates */}
                  {Array.from(
                    {
                      length: startCalendarFromWeekIndex,
                    },
                    (_, index) => (
                      <div key={index}></div>
                    ),
                  )}

                  {/* DATES TEXT */}
                  {datesInMonth?.map((item) => (
                    <div
                      className={`text-sm ${isSameDay(selectedDate, item) ? "bg-primary-400 hover:bg-primary-600 text-onprimary" : "hover:bg-gray-50"} cursor-pointer rounded-md px-1 py-3 m-2`}
                      key={item.getMilliseconds()}
                      onClick={() => {
                        setDate(item);
                        setSelectedDate(item);
                        setShow(false);
                      }}
                    >
                      {getDate(item)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DatePicker;
