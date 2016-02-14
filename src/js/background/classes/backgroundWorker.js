/**
 * Handles initial processing for the auto-loader.
 * This class will handle things like setting
 * the initial data from chrome.storage, removing
 * any old hangout tab, starting the listener, etc.
 */
class backgroundWorker {

  // Class constructor
  constructor(storage, startListener, stopListener) {
    this.storage = storage;
    this.startListener = startListener;
    this.stopListener = stopListener;
  }

  removeExistingTab() {
    if (!chrome.runtime.lastError) {
      chrome.tabs.remove(this.storage.data.tabId);
      chrome.storage.local.set({tabId: false});
    }
  }

  // Initializes the background process
  initialize()  {

    // Set class to variable so it can be accessed in functions.
    let bgWorker = this;

    // Set initial data from chrome.storage
    this.storage.getAll(function(data) {

      // If tab exists on load, remove it.
      if (data.tabId) {

        chrome.tabs.get(
          data.tabId,
          bgWorker.removeExistingTab
        );
      }

      // If initial data is set to start, call our startTimeListener method.
      if (data.started === true) {

        // Also update our icon
        chrome.browserAction.setIcon({
          path: 'assets/images/logos/logo.png'
        });

        bgWorker.startListener.start();
      }
    });

    // When local storage data changes, handle it here:
    chrome.storage.onChanged.addListener(function(changes, namespace) {
      for (var key in changes) {
        let storageChange = changes[key];

        switch (key) {

          // If started has changed, handle it
          case 'started':

            // Start the startListener
            if (storageChange.newValue === true) {
              bgWorker.startListener.start();

            // Stop all listeners
            } else {
              bgWorker.startListener.stop();
              bgWorker.stopListener.stop();
            }
            break;
        };
      }

      // On change, update the data
      bgWorker.storage.updateData();
    });
  }
}

export default backgroundWorker;
