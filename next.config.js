/** @type {import('next').NextConfig} */

module.exports = {
	experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ['mongoose','puppeteer','chrome-aws-lambda']
    },
    images: {
        domains : ['m.media-amazon.com']
    }
};