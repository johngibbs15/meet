// src/Event.js

import React, { Component } from 'react';

class Event extends Component {
    state = { collapsed: true };
    toggleDetails = () => {
        this.setState((prevState) => ({
            collapsed: !prevState.collapsed,
        }));
    };
    render() {
        const event = this.props;
        const { collapsed } = this.state;
        return (
            <div className="Event">
                <h2 class="summary">{event.summary}</h2>
                {console.log(event)}
                <p class="date">{new Date(event.start.dateTime).toString()}</p>
                <p class="location">{`@${event.location} | ${event.summary}`}</p>
                {!collapsed && (
                    <div className="details">
                        <h3 class="summary">About event:</h3>
                        <a class="link" href={event.htmlLink}>
                            See details on google calendar
                        </a>
                        <p class="about">{event.description}</p>
                        <button class="hide">hide details</button>
                    </div>
                )}
            </div>
        );
    }
}

export default Event;
