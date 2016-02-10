/**
 * Class: startListener
 *
 * Responsible for starting the listener
 * that handles the opening of the hangout tab.
 */
class startListener {

  // Class constructor
  constructor (storage, stopListener) {
    this.listener = null;
    this.refreshRate = 10;
    this.storage = storage;
    this.stopListener = stopListener;
  }

  /**
   * Starts listener for the start time provided
   * by the front-end.
   *
   * ONLY starts if listener is set to null.
   */
  start() {
    let listener = this;

    console.log('-- startListener.start() fired --');

    // Make sure it's not already running
    if (this.listener === null) {

      this.listener = setInterval(function() {

        // Get current time data
        let d = new Date();
        let hours = d.getHours();
        let mins  = d.getMinutes();

        // Construct string to compare to
        let timeString = hours + ':' + mins;

        let startTime = listener.storage.data.startHour +
                        ':' +
                        listener.storage.data.startMins;

        // If the startTime is the current time
        if (startTime === timeString) {

          // Open the hangout
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
    } else {

      // Debug: if the tab exists, do nothing.
      console.log('-- openHangout() fired, but tab exists. --');
    }
  }
}

export default startListener;
