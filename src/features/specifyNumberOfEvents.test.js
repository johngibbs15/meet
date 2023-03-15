import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
    let AppWrapper;
    test('When user has not specified a number let 32 be the default number', ({
        given,
        when,
        then,
    }) => {
        given('the application has loaded', () => {});

        when('a user hasn’t specified a number of events', () => {
            AppWrapper = mount(<App />);
        });

        then('the default number of events will be 32', (arg0) => {
            expect(AppWrapper.state('eventCount')).toEqual(32);
        });
    });

    test('User can change the number of events they want to see', ({
        given,
        when,
        then,
    }) => {
        given('the default number of events have loaded', async () => {
            AppWrapper = await mount(<App />);
        });

        when('a user can change the number of events displayed', () => {
            AppWrapper.update();
            AppWrapper.find('NumberOfEvents').simulate('change', {
                target: { value: 5 },
            });
        });

        then('the specified number of events will be displayed', () => {
            expect(AppWrapper.find('.Event')).toHaveLength(2);
        });
    });
});
