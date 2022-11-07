import { Event } from "../calendar/event.js";
import { Calendar } from "../calendar/calendar.js";
import { expect, describe, it } from "@jest/globals";

const data = {
  time: { startTime: "2022-10-28T09:00:00", endTime: "2022-10-28T13:00:00" },
  title: "Test Event Title",
  description: "Event Description",
};

const expected = {
  isEvent: true,
  start: "2022-10-28T09:00:00",
  end: "2022-10-28T13:00:00",
  display: "block",
  title: "Test Event Title",
  description: "Event Description",
};

let event;

afterEach(() => {
  Calendar.events = []; // reset calendar events
});

beforeEach(() => {
  event = new Event(data);
});

describe("Tests for Event class", () => {
  it("has valid props", () => {
    expect(event).toHaveProperty("start", expected.start);
    expect(event).toHaveProperty("end", expected.end);
    expect(event).toHaveProperty("title", expected.title);
    expect(event).toHaveProperty("description", expected.description);
  });

  describe("Event.saveToCalendar() method", () => {
    it("save to Calendar", () => {
      expect(Calendar.events).toHaveLength(0); // before save
      event.saveToCalendar();
      expect(Calendar.events).toHaveLength(1); // after save
    });

    it("formats event properly", () => {
      event.saveToCalendar();
      const savedEvent = Calendar.events[0];
      expect(savedEvent).toStrictEqual(expected);
    });
  });
});
