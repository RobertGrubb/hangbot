class Events {

  createEventToDispatch(element, eventType) {
    let event = element.ownerDocument.createEvent("MouseEvents");
    event.initMouseEvent(eventType,
      true,
      true,
      element.ownerDocument.defaultView,
      1,
      50, 50,
      50, 50,
      false, false, false, false,
      0,
      element
    );
    element.dispatchEvent(event);
  }

  doClick(element) {
    this.createEventToDispatch(element, 'mousedown');
    this.createEventToDispatch(element, 'mouseup');
  }
}

export default Events;
