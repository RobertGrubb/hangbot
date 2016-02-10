const { storage } = chrome;

/**
 * Simple wrapper for chrome.storage to make
 * calls easier throughout the app.
 *
 * TODO: add .set() and .remove()
 */
class chromeStorage {

  // Class Constructor
  constructor() {
    let ChromeStorage = this;
    ChromeStorage.data = {};
    ChromeStorage.debug = false;

    // Get all initial data
    storage.local.get(null, function(storageData) {
      ChromeStorage.data = storageData;
    });

    // Start the onChange listener
    this.startStorageListener();
  }

  // Grabs all data, and updates the class data var.
  getAll(callback) {
    let ChromeStorage = this;

    this.log('-- chromeData.getAll() fired --');

    storage.local.get(null, function(storageData) {
      ChromeStorage.data = storageData;
      if(callback) callback(storageData);
    });
  }

  // Gets specific data.
  get(needle, callback) {
    this.log('-- chromeData.get() fired --');

    storage.local.get(needle, function(data) {
      if(callback) callback(data);
    });
  }

  // Called within bgWorker, sets all initial data
  getInitialData() {
    this.getAll();
  }

  // Force update of data.
  updateData() {
    this.getAll();
  }

  // Chrome.storage onchange listener
  startStorageListener() {
    let ChromeStorage = this;

    this.log('-- chromeData.startStorageListener() fired --');

    chrome.storage.onChanged.addListener(function(changes, namespace) {
      ChromeStorage.getAll();
    })
  }

  // Debug logger
  log(string) {
    if (this.debug === true) {
      console.log('[Debug]: %s', string);
    }
  }
}

export default chromeStorage;
