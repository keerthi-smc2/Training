'use strict';

var ContentMgr = require('dw/content/ContentMgr');

module.exports = function (object, apiProduct) {
    Object.defineProperty(object, 'winterCollection', {

        enumerable: true,
        value: apiProduct.custom.winterCollection
    });
    Object.defineProperty(object, 'winterCollectionbanner', {
        enumerable: true,
        value: apiProduct.custom.winterCollection ? ContentMgr.getContent('winter-Collection') : null
    });
};