'use strict';

const chai = require('chai');
const expect = chai.expect;

const offer = require('../../offer/index');

describe('The SIM Company Offer', () => {
    describe('The Bundle Item Offer', () => {
        it('should not bundle an item if there are no items matching', () => {
            const f = offer.bundleItem('product1', 2, 1);
            expect(f([{
                    productCode: 'someOtherProduct2',
                    productName: 'someOtherProduct2',
                    price: 321
                }]
            )).to.deep.equal([{
                productCode: 'someOtherProduct2',
                productName: 'someOtherProduct2',
                price: 321
            }]);
        });

        it('should bundle one item if one item was matched', () => {
            const f = offer.bundleItem('product1', 1, {
                productCode: 'product2',
                productName: 'product2',
                price: 234
            }, 1);
            expect(f([{
                    productCode: 'product1',
                    productName: 'product1',
                    price: 123
                }]
            )).to.deep.equal([{
                productCode: 'product1',
                productName: 'product1',
                price: 123
            }, {
                productCode: 'product2',
                productName: 'product2',
                price: 234
            }]);
        });

        it('should bundle one item if two items were matched', () => {
            const f = offer.bundleItem('product1', 2, {
                productCode: 'product2',
                productName: 'product2',
                price: 234
            }, 1);
            expect(f([{
                    productCode: 'product1',
                    productName: 'product1',
                    price: 123
                }, {
                    productCode: 'product1',
                    productName: 'product1',
                    price: 123
                }]
            )).to.deep.equal([{
                productCode: 'product1',
                productName: 'product1',
                price: 123
            }, {
                productCode: 'product1',
                productName: 'product1',
                price: 123
            }, {
                productCode: 'product2',
                productName: 'product2',
                price: 234
            }]);
        });

        it('should bundle two items if one item was matched', () => {
            const f = offer.bundleItem('product1', 1, {
                productCode: 'product2',
                productName: 'product2',
                price: 234
            }, 2);
            expect(f([{
                    productCode: 'product1',
                    productName: 'product1',
                    price: 123
                }]
            )).to.deep.equal([{
                productCode: 'product1',
                productName: 'product1',
                price: 123
            }, {
                productCode: 'product2',
                productName: 'product2',
                price: 234
            }, {
                productCode: 'product2',
                productName: 'product2',
                price: 234
            }]);
        });

        it('should bundle one items if one item was matched, and some other product', () => {
            const f = offer.bundleItem('product1', 1, {
                productCode: 'product2',
                productName: 'product2',
                price: 234
            }, 1);
            expect(f([{
                    productCode: 'product1',
                    productName: 'product1',
                    price: 123
                }, {
                    productCode: 'otherProduct1',
                    productName: 'otherProduct1',
                    price: 456
                }]
            )).to.deep.equal([{
                productCode: 'product1',
                productName: 'product1',
                price: 123
            }, {
                productCode: 'otherProduct1',
                productName: 'otherProduct1',
                price: 456
            }, {
                productCode: 'product2',
                productName: 'product2',
                price: 234
            }]);
        });
    });
});
