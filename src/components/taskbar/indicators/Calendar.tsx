import { useEffect, useState, useCallback } from "react";
import styles from "./Calendar.module.css";
import { OutsideClickListener } from "../../../hooks/_utils/outsideClick";
import { UtilMenu } from "../menus/UtilMenu";

interface CalendarProps {
  hideUtilMenus: boolean;
  showUtilMenu: Function;
}

export function Calendar({ hideUtilMenus, showUtilMenu }: CalendarProps) {
  const [date, setDate] = useState(new Date());
  const [showMenu, setShowMenu] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hideUtilMenus && showMenu) {
      setShowMenu(false);
    }
  }, [hideUtilMenus, showMenu]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        handlePreviousMonth();
      } else if (event.key === "ArrowRight") {
        handleNextMonth();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const updateShowMenu = (show: boolean) => {
    if (show) showUtilMenu();
    setShowMenu(show);
  };

  const daysInMonth = useCallback((month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  }, []);

  const firstDayOfMonth = useCallback((month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  }, []);

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth === 0 ? 11 : prevMonth - 1;
      if (newMonth === 11) {
        setCurrentYear((prevYear) => prevYear - 1);
      }
      return newMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth === 11 ? 0 : prevMonth + 1;
      if (newMonth === 0) {
        setCurrentYear((prevYear) => prevYear + 1);
      }
      return newMonth;
    });
  };

  const renderCalendar = useCallback(() => {
    const days = [];
    const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);

    // Push empty cells for the days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.CalendarCell}></div>);
    }

    // Push cells for each day of the month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const isToday =
        i === date.getDate() &&
        currentMonth === date.getMonth() &&
        currentYear === date.getFullYear();
      days.push(
        <div
          key={i}
          className={`${styles.CalendarCell} ${
            isToday ? styles.CurrentDay : ""
          }`}
        >
          {i}
        </div>
      );
    }

    return days;
  }, [currentMonth, currentYear, date, daysInMonth, firstDayOfMonth]);

  return (
    <OutsideClickListener onOutsideClick={() => updateShowMenu(false)}>
      <button
        className={styles.Button}
        title="Date & Time"
        tabIndex={0}
        onClick={() => updateShowMenu(!showMenu)}
      >
        {date.toLocaleString("en-GB", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        })}
        <br />
        {date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </button>
      <UtilMenu active={showMenu} setActive={setShowMenu} className={styles.Menu}>
        <p className={styles.Time}>
          {date.toLocaleString("en-GB", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
          })}
        </p>
        <p className={styles.Date}>
          {date.toLocaleString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <div className={styles.Calendar}>
          <div className={styles.CalendarNavigation}>
            <button onClick={handlePreviousMonth} className={styles.NavButton}>&larr;</button><button onClick={handleNextMonth} className={styles.NavButton}>&rarr;</button>
            <span className={styles.MonthYear}>
              {new Date(currentYear, currentMonth).toLocaleString("en-GB", {
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className={styles.CalendarGrid}>{renderCalendar()}</div>
        </div>
      </UtilMenu>
    </OutsideClickListener>
  );
}