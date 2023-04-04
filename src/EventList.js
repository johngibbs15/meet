// src/EventList.js

import React, { Component } from 'react';
import Event from './Event';

class EventList extends Component {
    render() {
        const { events } = this.props;
        return (
            <div
                style={{
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <h2>Events</h2>
                <ul className="EventList">
                    {events.map((event) => (
                        <li key={event.id}>
                            <Event event={event} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default EventList;