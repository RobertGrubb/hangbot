import chromeStorage from '../lib/chrome-storage';
import autoJoin from './classes/autoJoin.js';

const ChromeStorage = new chromeStorage();
const AutoJoin = new autoJoin(ChromeStorage);
AutoJoin.initialize();
