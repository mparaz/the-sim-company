'use strict';

const chai = require('chai');
const expect = chai.expect;

const Decimal = require('decimal.js');

const offer = require('../../offer/index');

describe('The SIM Company Offer', () => {
    describe('The Bundle Item Offer', () => {
        it('should not bundle an item if there are no items matching', () => {
            const f = offer.bundleItem('product1', 2, 1);
            expect(f([{
                    productCode: 'someOtherProduct2',
                    productName: 'someOtherProduct2',
                    price: new Decimal(3.21)
                }]
            )).to.deep.equal([{
                productCode: 'someOtherProduct2',
                productName: 'someOtherProduct2',
                price: new Decimal(3.21)
            }]);
        });

        it('should bundle one item if one item was matched', () => {
            const f = offer.bundleItem('product1', 1, {
                productCode: 'product2',
                productName: 'product2',
                price: new Decimal(2.34)
            }, 1);
            expect(f([{
                    productCode: 'product1',
                    productName: 'product1',
                    price: new Decimal(1.23)
                }]
            )).to.deep.equal([{
                productCode: 'product1',
                productName: 'product1',
                price: new Decimal(1.23)
            }, {
                productCode: 'product2',
                productName: 'product2',
                price: new Decimal(2.34)
            }]);
        });

        it('should bundle one item if two items were matched', () => {
            const f = offer.bundleItem('product1', 2, {
                productCode: 'product2',
                productName: 'product2',
                price: new Decimal(2.34)
            }, 1);
            expect(f([{
                    productCode: 'product1',
                    productName: 'product1',
                    price: new Decimal(1.23)
                }, {
                    productCode: 'product1',
                    productName: 'product1',
                    price: new Decimal(1.23)
                }]
            )).to.deep.equal([{
                productCode: 'product1',
                productName: 'product1',
                price: new Decimal(1.23)
            }, {
                productCode: 'product1',
                productName: 'product1',
                price: new Decimal(1.23)
            }, {
                productCode: 'product2',
                productName: 'product2',
                price: new Decimal(2.34)
            }]);
        });

        it('should bundle two items if one item was matched', () => {
            const f = offer.bundleItem('product1', 1, {
                productCode: 'product2',
                productName: 'product2',
                price: new Decimal(2.34)
            }, 2);
            expect(f([{
                    productCode: 'product1',
                    productName: 'product1',
                    price: new Decimal(1.23)
                }]
            )).to.deep.equal([{
                productCode: 'product1',
                productName: 'product1',
                price: new Decimal(1.23)
            }, {
                productCode: 'product2',
                productName: 'product2',
                price: new Decimal(2.34)
            }, {
                productCode: 'product2',
                productName: 'product2',
                price: new Decimal(2.34)
            }]);
        });

        it('should bundle one items if one item was matched, and some other product', () => {
            const f = offer.bundleItem('product1', 1, {
                productCode: 'product2',
                productName: 'product2',
                price: new Decimal(2.34)
            }, 1);
            expect(f([{
                    productCode: 'product1',
                    productName: 'product1',
                    price: new Decimal(1.23)
                }, {
                    productCode: 'otherProduct1',
                    productName: 'otherProduct1',
                    price: new Decimal(4.56)
                }]
            )).to.deep.equal([{
                productCode: 'product1',
                productName: 'product1',
                price: new Decimal(1.23)
            }, {
                productCode: 'otherProduct1',
                productName: 'otherProduct1',
                price: new Decimal(4.56)
            }, {
                productCode: 'product2',
                productName: 'product2',
                price: new Decimal(2.34)
            }]);
        });
    });
});
