/** @type {import('next').NextConfig} */

module.exports = {
	experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ['mongoose','puppeteer']
    },
    images: {
        domains : ['m.media-amazon.com']
    }
};