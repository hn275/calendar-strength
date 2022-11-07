import { parseTime } from "./helpers/parseTime.js";
import { getTimeInterval } from "./helpers/getTimeInterval.js";
import { dataSanitize } from "./helpers/dataSanitize.js";

export const splitAvailabilities = ({ availabilities }) => {
  const data = dataSanitize(availabilities);
  return data;
};

const availabilites = [
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
  availabilities: availabilites,
};

const [dates, people] = splitAvailabilities(data);
console.log(dates);
