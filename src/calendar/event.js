import { Calendar } from "./calendar.js";

/**
 * @class Event
 * @constructor
 * @params {object} event: has the shape like following
 * {
 *   title: string,
 *   description: string,
 *   time: {
 *     startTime: string,
 *     endTime: string,
 *   }
 * }
 *
 * @method saveToCalendar: called to save the object to Calendar
 */
class Event extends Calendar {
  start;
  end;
  title;
  description;

  constructor(event) {
    super();
    try {
      this.start = event.time.startTime;
      this.end = event.time.endTime;
      this.title = event.title;
      this.description = event.description;
    } catch (e) {
      throw TypeError(e);
    }
  }

  saveToCalendar() {
    const event = {
      isEvent: true,
      display: "block",
      start: this.start,
      end: this.end,
      title: this.title,
      description: this.description,
    };
    Calendar.saveEvent(event);
  }
}

export { Event };
