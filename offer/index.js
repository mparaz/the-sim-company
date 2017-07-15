'use strict';

// Offers are higher-order functions that transform return the new items list.
//
// Items are distinct, each with a price, because offers may modify the price of one item independently of the
// other (e.g. buy one and take half off the first one).
//
// Only the new item added will trigger the offer.
// Items already present are already considered to have matched a previous rule.

const freeItem = (productCode, buyNumber, takeNumber) => (oldItems, newItem) => {
    // Append the item and finish if the new item added was not matching.
    const result = oldItems.slice();
    result.push(newItem);

    if (newItem.productCode !== productCode) {
        return result;
    }

    // Apply the offer by checking if the new count of matching products hits the desired amount,
    // and then add the remaining number.
    const matchCount = result.filter((item) => item.productCode == productCode).length;

    if (matchCount === buyNumber) {
        const freeItemCount = takeNumber - buyNumber;

        for (let i = 0; i < freeItemCount; i++) {
            result.push(newItem);
        }
    }

    return result;
};

module.exports.freeItem = freeItem;


