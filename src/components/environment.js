import React, { Component } from 'react';
import axios from 'axios';
import './environment.css';
import avatar from '../avatar.gif';


const API_KEY = 'API_KEY_GOES_HERE'; // open weather map API KEY
const ROOT_URL = `http://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`;

export default class Environment extends Component {
  state = {
    weather: '',
    daytime: ''
  }

  componentDidMount() {
    axios.get(`${ROOT_URL}&q=Seattle`)
      .then(res => {
        let weather = res.data.weather[0].description;
        let daytime = res.data.weather[0].icon;

        if (weather.includes('cloud')) {
          weather = 'cloud';
        } else if (weather.includes('rain')) {
          weather = 'rain';
        } else if (weather.includes('thunder')) {
          weather = 'thunder';
        } else {
          weather = '';
        }

        if (daytime.includes('d')) {
          daytime = 'sun';
        } else {
          daytime = 'moon';
        }

        this.setState({ weather, daytime });
      })
  }

  render() {
    return (
      <div className="environment">
        <div className={this.state.daytime}></div>
        <div className={this.state.weather}></div>
        <div className="background"></div>
        <div className="midground"></div>
        <div className="foreground"></div>
        <img className="avatar" src={avatar} width="100px" alt="pixel-character"/>

      </div>
    )
  }
}
