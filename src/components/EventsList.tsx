import React from 'react';

import styles from '@/styles/EventsList.module.scss';
import { type ViewTypes, type Events } from '@/utils/types';
import { viewTypes } from '@/utils/view';
import GalleryEvent from './GalleryEvent';
import ListEvent from './ListEvent';

interface EventsListProps {
    events: Events;
    viewType: ViewTypes;
}

function EventsList(props: EventsListProps) {
    var { events, viewType } = props;

    var components = {
        [viewTypes.gallery]: GalleryEvent,
        [viewTypes.list]: ListEvent,
    };

    var Component = components[viewType];

    return <div className={styles.list}>{renderEvents()}</div>;

    function renderEvents() {
        let uneven = false;
        return Object.entries(events).map(function mapEvents([
            eventKey,
            event,
        ]) {
            uneven = !uneven;
            if (uneven) {
                return <Component event={event} key={eventKey} uneven />;
            }
            return <Component event={event} key={eventKey} />;
        });
    }
}

export default EventsList;
