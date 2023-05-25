'use strict';
var base = module.superModule;
var Resource =require('dw/web/Resource');

var RESOURCES = {
    noSelectedPaymentMethod: Resource.msg('error.no.selected.payment.method', 'creditCard', null),
    cardType: Resource.msg('msg.payment.type.credit', 'confirmation', null),
    cardEnding: Resource.msg('msg.card.type.ending', 'confirmation', null),
    shippingMethod: Resource.msg('Shipping Method', 'checkout', null),
    items: Resource.msg('msg.items', 'checkout', null),
    item: Resource.msg('msg.item', 'checkout', null),
    addNewAddress: Resource.msg('msg.new.address', 'checkout', null),
    newAddress: Resource.msg('msg.new.address', 'checkout', null),
    shipToAddress: Resource.msg('msg.ship.to.address', 'checkout', null),
    shippingAddresses: Resource.msg('msg.shipping.addresses', 'checkout', null),
    accountAddresses: Resource.msg('msg.account.addresses', 'checkout', null),
    shippingTo: Resource.msg('msg.shipping.to', 'checkout', null),
    shippingAddress: Resource.msg('label.order.shipping.address', 'confirmation', null),
    addressIncomplete: Resource.msg('heading.address.incomplete', 'checkout', null),
    giftMessage: Resource.msg('heading.gift.message', 'checkout', null),
    codmsg:Resource.msg('cod.message','common',null)
};

module.exports = function OrderModel(lineItemContainer, options) {
    base.call(this, lineItemContainer, options);
    this.resources = RESOURCES;

}

