'use strict';

const chai = require('chai');
const expect = chai.expect;

const ShoppingCart = require('../ShoppingCart');

const Decimal = require('decimal.js');

describe('The SIM Company Cart', () => {
    describe('An empty cart with no pricing rules', () => {
        let cart;

        beforeEach(() => {
            cart = new ShoppingCart({});
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
});




