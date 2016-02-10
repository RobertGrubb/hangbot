import Events from './classes/events.js';
const events = new Events();
import $ from 'jquery';

class disableMic {

  constructor() {
    this.listener = null;
  }

  initialize() {
    let thisClass = this;

    this.listener = setInterval(function() {
      let micButton = $('div[role="button"][aria-label="Mute microphone"]')[0];

      if (micButton) {
        events.doClick(micButton);
        clearInterval(thisClass.listener);
        thisClass.listener = null;
      }
    }, 1000 * 5);
  }
}

const DisableMic = new disableMic();
DisableMic.initialize();
