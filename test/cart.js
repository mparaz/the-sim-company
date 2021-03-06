'use strict';

const chai = require('chai');
const expect = chai.expect;

const ShoppingCart = require('../ShoppingCart');

const sinon = require('sinon');

describe('The SIM Company Cart', () => {
    describe('An empty cart with no pricing rules', () => {
        let cart;

        beforeEach(() => {
            cart = new ShoppingCart({
                catalogue: []
            });
        });

        it('should exist', () => {
            expect(cart).to.be.an('object');
        });

        it('should have no total and no items', () => {
            expect(cart.total()).to.deep.equal(0);
            expect(cart.items()).to.deep.equal([]);
        });
    });

    describe('A cart with a catalogue, no offers, and one item', () => {
        let cart;

        const item1 = {
            productCode: 'productCode1',
            productName: 'productName1',
            price: 12345
        };

        beforeEach(() => {
            cart = new ShoppingCart({
                catalogue: [
                    item1
                ]
            });
            cart.add('productCode1');
        });

        it('should exist', () => {
            expect(cart).to.be.an('object');
        });

        it('should have a total and an item', () => {
            expect(cart.total()).to.deep.equal(12345);
            expect(cart.items()).to.deep.equal([item1]);
        });
    });

    describe('A cart with no catalogue, no offers, and attempt to add an item', () => {
        let cart;

        beforeEach(() => {
            cart = new ShoppingCart({
                catalogue: []
            });
            cart.add('productCode1');
        });

        it('should exist', () => {
            expect(cart).to.be.an('object');
        });

        it('should have no total and no items', () => {
            expect(cart.total()).to.deep.equal(0);
            expect(cart.items()).to.deep.equal([]);
        });
    });

    describe('A cart with a catalogue, no offers, and two items', () => {
        let cart;

        const item1 = {
            productCode: 'productCode1',
            productName: 'productName1',
            price: 12345
        };

        const item2 = {
            productCode: 'productCode2',
            productName: 'productName2',
            price: 67890
        };

        beforeEach(() => {
            cart = new ShoppingCart({
                catalogue: [
                    item1,
                    item2
                ]
            });
            cart.add('productCode1');
            cart.add('productCode2');
        });

        it('should exist', () => {
            expect(cart).to.be.an('object');
        });

        it('should have a total and items', () => {
            expect(cart.total()).to.deep.equal(80235);
            expect(cart.items()).to.deep.equal([item1, item2]);
        });
    });

    describe('A cart with a catalogue, an offer, and one item', () => {
        let cart;
        let offerFn;

        const item1 = {
            productCode: 'productCode1',
            productName: 'productName1',
            price: 12345
        };

        beforeEach(() => {
            offerFn = sinon.spy((items) => items);

            cart = new ShoppingCart({
                catalogue: [
                    item1
                ],

                offers: [
                    offerFn
                ]
            });
            cart.add('productCode1');
        });

        it('should exist', () => {
            expect(cart).to.be.an('object');
        });

        it('should have a total and items', () => {
            expect(cart.total()).to.deep.equal(12345);
            expect(cart.items()).to.deep.equal([item1]);

            expect(offerFn.calledWithExactly([item1])).to.equal(true);
        });
    });

    describe('A cart with a catalogue, two offers, and one item', () => {
        let cart;
        let offerFn1, offerFn2;

        const item1 = {
            productCode: 'productCode1',
            productName: 'productName1',
            price: 12345
        };

        beforeEach(() => {
            offerFn1 = sinon.spy((items) => [{
                productCode: 'productCode2',
                productName: 'productName2',
                price: 12346
            }]);

            offerFn2 = sinon.spy((items) => [{
                productCode: 'productCode3',
                productName: 'productName3',
                price: 12347
            }]);

            cart = new ShoppingCart({
                catalogue: [
                    item1
                ],
                offers: [
                    offerFn1, offerFn2
                ]
            });
            cart.add('productCode1');
        });

        it('should exist', () => {
            expect(cart).to.be.an('object');
        });

        it('should have a total and items', () => {
            expect(cart.total()).to.deep.equal(12347);
            expect(cart.items()).to.deep.equal([{
                productCode: 'productCode3',
                productName: 'productName3',
                price: 12347
            }]);

            expect(offerFn1.calledWithExactly([item1])).to.equal(true);
            expect(offerFn2.calledWithExactly([{
                productCode: 'productCode2',
                productName: 'productName2',
                price: 12346
            }])).to.equal(true);
        });
    });

    describe('A cart with a catalogue, an offer with a promo code, and one item with a promo code', () => {
        let cart;
        let offerFn;

        const item1 = {
            productCode: 'productCode1',
            productName: 'productName1',
            price: 12345
        };

        beforeEach(() => {
            offerFn = sinon.spy((items) => items);

            cart = new ShoppingCart({
                catalogue: [
                    item1
                ],
                promoOffers: {
                    'coupon1': [offerFn]
                }
            });
            cart.add('productCode1', 'coupon1');
        });

        it('should exist', () => {
            expect(cart).to.be.an('object');
        });

        it('should have a total and items', () => {
            expect(cart.total()).to.deep.equal(12345);
            expect(cart.items()).to.deep.equal([item1]);

            expect(offerFn.calledWithExactly([item1])).to.equal(true);
        });
    });

    describe('A cart with a catalogue, and one item with a promo code that does not exist', () => {
        let cart;

        const item1 = {
            productCode: 'productCode1',
            productName: 'productName1',
            price: 12345
        };

        beforeEach(() => {
            cart = new ShoppingCart({
                catalogue: [
                    item1
                ],
                promoOffers: {
                }
            });
            cart.add('productCode1', 'coupon1');
        });

        it('should exist', () => {
            expect(cart).to.be.an('object');
        });

        it('should have a total and items', () => {
            expect(cart.total()).to.deep.equal(12345);
            expect(cart.items()).to.deep.equal([item1]);
        });
    });

    describe('A cart with a catalogue, one offer, one coupon offer, and one item', () => {
        let cart;
        let offerFn1, offerFn2;

        const item1 = {
            productCode: 'productCode1',
            productName: 'productName1',
            price: 12345
        };

        beforeEach(() => {
            offerFn1 = sinon.spy((items) => [{
                productCode: 'productCode2',
                productName: 'productName2',
                price: 12346
            }]);

            offerFn2 = sinon.spy((items) => [{
                productCode: 'productCode3',
                productName: 'productName3',
                price: 12347
            }]);

            cart = new ShoppingCart({
                catalogue: [
                    item1
                ],
                offers: [
                    offerFn1
                ],
                promoOffers: {
                    'coupon2': [offerFn2]
                }
            });
            cart.add('productCode1', 'coupon2');
        });

        it('should exist', () => {
            expect(cart).to.be.an('object');
        });

        it('should have a total and items', () => {
            expect(cart.total()).to.deep.equal(12347);
            expect(cart.items()).to.deep.equal([{
                productCode: 'productCode3',
                productName: 'productName3',
                price: 12347
            }]);

            expect(offerFn1.calledWithExactly([item1])).to.equal(true);
            expect(offerFn2.calledWithExactly([{
                productCode: 'productCode2',
                productName: 'productName2',
                price: 12346
            }])).to.equal(true);
        });
    });

    describe('A cart with a catalogue, one offer, one coupon offer applied twice, and one item', () => {
        let cart;
        let offerFn1, offerFn2;

        const item1 = {
            productCode: 'productCode1',
            productName: 'productName1',
            price: 12345
        };

        const item2 = {
            productCode: 'productCode2',
            productName: 'productName2',
            price: 0
        };

        beforeEach(() => {
            offerFn1 = sinon.spy((items) => [{
                productCode: 'productCode2',
                productName: 'productName2',
                price: 12346
            }]);

            offerFn2 = sinon.spy((items) => [{
                productCode: 'productCode3',
                productName: 'productName3',
                price: 12347
            }]);

            cart = new ShoppingCart({
                catalogue: [
                    item1, item2
                ],
                offers: [
                    offerFn1
                ],
                promoOffers: {
                    'coupon2': [offerFn2]
                }
            });
            cart.add('productCode1', 'coupon2');
            cart.add('productCode2', 'coupon2');
        });

        it('should exist', () => {
            expect(cart).to.be.an('object');
        });

        it('should have a total and items, coupon should not be applied twice', () => {
            expect(cart.total()).to.deep.equal(12347);
            expect(cart.items()).to.deep.equal([{
                productCode: 'productCode3',
                productName: 'productName3',
                price: 12347
            }]);

            expect(offerFn1.calledWithExactly([item1, item2])).to.equal(true);
            expect(offerFn2.calledWithExactly([{
                productCode: 'productCode2',
                productName: 'productName2',
                price: 12346
            }])).to.equal(true);
        });
    });
});




