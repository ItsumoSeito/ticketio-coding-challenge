import { type RootState } from '@/utils/types';

export function selectEvents(state: RootState) {
    return state.events;
}

export default {
    selectEvents,
};
