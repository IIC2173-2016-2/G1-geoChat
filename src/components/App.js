import React, { Component } from 'react';
import './App.css';
import { Col, Tooltip, OverlayTrigger } from 'react-bootstrap'
import RoomList from './RoomList'
import Chat from './Chat'
import MainLogin from './Login/MainLogin'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: '',
      longitude: '',
      selected_chat_room: undefined,
      current_user: Math.random().toString(36).substring(7)
    }
    this.handleOnChangeSelectedRoom = this.handleOnChangeSelectedRoom.bind(this)
  }

  componentWillMount() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        }, (errorCode) => alert(errorCode) );
    }
  }

  handleOnChangeSelectedRoom(room) {
    this.setState({ selected_chat_room: room })
  }

  render() {
    var tooltip = <Tooltip id="tooltip"></Tooltip>
    if(this.state.latitude) {
       tooltip = <Tooltip id="tooltip">Lat: {this.state.latitude.toFixed(2)} Lng: {this.state.longitude.toFixed(2)}</Tooltip>
    }
    // TODO
    var chatStyle = { }
    if(this.state.latitude !== '' && this.state.longitude !== '') {
      var latLng = this.state.latitude + "," + this.state.longitude
      chatStyle = {
        backgroundImage: "url('https://maps.googleapis.com/maps/api/staticmap?center=" + latLng + "&size=512x512&zoom=11&scale=2&maptype=satellite&markers=color:blue||" + latLng + "')"
      }
    }
    return (
      <div className="App">
        <Col xs={4} md={3} className="full_height sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <OverlayTrigger placement="bottom" overlay={tooltip}>
                <i className="fa fa-globe fa-lg" aria-hidden="true"></i>
              </OverlayTrigger>
              &nbsp;
              GeoChat
              &nbsp;
              
            </li>
            <li>
              <MainLogin showLogin={true}/>
            </li>
            <li>
              Usuario #1234
            </li>
          	<RoomList onClickChatRoom={this.handleOnChangeSelectedRoom} />
          </ul>
        </Col>
        <Col xs={8} md={9} className="full_height chat_space" style={chatStyle}>
        	{this.state.selected_chat_room ? <Chat bsRecord={this.state.selected_chat_room} /> : ''}
        </Col>
      </div>
    )
  }

  getChildContext() {
    return {
      client: this.props.client,
      current_user: this.state.current_user
    }
  }
}

App.childContextTypes = {
  client: React.PropTypes.object.isRequired,
  current_user: React.PropTypes.string.isRequired
}

export default App;
