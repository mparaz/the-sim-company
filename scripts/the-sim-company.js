'use strict';

const ShoppingCart = require('../ShoppingCart');
const offer = require('../offer');

const Decimal = require('decimal.js');

// Pricing Rules

const pricingRules = {
    catalogue: [
        {
            productCode: 'ult_small',
            productName: 'Unlimited 1GB',
            price: new Decimal(24.90)
        },
        {
            productCode: 'ult_medium',
            productName: 'Unlimited 2GB',
            price: new Decimal(29.90)
        },
        {
            productCode: 'ult_large',
            productName: 'Unlimited 5GB',
            price: new Decimal(44.90)
        },
        {
            productCode: '1gb',
            productName: '1 GB Data-pack',
            price: new Decimal(9.90)
        }
    ],
    offers: [
        offer.makeItemFree('ult_small', 3, 2),
        offer.bulkDiscount('ult_large', 4, Decimal(39.90)),
        offer.bundleItem('ult_medium', 1, {
            productCode: '1gb',
            productName: '1 GB Data-pack',
            price: new Decimal(0)
        }, 1)
    ],
    promoOffers: {
        '1<3AMAYSIM': [
            offer.discountAll(10)
        ]
    }
};

const formatItems = (items) => {
    const tally = new Map();

    items.forEach((item) => {
        let count = tally.get(item.productName);
        if (count) {
            tally.set(item.productName, count + 1);
        } else {
            tally.set(item.productName, 1);
        }
    });

    let result = '';
    for (const entry of tally.entries()) {
        result += `${entry[1]} x ${entry[0]} `;
    }

    return result;
};

// Scenarios

const cart1 = new ShoppingCart(pricingRules);
cart1.add('ult_small');
cart1.add('ult_small');
cart1.add('ult_small');
cart1.add('ult_large');

console.log(`Scenario 1 total: ${cart1.total()}`);
console.log(`Scenario 1 items: ${formatItems(cart1.items())}`);

const cart2 = new ShoppingCart(pricingRules);
cart2.add('ult_small');
cart2.add('ult_small');
cart2.add('ult_large');
cart2.add('ult_large');
cart2.add('ult_large');
cart2.add('ult_large');

console.log(`Scenario 2 total: ${cart2.total()}`);
console.log(`Scenario 2 items: ${formatItems(cart2.items())}`);

const cart3 = new ShoppingCart(pricingRules);
cart3.add('ult_small');
cart3.add('ult_medium');
cart3.add('ult_medium');

console.log(`Scenario 3 total: ${cart3.total()}`);
console.log(`Scenario 3 items: ${formatItems(cart3.items())}`);

const cart4 = new ShoppingCart(pricingRules);
cart4.add('ult_small');
cart4.add('1gb', '1<3AMAYSIM');

console.log(`Scenario 4 total: ${cart4.total()}`);
console.log(`Scenario 4 items: ${formatItems(cart4.items())}`);
