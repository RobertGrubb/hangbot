// Imports
import chromeStorage from './lib/chrome-storage';
import backgroundWorker from './classes/backgroundWorker.js';
import startListener from './classes/startListener.js';

// Instantiate new classes
const ChromeStorage = new chromeStorage();
const StartListener = new startListener(ChromeStorage);

// Set debug
ChromeStorage.debug = false;

// initialize background
const BGWorker = new backgroundWorker(ChromeStorage, StartListener);

// Start the background worker
BGWorker.initialize();
