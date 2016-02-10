import Events from './classes/events.js';
const events = new Events();
import $ from 'jquery';

class disableCam {

  constructor() {
    this.listener = null;
  }

  initialize() {
    let thisClass = this;

    this.listener = setInterval(function() {
      let camButton = $('div[role="button"][aria-label="Turn camera off"]')[0];

      if (camButton) {
        events.doClick(camButton);
        clearInterval(thisClass.listener);
        thisClass.listener = null;
      }
    }, 1000 * 5);
  }
}

const DisableCam = new disableCam();
DisableCam.initialize();
