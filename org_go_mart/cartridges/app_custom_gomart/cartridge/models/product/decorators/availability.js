'use strict';

var Resource = require('dw/web/Resource');

module.exports = function (object, quantity, minOrderQuantity, availabilityModel) {
    Object.defineProperty(object, 'availability', {
        enumerable: true,
        value: (function () {
            var availability = {};
            availability.messages = [];
            var productQuantity = quantity ? parseInt(quantity, 10) : minOrderQuantity;
            var availabilityModelLevels = availabilityModel.getAvailabilityLevels(productQuantity);
            var inventoryRecord = availabilityModel.inventoryRecord;
            availability.isInStock = inventoryRecord ? inventoryRecord.ATS.value : '';

            if (inventoryRecord && inventoryRecord.inStockDate) {
                availability.inStockDate = inventoryRecord.inStockDate.toDateString();
            } else {
                availability.inStockDate = null;
            }
            var inventoryATS_value = inventoryRecord ? inventoryRecord.ATS.value : '';
            if (availabilityModelLevels.inStock.value > 0) {
                if(inventoryATS_value && inventoryATS_value <= 10){
                    availability.messages.push(Resource.msgf(
                        'label.hurry.in.stock',
                        'common',
                        null,
                        availabilityModelLevels.inStock.value
                    ));
                }

                else if (availabilityModelLevels.inStock.value === productQuantity) {
                    availability.messages.push(Resource.msgf(
                        'label.instock',
                        'common',
                        null,
                        availabilityModelLevels.inStock.value
                    ));
                } else {
                    availability.messages.push(
                        Resource.msgf(
                            'label.quantity.in.stock',
                            'common',
                            null,
                            availabilityModelLevels.inStock.value
                        )
                    );
                }
            }

            if (availabilityModelLevels.preorder.value > 0) {
                if (availabilityModelLevels.preorder.value === productQuantity) {
                    availability.messages.push(Resource.msg('label.preorder', 'common', null));
                } else {
                    availability.messages.push(
                        Resource.msgf(
                            'label.preorder.items',
                            'common',
                            null,
                            availabilityModelLevels.preorder.value
                        )
                    );
                }
            }

            if (availabilityModelLevels.backorder.value > 0) {
                if (availabilityModelLevels.backorder.value === productQuantity) {
                    availability.messages.push(Resource.msg('label.back.order', 'common', null));
                } else {
                    availability.messages.push(
                        Resource.msgf(
                            'label.back.order.items',
                            'common',
                            null,
                            availabilityModelLevels.backorder.value
                        )
                    );
                }
            }

            if (availabilityModelLevels.notAvailable.value > 0) {
                if (availabilityModelLevels.notAvailable.value === productQuantity) {
                    availability.messages.push(Resource.msg('label.not.available', 'common', null));
                } else {
                    availability.messages.push(Resource.msg('label.not.available.items', 'common', null));
                }
            }

            return availability;
        }())
    });
    Object.defineProperty(object, 'available', {
        enumerable: true,
        value: availabilityModel.isOrderable(parseFloat(quantity) || minOrderQuantity)
    });
};
