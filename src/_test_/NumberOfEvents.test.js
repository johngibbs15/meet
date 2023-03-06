import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    test('renders the component', () => {
        expect(NumberOfEventsWrapper).toBeDefined();
    });

    test('the input should have a default value of 32', () => {
        expect(
            NumberOfEventsWrapper.find('input.numberOfEvents').prop('type')
        ).toBe('number');
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
    });

    test('user can change the number of events displayed and input reflects the changes', () => {
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
        const numberChange = { target: { value: 15 } };
        NumberOfEventsWrapper.find('input.numberOfEvents').simulate(
            'change',
            numberChange
        );
        expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(15);
    });
});
