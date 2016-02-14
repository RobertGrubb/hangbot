import moment from 'moment';

/**
 * Class: startListener
 *
 * Responsible for starting the listener
 * that handles the opening of the hangout tab.
 */
class startListener {

  // Class constructor
  constructor (storage, stopListener, notifications) {
    this.listener = null;
    this.refreshRate = 10;
    this.storage = storage;
    this.stopListener = stopListener;
    this.notifications = notifications;
    this.notified = false;
  }

  /**
   * Starts listener for the start time provided
   * by the front-end.
   *
   * ONLY starts if listener is set to null.
   */
  start() {
    let listener = this;

    // Make sure it's not already running
    if (this.listener === null) {

      this.listener = setInterval(function() {

        moment.createFromInputFallback = function(config) {
          // unreliable string magic, or
          config._d = new Date(config._i);
        };

        // Get current time data
        let now = moment().format('h:mm A');

        let startTime = listener.storage.data.startHour +
                        ':' +
                        listener.storage.data.startMins +
                        ' ' +
                        listener.storage.data.startMeridiem;

        let endTime = listener.storage.data.endHour +
                      ':' +
                      listener.storage.data.endMins +
                      ' ' +
                      listener.storage.data.endMeridiem;

        // Get unix timestamps of both start and now times.
        let nowUnix = moment().unix();
        let startUnix = moment(startTime, 'h:mm A').unix();
        let endUnix = moment(endTime, 'h:mm A').unix();

        // Get 5 minutes before start time for notification
        let oneMinuteBefore = moment(startTime, 'h:mm A')
          .subtract(1, 'minutes')
          .format('h:mm A');

        // If the startTime is the current time
        if (startTime === now) {

          // Open the hangout
          listener.openTab();

        } else if (oneMinuteBefore === now && !listener.notified) {

          // Notifiy:
          listener.notifications.showNotification(
            'HangBot is Excited!',
            'This is a friendly reminder that your hangout will be starting in 1 minute.'
          );

          listener.notified = true;

        } else if (nowUnix > startUnix &&
          nowUnix < endUnix &&
          !listener.storage.data.tabId) {

          /**
           * If in the middle of the start and end time, and now tab
           * is set for the hangout. Go ahead and open another.
           *
           * Situation where this may happen:
           *
           * If chrome was closed, and then opened while the listener is
           * still running, then we need to open the hangout.
           */
          listener.openTab();
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
        startListener: false,
        tabId: false
      });
    }
  }

  // Opens hangout tab. Only opens if tabId is false.
  openTab() {

    // Set this class to a variable so we can access it within functions.
    let listener = this;

    // If tabId is false, we can start a tab
    if (!this.storage.data.tabId) {

      let hangoutUrlPrefix = 'https://hangouts.google.com/hangouts/_/';

      // Create the tab that will open the hangout
      chrome.tabs.create({ url: hangoutUrlPrefix + listener.storage.data.url }, function(tab) {

        // Store the tab id
        chrome.storage.local.set({tabId: tab.id});

        // Add a listener for that tab
        chrome.tabs.onRemoved.addListener(function(tabId) {

          // If the tab is closed, update the tabId in local storage
          if (tabId === listener.storage.tabId) {
            chrome.storage.local.set({tabId: false});
          }
        });
      });

      // Listen for updates on the tab when it is created:
      chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

        // If tab is not done loading, do nothing
        if (changeInfo.status != 'complete')
          return;

        // Make sure the current url is matching to the storage data.
        if (tab.url.indexOf(listener.storage.data.url) != -1) {

          // Setup array for scripts
          let scripts = [];

          // If auto join is enabled:
          if (listener.storage.data.autoJoin) {
            scripts.push('/ext/assets/js/automation/join.bundle.js');
          }

          // If disable cam is enabled:
          if (listener.storage.data.disableCam) {
            scripts.push('/ext/assets/js/automation/disable-cam.bundle.js');
          }

          // If disable mic is enabled:
          if (listener.storage.data.disableMic) {
            scripts.push('/ext/assets/js/automation/disable-mic.bundle.js');
          }

          // Iterate through each and execute the script.
          scripts.map(function(file) {
            chrome.tabs.executeScript(tabId, {
              file: file
            });
          });
        }
      });

      // Stop the listener
      listener.stop();

      // Start the stopListener
      listener.stopListener.start();
    }
  }
}

export default startListener;
