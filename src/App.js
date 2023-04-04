import React, { Component } from 'react';
import {
    ScatterChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Scatter,
    ResponsiveContainer,
} from 'recharts';
import './App.css';
import './nprogress.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './eventGenre';
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

    getData = () => {
        const { locations, events } = this.state;
        const data = locations.map((location) => {
            const number = events.filter(
                (event) => event.location === location
            ).length;
            const city = location.split(', ').shift();
            return { city, number };
        });
        console.log(data);
        return data;
    };

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
                <h4>Events in each city</h4>
                <div
                    style={{
                        background: 'white',
                        borderRadius: '20px',
                        margin: '5px 0',
                    }}
                >
                    <ResponsiveContainer height={400}>
                        <ScatterChart
                            width={400}
                            height={400}
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                        >
                            <CartesianGrid />
                            <XAxis
                                type="category"
                                dataKey="city"
                                name="city"
                                unit="cm"
                            />
                            <YAxis
                                type="number"
                                dataKey="number"
                                name="number of events"
                            />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter data={this.getData()} fill="#3fc" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ background: 'white', borderRadius: '20px' }}>
                    <EventGenre events={this.state.events} />
                </div>
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
