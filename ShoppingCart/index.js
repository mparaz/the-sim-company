'use strict';

// Use fixed-point decimal for currency values.
const Decimal = require('decimal.js');

class ShoppingCart {
    constructor(pricingRules) {
        const catalogue = {};

        pricingRules.catalogue.forEach((catalogueItem) => {
            catalogue[catalogueItem.productCode] = catalogueItem;
        });

        this._catalogue = catalogue;

        this._items = [];
    }

    total() {
        return this._items.reduce((sum, item) => {
            return sum.add(item.price);
        }, new Decimal(0));
    }

    items() {
        // Prevent modification.
        return this._items.slice();
    }

    add(item, promoCode) {
        const catalogueItem = this._catalogue[item];
        if (catalogueItem) {
            this._items.push(catalogueItem);
        }
    }
}

module.exports = ShoppingCart;