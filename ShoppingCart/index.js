'use strict';

class ShoppingCart {
    constructor(pricingRules) {
        const catalogue = {};

        pricingRules.catalogue.forEach((catalogueItem) => {
            catalogue[catalogueItem.productCode] = catalogueItem;
        });

        this._catalogue = catalogue;
        this._pricingRules = pricingRules;
        this._promoCodes = new Set();

        this._items = [];
    }

    total() {
        // Replace items with the offer transformations.
        if (this._pricingRules.offers) {
            let items = this._items;
            this._pricingRules.offers.forEach((offerFn) => {
                items = offerFn(items);
            });

            this._items = items;
        }

        if (this._promoCodes) {
            let items = this._items;
            this._promoCodes.forEach((promoCode) => {
                const offerFns = this._pricingRules.promoOffers[promoCode];
                if (offerFns) {
                    offerFns.forEach((offerFn) => {
                        items = offerFn(items);
                    });
                }
            });

            this._items = items;
        }

        return this._items.reduce((sum, item) => {
            return sum + item.price;
        }, 0);
    }

    items() {
        return this._items.slice();
    }

    add(item, promoCode) {
        const catalogueItem = this._catalogue[item];
        if (catalogueItem) {
            this._items.push(catalogueItem);
        }

        if (promoCode) {
            this._promoCodes.add(promoCode);
        }
    }
}

module.exports = ShoppingCart;