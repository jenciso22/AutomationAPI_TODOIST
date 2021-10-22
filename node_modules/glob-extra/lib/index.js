'use strict';

const path = require('path');
const Promise = require('bluebird');
const _ = require('lodash');
const fg = require('fast-glob');
const {Minimatch} = require('minimatch');
const normalize = require('normalize-path');
const defaults = require('./defaults');
const utils = require('./utils');

const getFilesByMask = (pattern, options) => fg(pattern, options);

const expandPath = (basePath, options) => {
    basePath = options.root ? path.resolve(options.root, basePath) : basePath;

    return utils.isFile(basePath)
        .then((isFile) => isFile ? [basePath] : utils.getFilePaths(basePath))
        .then((paths) => paths.filter((path) => utils.matchesFormats(path, options.formats)));
};

const processPaths = (paths, cb) => {
    return Promise.map(paths, cb)
        .then(_.flatten)
        .then(_.uniq);
};

exports.expandPaths = (paths, expandOpts, globOpts) => {
    expandOpts = defaults('expandOpts', expandOpts);
    globOpts = _(defaults('globOpts', globOpts)).omitBy(_.isUndefined).value();

    // fast-glob requires only forward-slashes (https://github.com/mrmlnc/fast-glob#pattern-syntax)
    if (globOpts.ignore) {
        globOpts.ignore = globOpts.ignore.map(p => normalize(p));
    }
    const normalizedPaths = [].concat(paths).map(p => normalize(p));

    return processPaths(normalizedPaths, (path) => getFilesByMask(path, globOpts))
        .then((matchedPaths) => processPaths(matchedPaths, (path) => expandPath(path, expandOpts)));
};

exports.isMask = (pattern) => {
    if (!pattern) {
        return false;
    }

    const {set} = new Minimatch(pattern);

    if (set.length > 1) {
        return true;
    }

    return set[0].some((v) => typeof v !== 'string');
};
