'use strict';

const chai = require('chai');
const expect = chai.expect;

const ShoppingCart = require('../ShoppingCart');

const Decimal = require('decimal.js');

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

        it('should have no total', () => {
            expect(cart.total()).to.deep.equal(new Decimal(0));
        });

        it('should have no items', () => {
            expect(cart.items()).to.deep.equal([]);
        });
    });

    describe('An cart with a catalogue, no offers, and one item', () => {
        let cart;

        const item1 = {
            productCode: 'productCode1',
            productName: 'productName1',
            price: Decimal(123.45)
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

        it('should have a total', () => {
            expect(cart.total()).to.deep.equal(new Decimal(123.45));
        });

        it('should have an items', () => {
            expect(cart.items()).to.deep.equal([item1]);
        });
    });

    describe('An cart with no catalogue, no offers, and attempt to add an item', () => {
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

        it('should have no total', () => {
            expect(cart.total()).to.deep.equal(new Decimal(0));
        });

        it('should have no items', () => {
            expect(cart.items()).to.deep.equal([]);
        });
    });

    describe('An cart with a catalogue, no offers, and two items', () => {
        let cart;

        const item1 = {
            productCode: 'productCode1',
            productName: 'productName1',
            price: Decimal(123.45)
        };

        const item2 = {
            productCode: 'productCode2',
            productName: 'productName2',
            price: Decimal(678.90)
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

        it('should have a total', () => {
            expect(cart.total()).to.deep.equal(new Decimal(802.35));
        });

        it('should have an items', () => {
            expect(cart.items()).to.deep.equal([item1, item2]);
        });
    });
});




