import { parseTime } from "./parseTime.js";

export const dataSanitize = (availabilities) => {
  const people = [];
  const dates = [];

  for (let availability of availabilities) {
    const timesAvailable = [];
    const times = availability.times;

    for (let time of times) {
      const [date, startTime] = parseTime(time.startTime);
      const [_, endTime] = parseTime(time.endTime);

      // Extracting dates
      const matched = dates.find((el) => el.date === date);
      if (matched) {
        if (startTime < matched.time.start) matched.time.start = startTime;
        if (endTime > matched.time.end) matched.time.end = endTime;
      } else {
        const newDateEntry = {
          date,
          time: {
            start: startTime,
            end: endTime,
          },
        };
        dates.push(newDateEntry);
      }

      const timeEntry = {
        date: date,
        time: {
          start: startTime,
          end: endTime,
        },
      };
      timesAvailable.push(timeEntry);
    }

    // Extracting person avail
    const entry = {
      name: availability.name,
      number: availability.number,
      timesAvailable: timesAvailable, // start to end time intervals
    };
    people.push(entry);
  }

  return [dates, people];
};
