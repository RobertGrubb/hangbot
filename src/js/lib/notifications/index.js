class notifications {

  constructor() {
    this.icon = 'assets/images/logos/logo.png';
  }

  showNotification(title, text) {
    let opt = {
      type: 'basic',
      title: title,
      iconUrl: this.icon,
      message: text
    }

    chrome.notifications.create('', opt, function(id) {
      let timer = setTimeout(function(){
        chrome.notifications.clear(id);
      }, 5000);
    });
  }
}

export default notifications;
