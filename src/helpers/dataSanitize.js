import { parseTime } from "./parseTime.js";

export const dataSanitize = (availabilities) => {
  const dates = [];
  const people = [];

  for (const entry of availabilities) {
    const timesAvailable = []; // a person all available times
    const allAvailableTimes = entry.times;

    // Get all available time of a person entry
    for (const time of allAvailableTimes) {
      const [date, start] = parseTime(time.startTime);
      const [_, end] = parseTime(time.endTime);

      // Extracting dates
      const matched = dates.find((dateEntry) => dateEntry.date === date);

      if (matched) {
        // if date exists, fix start/end time
        if (start < matched.time.start) matched.time.start = start;
        if (end > matched.time.end) matched.time.end = end;
      } else {
        // if date doesn't exists, add a new one
        const newDateEntry = {
          date,
          time: { start, end },
        };
        dates.push(newDateEntry);
      }

      // Collecting a sanitized time entry
      const newTimeEntry = {
        date: date,
        time: { start, end },
      };

      timesAvailable.push(newTimeEntry);
    }

    // Get all people avail
    const newPersonEntry = {
      name: entry.name,
      number: entry.number,
      timesAvailable,
    };

    people.push(newPersonEntry);
  }

  return [dates, people];
};
