import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';
import calendarIcon from 'public/images/calendar.svg';
import clockIcon from 'public/images/clock.svg';
import locationIcon from 'public/images/pin.svg';
import ticketIcon from 'public/images/ticket.svg';
import arrowIcon from 'public/images/arrow-right.svg';
import informationIcon from 'public/images/information.svg';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import styles from '@/styles/GalleryEvent.module.scss';
import { type Event } from '@/utils/types';
import { getInterDateTime, localeCurrencies } from '@/utils/i18n';
import { LOCATION_NAME } from '@/utils/globals';
import StyledActionButton from '@/styles/components/StyledActionButton';
import { viewTypes } from '@/utils/view';
import { eventsConfig, shopRedirectHandler } from '@/utils/events';

interface GalleryEventProps {
    event: Event;
}

function GalleryEvent(props: GalleryEventProps) {
    var {
        event: {
            title,
            startDate,
            imageUrl,
            shopUrl,
            priceFrom,
            address: { addressLocality },
            informationText,
            remainingTickets,
        },
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
    }).format(priceFrom);

    const { date, time } = getInterDateTime(
        startDate,
        viewTypes.gallery,
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
        <span className={styles.item}>
            <div className={styles['image-container']}>
                <Image
                    src={imageUrl}
                    alt='Location'
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                />
            </div>
            <div className={styles.details}>
                <div className={styles.text}>
                    <span className={styles.title}>{title}</span>
                    <span className={styles['date-time']}>
                        <span className={styles.date}>
                            <Image
                                src={calendarIcon}
                                alt='Calendar'
                                className='icon-md'
                            />
                            <p className={styles.text}>{date}</p>
                        </span>
                        <span className={styles.time}>
                            <Image
                                src={clockIcon}
                                alt='Clock'
                                className='icon-md'
                            />
                            <p>{time}</p>
                        </span>
                    </span>
                    <span className={styles.location}>
                        <span>
                            <Image
                                src={locationIcon}
                                alt='Pin'
                                className='icon-md'
                            />
                            <p className={styles.text}>
                                {`${LOCATION_NAME}, ${addressLocality}`}
                            </p>
                        </span>
                    </span>
                    <span className={styles['ticket-price']}>
                        <span>
                            <Image
                                src={ticketIcon}
                                alt='Ticket'
                                className='icon-md'
                            />
                            <p className={styles.text}>
                                {`${t(
                                    'event__ticket-from-prefix'
                                )} ${formattedPriceFrom}`}
                            </p>
                        </span>
                    </span>
                    {informationText !== undefined && (
                        <span className={styles.information}>
                            <span>
                                <Image
                                    src={informationIcon}
                                    alt='Information'
                                    className='icon-md'
                                />
                                <p className={styles.text}>{informationText}</p>
                            </span>
                        </span>
                    )}
                    {remainingTickets !== undefined &&
                        remainingTickets <=
                            eventsConfig.remainingTicketsAlertLimit && (
                            <span className={styles['remaining-tickets']}>
                                <span>
                                    <p className={styles.text}>
                                        {t(
                                            'event__remaining-tickets-alert-label',
                                            { amount: remainingTickets }
                                        )}
                                    </p>
                                </span>
                            </span>
                        )}
                </div>
                <div className={styles.action}>
                    <StyledActionButton
                        forViewType={viewTypes.gallery}
                        endIcon={arrowIconElement}
                        onClick={shopRedirectHandler.bind(
                            null,
                            router,
                            shopUrl
                        )}
                    >
                        {t('event__to-ticket-action-button-label')}
                    </StyledActionButton>
                </div>
            </div>
        </span>
    );
}

export default GalleryEvent;
