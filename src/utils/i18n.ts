import { type ViewTypes } from './types';
import { viewTypes } from './view';

var availableLocales = {
    de: 'de',
    en: 'en',
};

export function getInterDateTime(
    dateTime: string,
    viewType: ViewTypes,
    locale?: string,
    localeTimeSuffix?: string
) {
    var parsedDate = new Date(Date.parse(dateTime));
    var weekday = parsedDate.toLocaleDateString(locale, {
        weekday: 'short',
    });

    if (viewType === viewTypes.gallery) {
        let interDate = parsedDate.toLocaleDateString(locale, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        interDate = `${weekday}. ${interDate}`;

        let interTime = parsedDate.toLocaleTimeString(locale, {
            hour: '2-digit',
            minute: '2-digit',
        });
        interTime = `${interTime}${
            localeTimeSuffix !== '' ? ` ${localeTimeSuffix}` : ''
        }`;

        return {
            date: interDate,
            time: interTime,
        };
    }

    var interDate = parsedDate.toLocaleDateString(locale, {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    });

    var interTime = parsedDate.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
    });
    interTime = `${interTime}${
        localeTimeSuffix !== '' ? ` ${localeTimeSuffix}` : ''
    }`;

    return {
        date: interDate,
        time: interTime,
    };
}

export var localeCurrencies = {
    [availableLocales.de]: { id: 'EUR', name: 'Euro' },
    [availableLocales.en]: { id: 'USD', name: 'US Dollar' },
};

export default {
    getInterDateTime,
};
