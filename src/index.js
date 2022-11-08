import { dataSanitize } from "./helpers/dataSanitize.js";
import { isAvailable } from "./helpers/isAvailable.js";
import { stringifyTime } from "./helpers/stringifyTime.js";

export const splitAvailabilities = ({ availabilities }) => {
  const [events, people] = dataSanitize(availabilities);
  let splitAvails = []; // to be returned
  for (const event of events) {
    for (const time of event.times) {
      const newEventEntry = {
        isEvent: false,
        start: stringifyTime(event.date, time.start),
        end: stringifyTime(event.date, time.end),
        display: "background",
        names: [],
        numbers: [],
      };
      for (const person of people) {
        const matchedDateAvail = person.timesAvailable.find(
          (el) => el.date === event.date
        );
        const isAvail = isAvailable(time.start, matchedDateAvail.times.start);
        if (isAvail) {
          newEventEntry.names.push(person.name);
          newEventEntry.numbers.push(person.number);
        }
      }
      splitAvails.push(newEventEntry);
    }
  }
  // remove empty fields
  splitAvails = splitAvails.filter((el) => {
    return el.names.length !== 0 && el.numbers.length !== 0;
  });
  return splitAvails;
};

// const availabilites = [
//   {
//     weekOf: "2022-10-30",
//     times: [
//       {
//         startTime: "2022-10-30T09:30:00",
//         endTime: "2022-10-30T11:00:00",
//       },
//       {
//         startTime: "2022-10-31T13:30:00",
//         endTime: "2022-10-31T17:00:00",
//       },
//       {
//         startTime: "2022-11-01T08:00:00",
//         endTime: "2022-11-01T16:30:00",
//       },
//     ],
//     name: "Ben",
//     number: "125",
//   },
//   {
//     weekOf: "2022-10-30",
//     times: [
//       {
//         startTime: "2022-10-30T10:00:00",
//         endTime: "2022-10-30T12:00:00",
//       },
//       {
//         startTime: "2022-10-31T13:30:00",
//         endTime: "2022-10-31T15:00:00",
//       },
//       {
//         startTime: "2022-11-01T09:00:00",
//         endTime: "2022-11-01T16:30:00",
//       },
//     ],
//     name: "Aman",
//     number: "143",
//   },
//   {
//     weekOf: "2022-10-30",
//     times: [
//       {
//         startTime: "2022-10-30T11:30:00",
//         endTime: "2022-10-30T14:00:00",
//       },
//       {
//         startTime: "2022-10-31T15:00:00",
//         endTime: "2022-10-31T17:00:00",
//       },
//       {
//         startTime: "2022-11-01T11:00:00",
//         endTime: "2022-11-01T17:30:00",
//       },
//     ],
//     name: "Hal",
//     number: "123",
//   },
// ];

// const data = {
//   availabilities: availabilites,
// };

// splitAvailabilities(data);
// // console.log(dates);
