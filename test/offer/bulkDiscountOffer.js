'use strict';

const chai = require('chai');
const expect = chai.expect;

const Decimal = require('decimal.js');

const offer = require('../../offer/index');

describe('The SIM Company Offer', () => {
    describe('The Bulk Discount Offer', () => {
        it('should not make an item discounted if there are no items matching', () => {
            const f = offer.bulkDiscount('product1', 1, Decimal(0.01));
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

        it('should make an item discounted if enough items are matching', () => {
            const f = offer.bulkDiscount('product1', 2, Decimal(0.01));
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
                price: new Decimal(0.01)
            }, {
                productCode: 'product1',
                productName: 'product1',
                price: new Decimal(0.01)
            }]);
        });

        it('should make an item discounted if enough items are matching and there are others', () => {
            const f = offer.bulkDiscount('product1', 1, Decimal(0.01));
            expect(f([{
                    productCode: 'product1',
                    productName: 'product1',
                    price: new Decimal(1.23)
                }, {
                    productCode: 'product2',
                    productName: 'product2',
                    price: new Decimal(3.21)
                }]
            )).to.deep.equal([{
                productCode: 'product1',
                productName: 'product1',
                price: new Decimal(0.01)
            }, {
                productCode: 'product2',
                productName: 'product2',
                price: new Decimal(3.21)
            }]);
        });

        it('should make an item discounted if enough items are matching and repeated', () => {
            const f = offer.bulkDiscount('product1', 1, Decimal(0.01));
            expect(f([{
                    productCode: 'product1',
                    productName: 'product1',
                    price: new Decimal(1.23)
                }, {
                    productCode: 'product1',
                    productName: 'product1',
                    price: new Decimal(3.21)
                }]
            )).to.deep.equal([{
                productCode: 'product1',
                productName: 'product1',
                price: new Decimal(0.01)
            }, {
                productCode: 'product1',
                productName: 'product1',
                price: new Decimal(0.01)
            }]);
        });

        it('should not make an item discounted if not enough items are matching', () => {
            const f = offer.bulkDiscount('product1', 3, Decimal(0.01));
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
            }]);
        });
    });
});




