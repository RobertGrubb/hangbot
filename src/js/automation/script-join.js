import Events from './classes/events.js';
const events = new Events();
import $ from 'jquery';

class autoJoin {

  constructor() {
    this.listener = null;
  }

  initialize() {
    let thisClass = this;

    this.listener = setInterval(function() {
      let joinButton = $('div[role="button"]').filter(function() {
        return $(this).text() == "Join"
      })[0];

      if (joinButton) {
        events.doClick(joinButton);
        clearInterval(thisClass.listener);
        thisClass.listener = null;
      }
    }, 1000 * 7);
  }
}

const AutoJoin = new autoJoin();
AutoJoin.initialize();
