/*
 * Copyright (c) 2011-2013, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */
/*jshint node:true */
'use strict';

var resolve = require('path').resolve,
    load = require('../').load,
    log = require('../lib/log');


function usage(description) {
    log.info('Usage: mojito <command> [options]');
    log.info(description);
}

function help(meta) {
    var bundled = meta.cli.commands,
        every = meta.mojito ? bundled.concat(meta.mojito.commands) : bundled;

    usage(meta.cli.description);
    log.info('Available commands: %s', every.join(', '));

    if (!meta.mojito) {
        log.info(
            'Additional commands are available from within an application ' +
            'directory that has\nmojito installed.'
        );
    }
}

function main(args, opts, meta, cb) {
    var cmd = args.shift() || '',
        mod;

    if (!cmd) {
        help(meta);
        cb();

    } else {
        mod = load(cmd, meta);
        if (mod && mod.usage) {
            cb(null, mod.usage);

        } else {
            help(meta);
            cb('No help available for command ' + cmd);
        }
    }
}

module.exports = main;
