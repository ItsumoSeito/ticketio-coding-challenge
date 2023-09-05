import type store from '@/store/store';
import { viewTypes } from './view';

// View
var viewTypesLiteral = Object.values(viewTypes);
export type ViewTypes = (typeof viewTypesLiteral)[number];

// Event
export interface Event {
    title: string;
    startDate: string;
    endDate: string;
    imageUrl: string;
    shopUrl: string;
    address: {
        '@type': string;
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
    };
    priceFrom: number;
    informationText?: string;
    remainingTickets?: number;
}

export type Events = Record<string, Event>;

// Store
export interface InitialState {
    events: Events;
}

export type RootState = ReturnType<typeof store.getState>;
