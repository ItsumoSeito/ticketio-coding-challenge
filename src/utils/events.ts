import uuid4 from 'uuid4';
import { type NextRouter } from 'next/router';
import { type Event, type Events } from './types';

export function identifyEvents(events: Event[]) {
    var identifiedEvents: Events = {};
    events.forEach(function addWithId(event) {
        identifiedEvents[uuid4()] = event;
    });
    return identifiedEvents;
}

export var eventsConfig = {
    remainingTicketsAlertLimit: 50,
};

export function shopRedirectHandler(router: NextRouter, url: string) {
    router.push(url).catch(function handleRedirectError(error) {
        // todo add notification edit function to push error message to user
        throw error;
    });
}

export default {
    identifyEvents,
    eventsConfig,
};
