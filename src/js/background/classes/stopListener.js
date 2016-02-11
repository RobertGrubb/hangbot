import moment from 'moment';

class stopListener {

  constructor(storage) {
    this.listener = null;
    this.storage = storage;
    this.refreshRate = 10;
    this.startListener = null;
  }

  start() {
    let listener = this;

    // Make sure it's not already running
    if (this.listener === null) {

      this.listener = setInterval(function() {

        // Get current time data
        let now = moment().format('h:mm A');

        let endTime = listener.storage.data.endHour +
                      ':' +
                      listener.storage.data.endMins +
                      ' ' +
                      listener.storage.data.endMeridiem;

        // If the startTime is the current time
        if (endTime === now) {

          let tabId = listener.storage.data.tabId;

          // Open the hangout
          chrome.tabs.remove(tabId, function() {
            listener.stop();
            listener.startListener.start();
          });
        }
      }, (1000 * listener.refreshRate));
    }
  }

  // Stops / clears all listener functionality.
  stop() {

    // If the listener is actually running
    if (this.listener !== null) {

      // Clear the interval
      clearInterval(this.listener);
      // Set it to null
      this.listener = null;

      // Update the local storage
      chrome.storage.local.set({
        stopListener: false,
        tabId: false
      });
    }
  }
}

export default stopListener;
