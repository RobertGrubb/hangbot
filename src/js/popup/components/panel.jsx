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
  toggleOptionStyle: {
    margin: '10px 0'
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
      startHour: false,
      startMins: false,
      endHour: false,
      endMins: false,
      autoJoin: false,
      disableCam: false,
      disableMic: false
    };

    // Bind functions for access to state
    this.updateUrl = this.updateUrl.bind(this);
    this.updateChromeStorageData = this.updateChromeStorageData.bind(this);
    this.handleInitiatorClick = this.handleInitiatorClick.bind(this);
    this.updateStartHour = this.updateStartHour.bind(this);
    this.updateStartMins = this.updateStartMins.bind(this);
    this.updateEndHour = this.updateEndHour.bind(this);
    this.updateEndMins = this.updateEndMins.bind(this);
    this.updateAutoJoin = this.updateAutoJoin.bind(this);
    this.updateDisableCam = this.updateDisableCam.bind(this);
    this.updateDisableMic = this.updateDisableMic.bind(this);
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
      startHour: this.state.startHour,
      startMins: this.state.startMins,
      endHour: this.state.endHour,
      endMins: this.state.endMins,
      autoJoin: this.state.autoJoin,
      disableCam: this.state.disableCam,
      disableMic: this.state.disableMic
    };

    // Update chrome storage
    chrome.storage.local.set(data, function() {
      console.log('--- Chrome Storage Data Set ---');
      console.log(data);
    });


  }

  // If start/stop is clicked, it is handled here.
  handleInitiatorClick() {

    // Set var oppisite of current state so we can toggle.
    let started = this.state.started ? false : true;

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

  // Update Disable Cam
  updateDisableCam(e, isAutoDisableCamToggled) {
    this.setState({
      disableCam: isAutoDisableCamToggled
    }, function() {
      this.updateChromeStorageData();
    });
  }

  // Update Disable Mic
  updateDisableMic(e, isAutoDisableMicToggled) {
    this.setState({
      disableMic: isAutoDisableMicToggled
    }, function() {
      this.updateChromeStorageData();
    });
  }

  // Update startTime state
  updateStartHour(e) {
    let string = e.target.value;

    this.setState({
      startHour: string
    });
  }

  updateStartMins(e) {
    let string = e.target.value;

    this.setState({
      startMins: string
    });
  }

  // Update endTime state
  updateEndHour(e) {
    let string = e.target.value;

    this.setState({
      endHour: string
    });
  }

  updateEndMins(e) {
    let string = e.target.value;

    this.setState({
      endMins: string
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
              toggled={this.state.autoJoin ? true : false}
              labelStyle={uiStyles.toggleLabelStyle}
              onToggle={this.updateAutoJoin}
            />
          </div>
        </div>
        <div className="content">
          <TextField
            fullWidth={true}
            floatingLabelText="Hangout ID"
            floatingLabelStyle={uiStyles.textFieldStyle}
            inputStyle={uiStyles.inputStyle}
            underlineStyle={uiStyles.underlineStyle}
            underlineFocusStyle={uiStyles.underlineFocusStyle}
            value={this.state.url ? this.state.url : null}
            onChange={this.updateUrl}
          />
          <div>
            <div className="half">
              <h4>Start Time</h4>
              <div className="half">
                <TextField
                  fullWidth={true}
                  floatingLabelText="Hour"
                  floatingLabelStyle={uiStyles.textFieldStyle}
                  inputStyle={uiStyles.inputStyle}
                  underlineStyle={uiStyles.underlineStyle}
                  underlineFocusStyle={uiStyles.underlineFocusStyle}
                  value={ this.state.startHour && this.state.startHour}
                  onChange={this.updateStartHour}
                  type="number"
                />
              </div>
              <div className="half">
                <TextField
                  fullWidth={true}
                  floatingLabelText="Minutes"
                  floatingLabelStyle={uiStyles.textFieldStyle}
                  inputStyle={uiStyles.inputStyle}
                  underlineStyle={uiStyles.underlineStyle}
                  underlineFocusStyle={uiStyles.underlineFocusStyle}
                  value={ this.state.startMins && this.state.startMins}
                  onChange={this.updateStartMins}
                  type="number"
                />
              </div>
            </div>
            <div className="half">
              <h4>End Time</h4>
              <div className="half">
                <TextField
                  fullWidth={true}
                  floatingLabelText="Hours"
                  floatingLabelStyle={uiStyles.textFieldStyle}
                  inputStyle={uiStyles.inputStyle}
                  underlineStyle={uiStyles.underlineStyle}
                  underlineFocusStyle={uiStyles.underlineFocusStyle}
                  value={ this.state.endHour && this.state.endHour}
                  onChange={this.updateEndHour}
                />
              </div>
              <div className="half">
                <TextField
                  fullWidth={true}
                  floatingLabelText="Minutes"
                  floatingLabelStyle={uiStyles.textFieldStyle}
                  inputStyle={uiStyles.inputStyle}
                  underlineStyle={uiStyles.underlineStyle}
                  underlineFocusStyle={uiStyles.underlineFocusStyle}
                  value={ this.state.endMins ? this.state.endMins : null}
                  onChange={this.updateEndMins}
                />
              </div>
            </div>
          </div>
          <div className="optionContainer">
            <div className="half">
              <Toggle
                label="Disable Camera"
                labelPosition="right"
                toggled={this.state.disableCam ? true : false}
                style={uiStyles.toggleOptionStyle}
                onToggle={this.updateDisableCam}
              />
            </div>
            <div className="half">
              <Toggle
                label="Disable Mic"
                labelPosition="right"
                toggled={this.state.disableMic ? true : false}
                style={uiStyles.toggleOptionStyle}
                onToggle={this.updateDisableMic}
              />
            </div>
          </div>
          <hr />
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
