'use strict';

// Use fixed-point decimal for currency values.
const Decimal = require('decimal.js');

class ShoppingCart {
    constructor(pricingRules) {
    }

    total() {
        return new Decimal(0);
    }

    items() {
        return [];
    }
}

module.exports = ShoppingCart;