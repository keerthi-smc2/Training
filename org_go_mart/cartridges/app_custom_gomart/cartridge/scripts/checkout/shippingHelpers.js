'use strict';

var base = module.superModule;

var collections = require('*/cartridge/scripts/util/collections');

var ShippingMgr = require('dw/order/ShippingMgr');

var ShippingModel = require('*/cartridge/models/shipping');
 
var ProductLineItemsModel = require('*/cartridge/models/productLineItems');

var ShippingMethodModel = require('*/cartridge/models/shipping/shippingMethod');

var Site = require('dw/system/Site');

//  calculating total product weight

function getTotalProductWeight(productLineItemsModel) {
    var totalProductWeight = 0;
    productLineItemsModel.items.forEach(function (item) {
        var singleLineItemProductWeight = 0;
        if(item.quantity > 1) {
            singleLineItemProductWeight = item.quantity * item.productWeight;
        } else {
            singleLineItemProductWeight += item.productWeight;
        }
        totalProductWeight += singleLineItemProductWeight;
    });
    return totalProductWeight;
}


 
 base.getApplicableShippingMethods = function(shipment, address) {

    var shipmentShippingModel = ShippingMgr.getShipmentShippingModel(shipment);
    var productLineItemsModel =  new ProductLineItemsModel(shipment.productLineItems,'shipment');
    var totalWeight = getTotalProductWeight(productLineItemsModel);
    var thresholdWeight = Site.getCurrent().getCustomPreferenceValue('thresholdWeight');


    if (!shipment) return null;


    var shippingMethods;
    if (address) {
        shippingMethods = shipmentShippingModel.getApplicableShippingMethods(address);
    } else {
        shippingMethods = shipmentShippingModel.getApplicableShippingMethods();
    }

    // Filter out whatever the method associated with in store pickup
    var filteredMethods = [];
    collections.forEach(shippingMethods, function (shippingMethod) {
        if (!shippingMethod.custom.storePickupEnabled) {
            filteredMethods.push(new ShippingMethodModel(shippingMethod, shipment));
        }
    });

    
    // Adding new lines below

    if(thresholdWeight < totalWeight) {
        for (var i = 0; i < filteredMethods.length; i++) {
            if(filteredMethods[i].ID === 'Freight') {
                filteredMethods.splice(i, 1);
            }
        }
        
    } 
    return filteredMethods;
}

module.exports = base;
module.exports.getTotalProductWeight = getTotalProductWeight;
