import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
} from "date-fns";

const fetchCalendarDates = (selectedDate) => {
  const firstDayOfMonth = startOfMonth(selectedDate);
  const lastDayOfMonth = endOfMonth(selectedDate);

  const startOfFirstWeek = startOfWeek(firstDayOfMonth);
  const endOfLastWeek = endOfWeek(lastDayOfMonth);

  const calendarDates = eachDayOfInterval({
    start: startOfFirstWeek,
    end: endOfLastWeek,
  });

  return calendarDates.map((date) => ({
    date,
  }));
};

const Calendar = ({ currentDate }) => {
  const [currentMonth, setCurrentMonth] = useState(currentDate);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const calendarDates = fetchCalendarDates(currentMonth);

  // Create a 2D array to represent the grid
  const grid = Array.from({ length: 5 }, (_, rowIndex) =>
    calendarDates.slice(rowIndex * 7, (rowIndex + 1) * 7)
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: 30 }}>
        <button onClick={prevMonth}>Previous Month</button>
        <span style={{ margin: 10 }}>{format(currentMonth, "MMMM yyyy")}</span>
        <button onClick={nextMonth}>Next Month</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map(({ date }, colIndex) => (
                <td key={colIndex}>{format(date, "d")}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Calendar;
