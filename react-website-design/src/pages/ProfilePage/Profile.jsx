
import React, { Component } from 'react';
import "./Profile.css";

export default class Voters extends Component {
    state = {
        opinions: ['Opinion 1', 'Opinion 2', 'Opinion 3'],
        selectedOpinion: ''
      }
    
      render() {
        return (
            <div>
        <h1 style={{ textAlign: 'center' }}>
          Candidate Profile
        </h1>
        <div className="profile-container">
        <img className="profile-picture" src="goat.png" alt="Profile" />
        </div>
        <div className="profile-container">
          <div className="profile-info">
            <p><strong>Voter ID: 123456</strong></p>
            <p><strong>Name: </strong>John Doe</p>
            <p><strong>Date of Birth: </strong>01/01/1990</p>
            <p><strong>Political Party: </strong>Democrat</p>
            <p><strong>Current Job: </strong>State Senator</p>
            <p><strong>District Number: </strong>1</p>
            <p><strong>State: </strong>California</p>
            <select value={this.state.selectedOpinion} onChange={(e) => this.setState({ selectedOpinion: e.target.value })}>
              <option value="">Political Opinions</option>
              {this.state.opinions.map((opinion, index) => (
                <option key={index} value={opinion}>{opinion}</option>
              ))}
            </select>
          </div>
        </div>
      </div> 
        );
      }
}

