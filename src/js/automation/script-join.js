import Events from './classes/events.js';
const events = new Events();
import $ from 'jquery';

class autoJoin {

  initialize() {
    let thisClass = this;

    $(document).ready(function() {
      $(document).on('DOMNodeInserted', function(element) {
        let joinButton = $('div[role="button"]').filter(function() {
          return $(this).text() == "Join"
        })[0];

        if (joinButton) {
          events.doClick(joinButton);
        }
      });
    });
  }
}

const AutoJoin = new autoJoin();
AutoJoin.initialize();
