# glob-extra

Wrapper for utility [fast-glob](https://github.com/mrmlnc/fast-glob) with promises support which provides expanding of masks, dirs and files to absolute file paths.

[![NPM version](https://img.shields.io/npm/v/glob-extra.svg?style=flat)](https://www.npmjs.org/package/glob-extra)
[![Build Status](https://travis-ci.org/gemini-testing/glob-extra.svg?branch=master)](https://travis-ci.org/gemini-testing/glob-extra)
[![Coverage Status](https://img.shields.io/coveralls/gemini-testing/glob-extra.svg?style=flat)](https://coveralls.io/r/gemini-testing/glob-extra?branch=master)
[![Dependency Status](https://img.shields.io/david/gemini-testing/glob-extra.svg?style=flat)](https://david-dm.org/gemini-testing/glob-extra)

## Installation

```bash
$ npm install glob-extra
```

## Usage

```js
const globExtra = require('glob-extra');
const paths = ['some/path', 'other/path/*.js', 'other/deep/path/**/*.js']

// options are optional
globExtra.expandPaths(paths, options)
    .then((files) => {
        // ['/absolute/some/path/file1.js',
        // '/absolute/other/path/file2.js',
        // '/absolute/other/deep/path/dir/file3.js']
    })
    .done();
```

### Options

* **formats** *{String[]}* – files formats to expand; it will expand all files by default. For example:

```js
globExtra.expandPaths(paths, {formats: ['.txt', '.js']})
    .then((files) => {
        // will expand only js and txt files
    })
    .done();
```
