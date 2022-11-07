import { parseTime } from "./parseTime.js";

export const dataSanitize = (availabilities) => {
  const allDates = [];
  const dates = [];
  const people = [];

  for (const entry of availabilities) {
    const timesAvailable = []; // a person all available times
    const allAvailableTimes = entry.times;

    const allTimeIntervals = [];
    // Get all available time intervals
    for (const time of allAvailableTimes) {
      const [date, start] = parseTime(time.startTime);
      const [_, end] = parseTime(time.endTime);

      const personTimeEntry = {
        date,
        times: { start, end },
      };
      timesAvailable.push(personTimeEntry);

      const matchedStartTime = allTimeIntervals.find((el) => el === start);
      if (!matchedStartTime) allTimeIntervals.push(start);

      const matchedEndTime = allTimeIntervals.find((el) => el === end);
      if (!matchedEndTime) allTimeIntervals.push(end);

      const matchedDate = allDates.find((e) => e.date === date);
      if (matchedDate) {
        for (const time of allTimeIntervals) {
          const exists = matchedDate.times.find((el) => el === time);
          if (!exists) {
            matchedDate.times.push(time);
          }
        }
      } else {
        const dateEntry = {
          date,
          times: allTimeIntervals,
        };
        allDates.push(dateEntry);
      }
    }

    // Sorting all dates in descending order
    allDates.sort((prev, next) => prev.date - next.date);
    // Sorting all time intervals in date in ascending order
    for (const date of allDates) {
      date.times.sort((prev, next) => prev - next);
    }

    // Sanitizing dates info
    for (const entry of allDates) {
      const dateEntry = {
        date: entry.date,
        times: sanitizeTime(entry.times),
      };
      dates.push(dateEntry);
    }

    // Sanitizing people info
    const newPersonEntry = {
      name: entry.name,
      number: entry.number,
      timesAvailable,
    };

    people.push(newPersonEntry);
  }

  return [allDates, people];
};

function sanitizeTime(times) {
  const timeOutput = [];
  for (let i = 0; i < times.length; i++) {
    const timeEntry = {
      start: times[i],
      end: times[i + 1],
    };
    timeOutput.push(timeEntry);
  }

  return timeOutput;
}
