/** @type {import('next').NextConfig} */

const path = require('path');
const { i18n } = require('./next-i18next.config');

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'src')],
    },
    i18n,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.ticket.io',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

module.exports = nextConfig;
