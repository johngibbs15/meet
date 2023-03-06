import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let EventWrapper = shallow(<Event />);
    let event = mockData[0];
    beforeAll(() => {
        EventWrapper = shallow(<Event event={event} />);
        event = mockData[0];
    });
    test('renders the component', () => {
        expect(EventWrapper).toBeDefined();
    });

    test('Summary should render in h2 tag', () => {
        const eventSummaryElement = EventWrapper.find('h2.summary');
        const eventSummary = event.summary;

        expect(eventSummaryElement).toHaveLength(1);
        expect(eventSummaryElement).text().toBe(eventSummary);
    });

    test('Date should render in p tag', () => {
        const eventDateElement = EventWrapper.find('p.date');
        const eventDate = event.start.dateTime;

        expect(eventDateElement).toHaveLength(1);
        expect(eventDateElement).text().toBe(eventDate);
    });
    test('Location and summary should render in p tag', () => {
        const eventLocationElement = EventWrapper.find('p.location');
        const eventLocation = event.location;
        const eventSummary = event.summary;

        expect(eventLocationElement).toHaveLength(1);
        expect(eventLocationElement).text().toBe(eventLocation);
        expect(eventLocationElement).text().toBe(eventSummary);
    });
    test('When show details is clicked an h3, p, and button should render', () => {
        const showButton = EventWrapper.find('button.show');
        const eventTitleElement = EventWrapper.find('h3.summary');
        const eventDescriptionElement = EventWrapper.find('p.about');
        const eventLinkElement = EventWrapper.find('a.link');
        const hideButton = EventWrapper.find('button.hide');

        showButton.simulate('click');
        expect(EventWrapper.state('collapsed')).toBe(true);

        expect(eventTitleElement).toHaveLength(1);
        expect(eventDescriptionElement).toHaveLength(1);
        expect(eventLinkElement).toHaveLength(1);
        expect(hideButton).toHaveLength(1);
    });
    test('When hide details is clicked h3, p, and button should collapse', () => {
        const eventTitleElement = EventWrapper.find('h3.summary');
        const eventDescriptionElement = EventWrapper.find('h3.about');
        const eventLinkElement = EventWrapper.find('h3.link');
        const hideButton = EventWrapper.find('button.hide');

        expect(eventTitleElement).toHaveLength(0);
        expect(eventDescriptionElement).toHaveLength(0);
        expect(eventLinkElement).toHaveLength(0);
        expect(hideButton).toHaveLength(0);
        expect(EventWrapper.state('collapsed')).toBe(false);
    });
});
