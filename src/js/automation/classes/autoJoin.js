import Events from './events.js';
const events = new Events();
import $ from 'jquery';

class autoJoin {

  constructor() {
    this.intervalRate = 5; // Seconds
    this.listener = null;
  }

  /**
   * TODO: Find a better way rather than using jquery, or a setInterval.
   */
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
    }, 1000 * thisClass.intervalRate);
  }
}

export default autoJoin;
