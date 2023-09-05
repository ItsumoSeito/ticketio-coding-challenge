/* eslint-disable no-param-reassign */
import { createAction, createReducer, configureStore } from '@reduxjs/toolkit';
import { type Events, type InitialState } from '@/utils/types';

var initialState: InitialState = {
    events: {},
};

export var setEvents = createAction<Events>('setEvents');

var reducer = createReducer(initialState, function buildReducer(builder) {
    builder.addCase(setEvents, function storeSetEvents(state, action) {
        var { payload: events } = action;
        state.events = events;
    });
});

var store = configureStore({
    reducer,
    middleware: function defaultMiddlewareCb(getDefaultMiddleware) {
        return getDefaultMiddleware({ serializableCheck: false });
    },
});

export default store;
