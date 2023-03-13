// src/NumberOfEvents.js

import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = { numberOfEvents: 32 };

    componentDidMount() {
        this.setState({ numberOfEvents: this.props.numberOfEvents || 32 });
    }

    handleChange(number) {
        this.setState({ numberOfEvents: number });
    }
    render() {
        const { numberOfEvents } = this.state;
        return (
            <div>
                <label>
                    Number of Events:
                    <input
                        className="numberOfEvents"
                        type="number"
                        value={numberOfEvents}
                        onChange={(event) => {
                            this.handleChange(event.target.value);
                        }}
                    />
                </label>
            </div>
        );
    }
}

export default NumberOfEvents;
