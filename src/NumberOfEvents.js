// src/NumberOfEvents.js

import React, { Component } from 'react';
import { ErrorAlert } from './alert';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 32,
        errorText: '',
    };

    handleChange = (number) => {
        const value = number.target.value;
        value < 1 || value > 32
            ? this.setState({
                  numberOfEvents: value,
                  errorText: 'Please enter number from 1 to 32',
              })
            : this.setState({
                  numberOfEvents: number.target.value,
                  errorText: '',
              });
        this.props.updateEvents(undefined, value);
    };

    render() {
        return (
            <div>
                <label>
                    Number of Events:
                    <input
                        className="numberOfEvents"
                        type="number"
                        value={this.state.numberOfEvents}
                        onChange={this.handleChange}
                    />
                </label>
                <div>
                    <ErrorAlert text={this.state.errorText} />
                </div>
            </div>
        );
    }
}

export default NumberOfEvents;
