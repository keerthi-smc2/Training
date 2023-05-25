 'use strict';

var extend = require('server/assign');
module.exports = extend(module.superModule, {

    washAndCare: require('*/cartridge/models/product/decorators/washAndCare'),
    customizedProduct: require('*/cartridge/models/product/decorators/customizedProduct'),
    winterCollection: require('*/cartridge/models/product/decorators/winterCollection'),
    custom: require('*/cartridge/models/product/decorators/custom')
});