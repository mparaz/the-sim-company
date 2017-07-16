'use strict';

const chai = require('chai');
const expect = chai.expect;

const offer = require('../../offer/index');

describe('The SIM Company Offer', () => {
    describe('The Bulk Discount Offer', () => {
        it('should not make an item discounted if there are no items matching', () => {
            const f = offer.bulkDiscount('product1', 1, 1);
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

        it('should make an item discounted if enough items are matching', () => {
            const f = offer.bulkDiscount('product1', 2, 1);
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
                price: 1
            }, {
                productCode: 'product1',
                productName: 'product1',
                price: 1
            }]);
        });

        it('should make an item discounted if enough items are matching and there are others', () => {
            const f = offer.bulkDiscount('product1', 1, 1);
            expect(f([{
                    productCode: 'product1',
                    productName: 'product1',
                    price: 123
                }, {
                    productCode: 'product2',
                    productName: 'product2',
                    price: 321
                }]
            )).to.deep.equal([{
                productCode: 'product1',
                productName: 'product1',
                price: 1
            }, {
                productCode: 'product2',
                productName: 'product2',
                price: 321
            }]);
        });

        it('should make an item discounted if enough items are matching and repeated', () => {
            const f = offer.bulkDiscount('product1', 1, 1);
            expect(f([{
                    productCode: 'product1',
                    productName: 'product1',
                    price: 123
                }, {
                    productCode: 'product1',
                    productName: 'product1',
                    price: 321
                }]
            )).to.deep.equal([{
                productCode: 'product1',
                productName: 'product1',
                price: 1
            }, {
                productCode: 'product1',
                productName: 'product1',
                price: 1
            }]);
        });

        it('should not make an item discounted if not enough items are matching', () => {
            const f = offer.bulkDiscount('product1', 3, 1);
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
            }]);
        });
    });
});




