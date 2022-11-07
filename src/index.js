// import { parseTime } from "./helpers/parseTime.js";
// import { getTimeInterval } from "./helpers/getTimeInterval.js";
import { Event } from "./calendar/event.js";
import { Calendar } from "./calendar/calendar.js";

export const splitAvailabilities = ({ availabilities, events }) => {
  for (const event of events) {
    const newEvent = new Event(event);
    newEvent.save();
  }

  console.log(Calendar.events);
};

const events = [
  {
    time: { startTime: "2022-10-28T09:00:00", endTime: "2022-10-28T13:00:00" },
    title: "Event 1",
    description: "Test",
  },
  {
    time: { startTime: "2022-10-29T09:00:00", endTime: "2022-10-29T13:00:00" },
    title: "Event 2",
    description: "Test",
  },
];
const availabilities = [
  {
    weekOf: "2022-10-30",
    times: [
      {
        startTime: "2022-10-30T09:30:00",
        endTime: "2022-10-30T11:00:00",
      },
      {
        startTime: "2022-10-31T13:30:00",
        endTime: "2022-10-31T17:00:00",
      },
      {
        startTime: "2022-11-01T08:00:00",
        endTime: "2022-11-01T16:30:00",
      },
    ],
    name: "Ben",
    number: "125",
  },
  {
    weekOf: "2022-10-30",
    times: [
      {
        startTime: "2022-10-30T10:00:00",
        endTime: "2022-10-30T12:00:00",
      },
      {
        startTime: "2022-10-31T13:30:00",
        endTime: "2022-10-31T15:00:00",
      },
      {
        startTime: "2022-11-01T09:00:00",
        endTime: "2022-11-01T16:30:00",
      },
    ],
    name: "Aman",
    number: "143",
  },
  {
    weekOf: "2022-10-30",
    times: [
      {
        startTime: "2022-10-30T11:30:00",
        endTime: "2022-10-30T14:00:00",
      },
      {
        startTime: "2022-10-31T15:00:00",
        endTime: "2022-10-31T17:00:00",
      },
      {
        startTime: "2022-11-01T11:00:00",
        endTime: "2022-11-01T17:30:00",
      },
    ],
    name: "Hal",
    number: "123",
  },
];

const data = {
  availabilities,
  events,
};

try {
  console.log("Table format");
  const output = splitAvailabilities(data);
  console.table(output);
} catch (e) {
  console.log("error found");
  console.log(e);
}

// try {
//   console.log('\n"json" format');
//   for (const thing of output) {
//     console.log(thing);
//   }
// } catch (e) {
//   console.log("error found");
// }
