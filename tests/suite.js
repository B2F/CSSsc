var assert          = require('assert'),
    csssc           = require('../csssc.js'),
    fullPageConfig  = require('./configuration_samples/full-pages.js');

describe('CSSsc configuration', function() {

    csssc.initConfiguration(fullPageConfig);
    var csssconfig = csssc.getConfiguration();

    it('should generate stats', function() {
        var stats = csssc.getStats();
        assert.notStrictEqual(stats.planned.pages, Object.keys(fullPageConfig.pages));
    });

    it('should have default body selector', function() {
        assert.equal(csssconfig.pages.bodyDefault.captures.body.selector, 'body');
    });

    it('should have named selectors', function() {
        assert.equal(csssconfig.pages.bodyCapture.captures.fullPage.selector, 'body');
    });

    it('should define a default client driver', function() {
        assert.equal(csssc.getOpt('clientDriver'), './lib/csssc/CssscCasper.js');
    });

    it('should define a default viewport', function() {
        assert.ok(csssconfig.viewports.default.width);
    });
})

describe('CSSsc updates', function() {

    it('should use casperjs by default', function() {
        assert.equal(csssc.getClient().name, 'casperjs');
    });
})