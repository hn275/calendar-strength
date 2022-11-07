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
        if (startTime < matched.startTime) matched.startTime = startTime;
        if (endTime > matched.endTime) matched.endTime = endTime;
      } else {
        const newEntry = {
          date,
          startTime,
          endTime,
        };
        dates.push(newEntry);
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
