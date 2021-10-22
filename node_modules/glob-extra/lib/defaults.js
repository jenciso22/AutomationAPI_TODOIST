'use strict';
const _ = require('lodash');

const defaultOpts = {
    expandOpts: {
        root: null,
        formats: []
    },
    globOpts: {
        onlyFiles: false
    }
};

module.exports = (name, options = {}) => _.defaults(options, defaultOpts[name]);
