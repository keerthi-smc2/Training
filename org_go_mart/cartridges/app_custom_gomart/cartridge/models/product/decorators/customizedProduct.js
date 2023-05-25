'use strict';

var Resource = require('dw/web/Resource');

module.exports = function (object, apiProduct) {
    Object.defineProperty(object, 'canBeCustomized', {

        enumerable: true,
        value: apiProduct.custom.canBeCustomized
    });

    Object.defineProperty(object, 'customizedMessage', {
        enumerable: true,
        value: apiProduct.custom.canBeCustomized ? Resource.msg('info.aboutpurchase', 'product', null) : null
    });
};