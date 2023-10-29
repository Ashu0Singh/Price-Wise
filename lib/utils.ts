export function extractPrice(...elements: any) {
    for (const element of elements) {
        const priceText = element.text().trim();
        return priceText.replace(/[^0-9]+/g, "");
    }
    return '';
}

export function getImageArray(images: any) {
    const outputImages = [];
    for (const image of images) {
        if(image.attribs.src) outputImages.push(image.attribs.src);
    }
    return outputImages;
}

export function extractCurrency(currency: any) {
    const currencyText = currency.text().trim().slice(0, 1);
    return currencyText ? currencyText : '';
}