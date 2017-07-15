'use strict';

// Offers are higher-order functions that transform return the new items list.
//
// Items are distinct, each with a price, because offers may modify the price of one item independently of the
// other (e.g. buy one and take half off the first one).

const Decimal = require('decimal.js');

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
                    price: new Decimal(0)
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

module.exports.makeItemFree = makeItemFree;


