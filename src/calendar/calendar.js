class Calendar {
  static events = [];

  static saveEvent(event) {
    this.events.push(event);
  }
}

export { Calendar };
