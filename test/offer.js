'use strict';

const chai = require('chai');
const expect = chai.expect;

const Decimal = require('decimal.js');

const offer = require('../offer');

describe('The SIM Company Offer', () => {
    describe('The Free Item Offer', () => {
        it('should not add a free item if there are no items present', () => {
            const f = offer.freeItem('product1', 1, 2);
            expect(f([], {
                    productCode: 'someOtherProduct2'
                }
            )).to.deep.equal([{
                productCode: 'someOtherProduct2'
            }]);
        });

        it('should not add a free item if some other item was already present', () => {
            const f = offer.freeItem('product1', 1, 2);
            expect(f([
                    {
                        productCode: 'someOtherProduct1'
                    }
                ], {
                    productCode: 'someOtherProduct2'
                }
            )).to.deep.equal([{
                productCode: 'someOtherProduct1'
            }, {
                productCode: 'someOtherProduct2'
            }]);
        });

        it('should add a free item if there were no items and then the condition was met', () => {
            const f = offer.freeItem('product1', 1, 2);
            expect(f([], {
                    productCode: 'product1'
                }
            )).to.deep.equal([{
                productCode: 'product1'
            }, {
                productCode: 'product1'
            }]);
        });

        it('should add a free item if there was one item and then the condition was met', () => {
            const f = offer.freeItem('product1', 2, 3);
            expect(f([{
                    productCode: 'product1'
                }], {
                    productCode: 'product1'
                }
            )).to.deep.equal([{
                productCode: 'product1'
            }, {
                productCode: 'product1'
            }, {
                productCode: 'product1'
            }]);
        });

        // Only adding a matching item should trigger the offer.

        it('should not add a free item if there was one item, the condition was already met, then another item was added', () => {
            const f = offer.freeItem('product1', 2, 3);
            expect(f([{
                    productCode: 'product1'
                }, {
                    productCode: 'product1'
                }], {
                    productCode: 'product2'
                }
            )).to.deep.equal([{
                productCode: 'product1'
            }, {
                productCode: 'product1'
            }, {
                productCode: 'product2'
            }]);
        });
    });
});




