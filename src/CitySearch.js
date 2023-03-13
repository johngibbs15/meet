// src/CitySearch.js

import React, { Component } from 'react';
import { mockData } from './mock-data';
import { extractLocations } from './api';
class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: undefined,
    };

    handleInputChanged = (event) => {
        const { value } = event.target;
        const locations = extractLocations(mockData);
        const suggestions = locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        this.setState({
            query: value,
            suggestions,
        });
    };

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false,
        });
        this.props.updateEvents(suggestion);
    };
    render() {
        return (
            <div className="CitySearch">
                <input
                    type="text"
                    className="city"
                    value={this.state.query}
                    onChange={this.handleInputChanged}
                    onFocus={() => {
                        this.setState({ showSuggestions: true });
                    }}
                />
                <ul
                    className="suggestions"
                    style={
                        this.state.showSuggestions ? {} : { display: 'none' }
                    }
                >
                    {this.state.suggestions.map((suggestion) => (
                        <li
                            key={suggestion}
                            onClick={() => this.handleItemClicked(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                    <li key="all" onClick={() => this.handleItemClicked('all')}>
                        See all cities
                    </li>
                </ul>
            </div>
        );
    }
}

export default CitySearch;
