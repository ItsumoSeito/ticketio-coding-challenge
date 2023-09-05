import React from 'react';

import { useTranslation } from 'next-i18next';
import { InputAdornment } from '@mui/material';
import Image from 'next/image';
import galleryIcon from 'public/images/gallery.svg';
import searchIcon from 'public/images/search.svg';
import listIcon from 'public/images/list.svg';
import styles from '@/styles/Header.module.scss';
import StyledSearchInput from '@/styles/components/StyledSearchInput';
import StyledViewButton from '@/styles/components/StyledViewButton';
import { type ViewTypes } from '@/utils/types';
import { viewTypes } from '@/utils/view';
import { LOCATION_NAME } from '@/utils/globals';

interface HeaderProps {
    searchTerm: {
        searchTerm: string;
        setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    };
    viewType: {
        viewType: ViewTypes;
        setViewType: React.Dispatch<React.SetStateAction<ViewTypes>>;
    };
}

function Header(props: HeaderProps) {
    var {
        searchTerm: { searchTerm, setSearchTerm },
        viewType: { viewType, setViewType },
    } = props;
    var { t } = useTranslation();

    var searchInputDecorator = (
        <InputAdornment position='start'>
            <Image
                src={searchIcon}
                alt='Search'
                style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    objectFit: 'cover',
                }}
            />
        </InputAdornment>
    );

    return (
        <span className={styles.header}>
            <p className={styles.title}>
                {t('events-list__title', { location: LOCATION_NAME })}
            </p>
            <span className={styles.controls}>
                <StyledSearchInput
                    onChange={searchChangeHandler}
                    value={searchTerm}
                    className={styles.input}
                    startAdornment={searchInputDecorator}
                />
                <p className={styles['view-label']}>{t('events-list__view')}</p>
                <StyledViewButton
                    className={styles['gallery-button']}
                    active={viewType === viewTypes.gallery}
                    onClick={setGalleryView}
                >
                    <Image src={galleryIcon} alt='Select Gallery view' />
                </StyledViewButton>
                <StyledViewButton
                    className={styles['list-button']}
                    active={viewType === viewTypes.list}
                    onClick={setListView}
                >
                    <Image src={listIcon} alt='Select Gallery view' />
                </StyledViewButton>
            </span>
        </span>
    );

    function searchChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        const {
            target: { value },
        } = event;
        setSearchTerm(value);
    }

    function setGalleryView() {
        setViewType(viewTypes.gallery);
    }

    function setListView() {
        setViewType(viewTypes.list);
    }
}

export default Header;
