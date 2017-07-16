'use strict';

const chai = require('chai');
const expect = chai.expect;

const offer = require('../../offer/index');

describe('The SIM Company Offer', () => {
    describe('The Make Item Free Offer', () => {
        it('should not make an item free if there are no items matching', () => {
            const f = offer.makeItemFree('product1', 2, 1);
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

        it('should make an item free if two items are present and then the condition was met', () => {
            const f = offer.makeItemFree('product1', 2, 1);
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
                price: 0
            }]);
        });

        it('should make an item free if three items are present and then the condition was met', () => {
            const f = offer.makeItemFree('product1', 3, 1);
            expect(f([{
                    productCode: 'product1',
                    productName: 'product1',
                    price: 123
                }, {
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
                price: 0
            }, {
                productCode: 'product1',
                productName: 'product1',
                price: 0
            }]);
        });

        it('should make an item free in a mix of matching and non-matching', () => {
            const f = offer.makeItemFree('product1', 2, 1);
            expect(f([{
                    productCode: 'product1',
                    productName: 'product1',
                    price: 123
                }, {
                    productCode: 'product2',
                    productName: 'product1',
                    price: 567
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
                productCode: 'product2',
                productName: 'product1',
                price: 567
            }, {
                productCode: 'product1',
                productName: 'product1',
                price: 0
            }]);
        });
    });
});




