import { loadFeature, defineFeature } from 'jest-cucumber';
import { mount } from 'enzyme';
import App from '../App';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, (test) => {
    let AppWrapper;
    test('An event element is collapsed by default', ({
        given,
        when,
        then,
    }) => {
        given('the application is loaded', () => {});

        when('a user should receive a list of all events.', () => {
            AppWrapper = mount(<App />);
        });

        then('the event information should not be visible.', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.Event .details')).toHaveLength(0);
        });
    });

    test('User can expand an event to see its details', ({
        given,
        when,
        then,
    }) => {
        given('the list of collapsed events have been loaded.', () => {
            AppWrapper = mount(<App />);
        });

        when('a user should be able to expand an event item.', () => {
            AppWrapper.update();
            AppWrapper.find('.Event .details-button').at(0).simulate('click');
        });

        then('the event information should be visible', () => {
            expect(AppWrapper.find('.Event')).toHaveLength(2);
        });
    });

    test('User can collapse an event to hide its details', ({
        given,
        when,
        then,
    }) => {
        given(
            'the event item is expanded and the event info is displayed',
            async () => {
                AppWrapper = await mount(<App />);
                AppWrapper.update();
                AppWrapper.find('.Event .details-button')
                    .at(0)
                    .simulate('click');
            }
        );

        when('a user should be able to collapse the event.', () => {
            AppWrapper.update();
            AppWrapper.find('.Event .details-button').at(0).simulate('click');
        });

        then('the event information should not be visible.', () => {
            expect(AppWrapper.find('.Event .details')).toHaveLength(0);
        });
    });
});
