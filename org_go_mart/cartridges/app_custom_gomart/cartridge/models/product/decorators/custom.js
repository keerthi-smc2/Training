'use strict';

module.exports = function (object, apiProduct) {
   Object.defineProperty(object, 'manufacturerSKU', {
    enumerable: true,
    value: apiProduct.manufacturerSKU
  });

  Object.defineProperty(object, 'isDiscontinuedFlag', {
    enumerable: true,
    value: apiProduct.custom.isDiscontinuedFlag
  });

  
  Object.defineProperty(object, 'productWeight', {
    enumerable: true,
    value: apiProduct.custom.productWeight
  });


};