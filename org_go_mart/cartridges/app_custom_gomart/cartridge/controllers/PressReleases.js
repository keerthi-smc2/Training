'use strict';

var server = require('server');

server.get('Show', function(req, res, next) {
    var Resource = require('dw/web/Resource');
    var URLUtils = require('dw/web/URLUtils');

    var ceo = Resource.msg('new.ceo.name', 'about', null);
    var vp = Resource.msg('new.vp.name', 'about', null);
    
    
    var breadcrumbs = [
        {
            htmlValue: Resource.msg('global.home', 'common', null),
            url: URLUtils.home().toString()
        },
        {
            htmlValue: Resource.msg('global.feedback', 'common', null),
            url: URLUtils.url('Feedback-Show').toString()
        }
    ];

    res.render('pressreleases/pressReleases', {
        ceo : ceo,
        vp : vp,
        breadcrumbs: breadcrumbs
    });
    next();
});

module.exports = server.exports();