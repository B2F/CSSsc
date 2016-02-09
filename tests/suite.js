var assert          = require('assert'),
    csssc           = require('../csssc.js'),
    fullPageConfig  = require('./sample_configs/full-pages.js');

describe('configuration', function() {
    it('should return a configuration object', function() {
        csssc.loadConfiguration(fullPageConfig);
        assert.equal(csssc.getPages(), fullPageConfig.pages);
    });

})