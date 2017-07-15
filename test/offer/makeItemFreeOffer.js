'use strict';

const chai = require('chai');
const expect = chai.expect;

const Decimal = require('decimal.js');

const offer = require('../../offer/index');

describe('The SIM Company Offer', () => {
    describe('The Make Item Free Offer', () => {
        it('should not make an item free if there are no items matching', () => {
            const f = offer.makeItemFree('product1', 2, 1);
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

        it('should make an item free if two items are present and then the condition was met', () => {
            const f = offer.makeItemFree('product1', 2, 1);
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
                price: new Decimal(0)
            }]);
        });

        it('should make an item free if three items are present and then the condition was met', () => {
            const f = offer.makeItemFree('product1', 3, 1);
            expect(f([{
                    productCode: 'product1',
                    productName: 'product1',
                    price: new Decimal(1.23)
                }, {
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
                price: new Decimal(0)
            }, {
                productCode: 'product1',
                productName: 'product1',
                price: new Decimal(0)
            }]);
        });

        it('should make an item free in a mix of matching and non-matching', () => {
            const f = offer.makeItemFree('product1', 2, 1);
            expect(f([{
                    productCode: 'product1',
                    productName: 'product1',
                    price: new Decimal(1.23)
                }, {
                    productCode: 'product2',
                    productName: 'product1',
                    price: new Decimal(5.67)
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
                productCode: 'product2',
                productName: 'product1',
                price: new Decimal(5.67)
            }, {
                productCode: 'product1',
                productName: 'product1',
                price: new Decimal(0)
            }]);
        });
    });
});




