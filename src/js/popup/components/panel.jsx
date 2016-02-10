// Import from react
import React, { Component } from 'react';
import { TextField, RaisedButton, Toggle } from 'material-ui';

const uiStyles = {
  textFieldStyle: {
    color: '#6b717d'
  },
  inputStyle: {
    color: '#444444'
  },
  underlineStyle: {
    borderColor: '#aaaaaa'
  },
  underlineFocusStyle: {
    borderColor: '#34495e'
  },
  toggleLabelStyle: {
    color: '#ffffff'
  },
  activeTrackStyle: {
    background: '#92bb75'
  },
  trackStyle: {
    background: '#dddddd'
  }
};

/**
 * Component: Panel
 *
 * Renders the popup UI for our Hangout Loader.
 */
export default class Panel extends Component {

  // Class constructor
  constructor(props) {
    super(props);

    // Set initial state
    this.state = {
      url: false,
      started: false,
      startTime: false,
      endTime: false,
      autoJoin: true
    };

    // Bind functions for access to state
    this.updateUrl = this.updateUrl.bind(this);
    this.updateChromeStorageData = this.updateChromeStorageData.bind(this);
    this.handleInitiatorClick = this.handleInitiatorClick.bind(this);
    this.updateStartTime = this.updateStartTime.bind(this);
    this.updateEndTime = this.updateEndTime.bind(this);
    this.updateAutoJoin = this.updateAutoJoin.bind(this);
  }

  /**
   * Before component mounts, grab chrome storage data, and sync
   * it with our component's state.
   */
  componentWillMount() {

    // Set component to var for inside-function access
    const panel = this;

    // Get chrome storage data, and sync it with our state.
    const data = chrome.storage.local.get(null, function(data) {
      panel.setState(data)
    });
  }

  // Update chrome storage here.
  updateChromeStorageData() {

    console.log('--- updateChromeStorageData Called ---');

    // Setup data with state
    let data = {
      url: this.state.url,
      started: this.state.started,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      autoJoin: this.state.autoJoin
    };

    // Update chrome storage
    chrome.storage.local.set(data, function() {
      console.log('--- Chrome Storage Data Set ---');
      console.log(data);
    });


  }

  // Make sure times are valid
  checkTimes() {

    if (this.state.startTime && this.state.endTime) {
      return true;
    } else {
      return false;
    }
  }

  // If start/stop is clicked, it is handled here.
  handleInitiatorClick() {

    // Set var oppisite of current state so we can toggle.
    let started = this.state.started ? false : true;

    // Initiate timeCheck
    let timeCheck = this.checkTimes();

    // If timeCheck is false, end here.
    if (started && timeCheck === false) {
      return;
    }

    if (started) {
      chrome.browserAction.setIcon({
        path: 'assets/images/logos/logo.png'
      });
    } else {
      chrome.browserAction.setIcon({
        path: 'assets/images/logos/logo_offline.png'
      });
    }

    // If all is good, set started, and update data.
    this.setState({
      started: started
    }, function() {
      this.updateChromeStorageData();
    });
  }

  // Update URL state
  updateUrl(e) {
    this.setState({
      url: e.target.value
    });
  }

  // Update URL state
  updateAutoJoin(e, isAutoJoinToggled) {
    this.setState({
      autoJoin: isAutoJoinToggled
    }, function() {
      this.updateChromeStorageData();
    });
  }

  // Update startTime state
  updateStartTime(e) {
    let string = e.target.value;

    this.setState({
      startTime: string
    });
  }

  // Update endTime state
  updateEndTime(e) {
    let string = e.target.value;

    this.setState({
      endTime: string
    });
  }

  // Render the component
  render() {

    return (
      <div className="container">
        <div className="appBar">
          <div className="title">HangBot</div>
          <div className="options">
            <Toggle
              label="Auto Join"
              defaultToggled={this.state.autoJoin ? true : false}
              labelStyle={uiStyles.toggleLabelStyle}
              trackStyle={
                this.state.autoJoin ?
                uiStyles.activeTrackStyle :
                uiStyles.trackStyle
              }
              thumbStyle={
                this.state.autoJoin ?
                uiStyles.activeTrackStyle :
                uiStyles.trackStyle
              }
              onToggle={this.updateAutoJoin}
            />
          </div>
        </div>
        <div className="content">
          <TextField
            fullWidth={true}
            floatingLabelText="Hangout URL"
            floatingLabelStyle={uiStyles.textFieldStyle}
            inputStyle={uiStyles.inputStyle}
            underlineStyle={uiStyles.underlineStyle}
            underlineFocusStyle={uiStyles.underlineFocusStyle}
            value={this.state.url ? this.state.url : null}
            onChange={this.updateUrl}
          />
          <div>
            <div className="half">
              <TextField
                fullWidth={true}
                floatingLabelText="Start Time (00:00)"
                floatingLabelStyle={uiStyles.textFieldStyle}
                inputStyle={uiStyles.inputStyle}
                underlineStyle={uiStyles.underlineStyle}
                underlineFocusStyle={uiStyles.underlineFocusStyle}
                value={ this.state.startTime ? this.state.startTime : null}
                onChange={this.updateStartTime}
              />
            </div>
            <div className="half">
              <TextField
                fullWidth={true}
                floatingLabelText="End Time (00:00)"
                floatingLabelStyle={uiStyles.textFieldStyle}
                inputStyle={uiStyles.inputStyle}
                underlineStyle={uiStyles.underlineStyle}
                underlineFocusStyle={uiStyles.underlineFocusStyle}
                value={ this.state.endTime ? this.state.endTime : null}
                onChange={this.updateEndTime}
              />
            </div>
          </div>
          <div>
            <div className="half">
              <RaisedButton
                label="Start"
                backgroundColor="#92bb75"
                labelColor="#ffffff"
                disabled={this.state.started ? true : false}
                fullWidth={true}
                onMouseDown={this.handleInitiatorClick}
              />
            </div>
            <div className="half">
              <RaisedButton
                label="Stop"
                backgroundColor="#cc646d"
                labelColor="#ffffff"
                disabled={this.state.started ? false : true}
                fullWidth={true}
                onMouseDown={this.handleInitiatorClick}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
