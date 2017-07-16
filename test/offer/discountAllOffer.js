'use strict';

const chai = require('chai');
const expect = chai.expect;

const offer = require('../../offer/index');

describe('The SIM Company Offer', () => {
    describe('The Discount Offer', () => {
        it('should not return any items if there are no items matching', () => {
            const f = offer.discountAll(10);
            expect(f([])).to.deep.equal([]);
        });

        it('should not discount if price is already zero', () => {
            const f = offer.discountAll(10);
            expect(f([{
                productCode: 'product3',
                productName: 'product3',
                price: 0
            }])).to.deep.equal([{
                productCode: 'product3',
                productName: 'product3',
                price: 0
            }]);
        });

        it('should discount and round down', () => {
            const f = offer.discountAll(10);
            expect(f([{
                productCode: 'product3',
                productName: 'product3',
                price: 12345
            }])).to.deep.equal([{
                productCode: 'product3',
                productName: 'product3',
                price: 11110
            }]);
        });
    });
});
