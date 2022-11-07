import { dataSanitize } from "../helpers/dataSanitize.js";
import { expect, it, describe } from "@jest/globals";

const input = [
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

const expectedDates = [
  { date: 20221030, startTime: 930, endTime: 1400 },
  { date: 20221031, startTime: 1330, endTime: 1700 },
  { date: 20221101, startTime: 800, endTime: 1730 },
];

const expectedPeople = [
  {
    name: "Ben",
    number: "125",
    timesAvailable: [
      { date: 20221030, time: { start: 930, end: 1100 } },
      { date: 20221031, time: { start: 1330, end: 1700 } },
      { date: 20221101, time: { start: 800, end: 1630 } },
    ],
  },
  {
    name: "Aman",
    number: "143",
    timesAvailable: [
      { date: 20221030, time: { start: 1000, end: 1200 } },
      { date: 20221031, time: { start: 1330, end: 1500 } },
      { date: 20221101, time: { start: 900, end: 1630 } },
    ],
  },
  {
    name: "Hal",
    number: "123",
    timesAvailable: [
      { date: 20221030, time: { start: 1130, end: 1400 } },
      { date: 20221031, time: { start: 1500, end: 1700 } },
      { date: 20221101, time: { start: 1100, end: 1730 } },
    ],
  },
];

describe("dataSanitize tests", () => {
  describe("sanitized `date` data", () => {
    it("returns an array with appropriate dates data", () => {
      const [date, _] = dataSanitize(input);
      expect(date).toStrictEqual(expectedDates);
    });
  });

  describe("sanitized `people` data", () => {
    it("returns an array with appropriate people data", () => {
      const [_, people] = dataSanitize(input);
      expect(people).toStrictEqual(expectedPeople);
    });
  });
});
