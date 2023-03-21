import React, { Component } from 'react';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { OfflineAlert } from './alert';

class App extends Component {
    state = {
        events: [],
        locations: [],
        showWelcomeScreen: undefined,
        selectedLocation: 'all',
        eventCount: 32,
    };

    async componentDidMount() {
        this.mounted = true;
        const accessToken = localStorage.getItem('access_token');
        const isTokenValid = (await checkToken(accessToken)).error
            ? false
            : true;
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');
        this.setState({ showWelcomeScreen: !(code || isTokenValid) });
        if ((code || isTokenValid) && this.mounted) {
            getEvents().then((events) => {
                if (this.mounted) {
                    this.setState({
                        events,
                        locations: extractLocations(events),
                    });
                }
            });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    updateEvents = (location, inputNumber) => {
        const { eventCount, selectedLocation } = this.state;
        if (location) {
            getEvents().then((events) => {
                const locationEvents =
                    location === 'all'
                        ? events
                        : events.filter((event) => event.location === location);
                const eventsToShow = locationEvents.slice(0, eventCount);
                this.setState({
                    events: eventsToShow,
                    selectedLocation: location,
                });
            });
        } else {
            getEvents().then((events) => {
                const locationEvents =
                    selectedLocation === 'all'
                        ? events
                        : events.filter(
                              (event) => event.location === selectedLocation
                          );
                const eventsToShow = locationEvents.slice(0, inputNumber);
                this.setState({
                    events: eventsToShow,
                    eventCount: inputNumber,
                });
            });
        }
    };

    render() {
        const { showWelcomeScreen } = this.state;
        if (showWelcomeScreen === undefined) return <div className="App" />;
        return (
            <div className="App">
                <div>
                    {!navigator.onLine && (
                        <OfflineAlert text="You are offline. Events may not be updated." />
                    )}
                </div>
                <CitySearch
                    locations={this.state.locations}
                    updateEvents={this.updateEvents}
                />
                <NumberOfEvents updateEvents={this.updateEvents} />
                <EventList events={this.state.events} />
                <WelcomeScreen
                    showWelcomeScreen={this.state.showWelcomeScreen}
                    getAccessToken={() => {
                        getAccessToken();
                    }}
                />
            </div>
        );
    }
}
export default App;
