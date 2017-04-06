#!/usr/bin/env node

'use strict';

/* this is a util to extract all the attributes (minus duplicates) from a given json,
   it is a convenient tool to check any missing or new attributes that we're not aware of
*/

const _ = require('lodash');
const fs = require('fs');

// read JSON object from data.json file
const usersRecord = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

// This util is a quick way to get all the attribute name for a given JSON object
const nextLevel = function nextLevel(obj, results, level) {
    let depth = level;
    if (_.isEmpty(obj)) return;
    if (_.isObject(obj)) {
        _.each(Object.keys(obj), (field) => {
            if (_.isNaN(parseInt(field, 10))) {
                results.push(`(${level}) ${field}`);
            }
        });
        depth += (Object.keys(obj).length > 0) ? 1 : 0;
        _.each(obj, (element) => {
            nextLevel(element, results, depth);
        });
    }
};

const objectAttributes = [];
_.each(usersRecord, (element) => {
    nextLevel(element, objectAttributes, 0);
});

console.log(_.uniq(objectAttributes, 'id').sort());
