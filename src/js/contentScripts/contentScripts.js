import $ from 'jquery';

$(document).ready(function() {

  // Give the join button time to load.
  setTimeout(function() {
    console.log('Trying everything...');
    let joinButton = document.getElementById(':t1.Fr');
    $(joinButton).trigger('focus');
    $(joinButton).trigger('click');
    $(joinButton).trigger('mouseup');
  }, 1000 * 8);
});
