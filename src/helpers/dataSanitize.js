import { parseTime } from "./parseTime.js";

const dataSanitize = (availabilities) => {
  const dates = [];
  const people = [];
  const newAllDates = getAllDates(availabilities);

  for (const entry of availabilities) {
    const personAvailability = []; // a person all available times
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
      personAvailability.push(personTimeEntry);

      const matchedStartTime = allTimeIntervals.find((el) => el === start);
      if (!matchedStartTime) allTimeIntervals.push(start);

      const matchedEndTime = allTimeIntervals.find((el) => el === end);
      if (!matchedEndTime) allTimeIntervals.push(end);
    }
    console.log(personAvailability);

    // Sorting all time intervals in date in ascending order

    // Sanitizing people info
    const newPersonEntry = {
      name: entry.name,
      number: entry.number,
      timesAvailable: personAvailability,
    };

    people.push(newPersonEntry);
  }

  return [dates, people];
};

/**
 * getAllDates
 * @params {[]object} dates: raw array passed from main function
 * @return {[]number} all unique dates
 */
function getAllDates(dates) {
  const allDates = new Set();
  for (const entry of dates) {
    for (const time of entry.times) {
      const [startDate] = parseTime(time.startTime);
      const [endDate] = parseTime(time.endTime);
      allDates.add(startDate, endDate);
    }
  }
  return [...allDates];
}

function sanitizeTime(times) {
  const timeOutput = [];
  for (let i = 0; i < times.length - 1; i++) {
    const timeEntry = {
      start: times[i],
      end: times[i + 1],
    };
    timeOutput.push(timeEntry);
  }

  return timeOutput;
}

export { dataSanitize, sanitizeTime };
