import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { type InferGetServerSidePropsType } from 'next';
import path from 'path';
import fsPromises from 'fs/promises';
import { useDispatch, useSelector } from 'react-redux';
import bootshausLogo from 'public/images/bootshausLogo.jpg';
import Image from 'next/image';
import styles from '@/styles/Shop.module.scss';
import { type ViewTypes, type Event } from '@/utils/types';
import { identifyEvents } from '@/utils/events';
import { setEvents } from '@/store/store';
import { selectEvents } from '@/store/selectors';
import Header from '@/components/Header';
import { viewTypes } from '@/utils/view';
import EventsList from '@/components/EventsList';

interface Props {
    locale: string;
}

export async function getServerSideProps({ locale }: Props) {
    const filePath = path.join(process.cwd(), 'src/data/eventsTestData.json');
    var jsonData = await fsPromises.readFile(filePath);
    var eventsTestData = JSON.parse(jsonData.toString()) as Event[];

    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
            eventsTestData,
        },
    };
}

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Shop(props: ServerSideProps) {
    var { eventsTestData } = props;
    var [searchTerm, setSearchTerm] = useState<string>('');
    var [viewType, setViewType] = useState<ViewTypes>(viewTypes.gallery);
    var events = useSelector(selectEvents);

    var dispatch = useDispatch();

    useEffect(function initializeEvents() {
        dispatch(setEvents(identifyEvents(eventsTestData)));
    }, []);

    var headerProps = {
        searchTerm: { searchTerm, setSearchTerm },
        viewType: { viewType, setViewType },
    };

    return (
        <>
            <Head>
                <title>Bootshaus Ticketshop</title>
            </Head>
            <div className={styles.main}>
                <header className={styles['logo-container']}>
                    <Image
                        src={bootshausLogo}
                        alt='Bootshaus Logo'
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </header>
                <div className={styles['events-list']}>
                    <Header {...headerProps} />
                    <EventsList events={events} viewType={viewType} />
                </div>
            </div>
        </>
    );
}
