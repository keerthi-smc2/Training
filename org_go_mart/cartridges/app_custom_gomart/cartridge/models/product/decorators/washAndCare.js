'use strict';

module.exports = function (object, apiProduct) {
    Object.defineProperty(object, 'washAndCare', {

        enumerable: true,
        value: apiProduct.custom.washAndCare
    });
};