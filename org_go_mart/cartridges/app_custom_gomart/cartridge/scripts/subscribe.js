'use Strict';

function saveInObject(email) {
    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
    var Transaction = require('dw/system/Transaction');
    var Resource = require('dw/web/Resource');

    var customObject = CustomObjectMgr.getCustomObject('subscription', email);
    var msg;
    if(customObject === null) {
        Transaction.wrap(function () {
             var newObject = CustomObjectMgr.createCustomObject('subscription', email);
        });
        msg = Resource.msg('subscribe.email.success', 'homepage', null);
        
    } else {
         msg = Resource.msg('subscribe.already.exists.error.msg', 'homepage', null);
      }
    return msg;  
}

module.exports = {
    saveInObject : saveInObject
};
