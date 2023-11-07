/** @type {import('next').NextConfig} */

module.exports = {
	experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ['mongoose']
    },
    images: {
        domains : ['m.media-amazon.com']
    }
};