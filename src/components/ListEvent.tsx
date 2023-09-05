import React from 'react';

import locationIcon from 'public/images/pin.svg';
import arrowIcon from 'public/images/arrow-right.svg';
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import styles from '@/styles/ListEvent.module.scss';
import { type Event } from '@/utils/types';
import { LOCATION_NAME } from '@/utils/globals';
import { getInterDateTime, localeCurrencies } from '@/utils/i18n';
import { viewTypes } from '@/utils/view';
import StyledActionButton from '@/styles/components/StyledActionButton';
import { shopRedirectHandler } from '@/utils/events';

interface ListEventProps {
    event: Event;
    uneven?: boolean;
}

function ListEvent(props: ListEventProps) {
    var {
        event: {
            title,
            startDate,
            shopUrl,
            priceFrom,
            address: { addressLocality },
        },
        uneven,
    } = props;

    var router = useRouter();
    var { t } = useTranslation();
    var formattedPriceFrom = new Intl.NumberFormat(router.locale, {
        style: 'currency',
        currency:
            router.locale !== undefined &&
            localeCurrencies[router.locale].id !== undefined
                ? localeCurrencies[router.locale].id
                : 'EUR',
        currencyDisplay: 'name',
    }).format(priceFrom);
    const { date, time } = getInterDateTime(
        startDate,
        viewTypes.list,
        router.locale,
        t('event__time-suffix')
    );
    var arrowIconElement = (
        <Image
            src={arrowIcon}
            alt='Arrow'
            className={classNames(styles['button-icon'], 'icon-md')}
        />
    );

    return (
        <span
            className={classNames(
                styles.item,
                uneven === true ? styles.marked : ''
            )}
        >
            <div className={styles['title-location']}>
                <span className={styles.title}>{title}</span>
                <span className={styles.location}>
                    <span>
                        <Image
                            src={locationIcon}
                            alt='Pin'
                            className='icon-xs'
                        />
                        <p className={styles.text}>
                            {`${LOCATION_NAME}, ${addressLocality}`}
                        </p>
                    </span>
                </span>
            </div>
            <div className={styles['date-time']}>
                <span className={styles.date}>
                    {`${t('event__date-on-the-label')} ${date}`}
                </span>
                <span className={styles.time}>
                    <p>{`${t('event__time-from-label')} ${time}`}</p>
                </span>
            </div>
            <div className={styles.tickets}>
                <p className={styles.from}>{t('event__ticket-from-prefix')}</p>
                <p className={styles.price}>{`${formattedPriceFrom} `}</p>
            </div>
            <div className={styles.action}>
                <StyledActionButton
                    forViewType={viewTypes.list}
                    onClick={shopRedirectHandler.bind(null, router, shopUrl)}
                >
                    {t('event__to-ticket-action-button-label')}
                    {arrowIconElement}
                </StyledActionButton>
            </div>
        </span>
    );
}

ListEvent.defaultProps = {
    uneven: false,
};

export default ListEvent;
