import { useEffect, useReducer, useState, useCallback } from "react";
import styles from "./Calendar.module.css";
import { OutsideClickListener } from "../../../hooks/_utils/outsideClick";
import { UtilMenu } from "../menus/UtilMenu";

interface CalendarProps {
  hideUtilMenus: boolean;
  showUtilMenu: Function;
}

interface CalendarState {
  currentMonth: number;
  currentYear: number;
}

type CalendarAction = 
  | { type: 'PREVIOUS_MONTH' }
  | { type: 'NEXT_MONTH' };

function calendarReducer(state: CalendarState, action: CalendarAction): CalendarState {
  switch (action.type) {
    case 'PREVIOUS_MONTH': {
      const newMonth = state.currentMonth === 0 ? 11 : state.currentMonth - 1;
      const newYear = state.currentMonth === 0 ? state.currentYear - 1 : state.currentYear;
      console.log(`Month changed to ${newMonth}`);
      console.log(`Year changed to ${newYear}`);
      return { currentMonth: newMonth, currentYear: newYear };
    }
    case 'NEXT_MONTH': {
      const newMonth = state.currentMonth === 11 ? 0 : state.currentMonth + 1;
      const newYear = state.currentMonth === 11 ? state.currentYear + 1 : state.currentYear;
      console.log(`Month changed to ${newMonth}`);
      console.log(`Year changed to ${newYear}`);
      return { currentMonth: newMonth, currentYear: newYear };
    }
    default:
      return state;
  }
}

export function Calendar({ hideUtilMenus, showUtilMenu }: CalendarProps) {
  const [date, setDate] = useState(new Date());
  const [showMenu, setShowMenu] = useState(false);
  const [state, dispatch] = useReducer(calendarReducer, {
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
  });

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
    dispatch({ type: 'PREVIOUS_MONTH' });
  };

  const handleNextMonth = () => {
    dispatch({ type: 'NEXT_MONTH' });
  };

  const renderCalendar = useCallback(() => {
    const days = [];
    const daysInCurrentMonth = daysInMonth(state.currentMonth, state.currentYear);
    const firstDay = firstDayOfMonth(state.currentMonth, state.currentYear);

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.CalendarCell}></div>);
    }

    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const isToday =
        i === date.getDate() &&
        state.currentMonth === date.getMonth() &&
        state.currentYear === date.getFullYear();
      days.push(
        <div
          key={i}
          className={`${styles.CalendarCell} ${isToday ? styles.CurrentDay : ""}`}
        >
          {i}
        </div>
      );
    }

    return days;
  }, [state.currentMonth, state.currentYear, date, daysInMonth, firstDayOfMonth]);

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

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
          hour12: true,  // Use 12-hour format
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
            hour12: true,  // Use 12-hour format
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
          <div className={styles.CalendarHeader}>
            <button className={styles.prevButton} onClick={handlePreviousMonth}>&larr;</button>
            <span className={styles.monthYear}>
              {new Date(state.currentYear, state.currentMonth).toLocaleString("en-GB", {
                month: "long",
                year: "numeric",
              })}
            </span>
            <button className={styles.nextButton} onClick={handleNextMonth}>&rarr;</button>
          </div>
          <div className={styles.Weekdays}>
            {weekdays.map(day => (
              <div key={day} className={styles.Weekday}>
                {day}
              </div>
            ))}
          </div>
          <div className={styles.CalendarGrid}>{renderCalendar()}</div>
        </div>
      </UtilMenu>
    </OutsideClickListener>
  );
}