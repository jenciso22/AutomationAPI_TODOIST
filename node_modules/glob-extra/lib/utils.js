'use strict';

const _ = require('lodash');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

exports.matchesFormats = (filePath, formats) => {
    return _.isEmpty(formats) || _.includes(formats, path.extname(filePath));
};

exports.isFile = (path) => fs.statAsync(path).then((stat) => stat.isFile());

exports.getFilePaths = (basePath) => {
    function readDirFiles(basePath) {
        return fs.readdirAsync(basePath)
            .then((paths) => {
                return Promise.map(paths, (p) => exports.getFilePaths(path.join(basePath, p)))
                    .then(_.flatten);
            });
    }

    return exports.isFile(basePath)
        .then((isFile) => isFile ? [basePath] : readDirFiles(basePath))
        .catch((err) => {
            throw new Error(`Error while reading path "${basePath}"\n${err.stack || err.message || err}`);
        });
};
