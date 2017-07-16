'use strict';

// Offers are higher-order functions that transform return the new items list.
//
// Items are distinct, each with a price, because offers may modify the price of one item independently of the
// other (e.g. buy one and take half off the first one).

const makeItemFree = (productCode, takeNumber, payNumber) => (items) => {
    const result = [];

    let takeCount = 0;

    items.forEach((item) => {
        if (item.productCode === productCode) {
            if (takeCount < payNumber) {
                result.push(item);
            } else {
                result.push({
                    productCode: item.productCode,
                    productName: item.productName,
                    price: 0
                });
            }

            takeCount++;
            if (takeCount === takeNumber) {
                takeCount = 0;
            }
        } else {
            result.push(item);
        }
    });

    return result;
};

const bulkDiscount = (productCode, quantity, newPrice) => (items) => {
    const matchingItems = items.filter((item) => item.productCode === productCode);
    if (matchingItems.length < quantity) {
        return items;
    } else {
        return items.map((item) => {
            if (item.productCode !== productCode) {
                return item;
            } else {
                return {
                    productCode: item.productCode,
                    productName: item.productName,
                    price: newPrice
                };
            }
        });
    }
};

const bundleItem = (productCode, quantityMatch, bundledItem, quantityBundle) => (items) => {
    const matchingItems = items.filter((item) => item.productCode === productCode);

    const repeats = (matchingItems.length / quantityMatch) * quantityBundle;
    const newItems = items.slice();

    for (let i = 0; i < repeats; i++) {
        newItems.push(bundledItem);
    }
    return newItems;
};

const discountAll = (percentDiscount) => (items) => {
    return items.map((item) => {
        return {
            productCode: item.productCode,
            productName: item.productName,
            price: Math.floor((item.price * (100 - percentDiscount)) / 100)
        };
    });
};

module.exports.makeItemFree = makeItemFree;
module.exports.bulkDiscount = bulkDiscount;
module.exports.bundleItem = bundleItem;
module.exports.discountAll = discountAll;


