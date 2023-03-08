import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let EventWrapper, event;
    beforeAll(() => {
        event = mockData[0];
        EventWrapper = shallow(<Event event={event} />);
    });

    test('renders the component', () => {
        expect(EventWrapper).toBeDefined();
    });

    test('h2.summary, p.start, p.location elements rendered with mockData', () => {
        //Declare element variables
        const summaryElement = EventWrapper.find('h2.summary');
        const dateElement = EventWrapper.find('p.date');
        const locationElement = EventWrapper.find('p.location');
        //Declare element content variables
        const summaryData = event.summary;
        const dateData = event.start.dateTime;
        const locationData = event.location;
        //Tests to ensure elements are rendered properly
        expect(summaryElement).toBeDefined();
        expect(dateElement).toBeDefined();
        expect(locationElement).toBeDefined();
        //Tests to ensure elements contain intended data
        expect(summaryElement.text()).toBe(summaryData);
        expect(dateElement.text()).toBe(dateData);
        expect(locationElement.text()).toBe(`@${locationData}`);
    });

    test('Event details is collapsed', () => {
        //Declare element variables
        const detailsButton = EventWrapper.find('button.details-button');
        const aboutElement = EventWrapper.find('h3.about');
        const linkElement = EventWrapper.find('a.link');
        const descriptionElement = EventWrapper.find('p.description');
        //Test to ensure button element is rendered properly
        expect(detailsButton).toBeDefined();
        //Test to ensure event details is collapsed
        expect(aboutElement).toHaveLength(0);
        expect(linkElement).toHaveLength(0);
        expect(descriptionElement).toHaveLength(0);
    });

    test('Event details is expanded when button is clicked', () => {
        //Declare button variable
        const detailsButton = EventWrapper.find('button.details-button');
        detailsButton.simulate('click');
        expect(EventWrapper.find('h3.about')).toHaveLength(1);
        expect(EventWrapper.find('a.link')).toHaveLength(1);
        expect(EventWrapper.find('p.description')).toHaveLength(1);
    });
});
