/*
 * Simple Utilities for Testing
 *
 * (c) 2016 VISTA Data Project
 */

'use strict';

var util = require('util');
var _ = require('lodash');

var fileman = require('mvdm/fileman');
var fmql = require('mvdm/fmql');

/*
 * Template pointers take the forms: 
 * - {"id": "$ID-{FMID}", "label": "..."} where FMID is the fileman file's numeric id
 * and label holds the label with which to lookup an entity in that file.
 * - {"id": "$USERID"} where userId is passed into this template filler.
 * 
 * Exs/
 * - $ID- 
 *   - {"id": "$ID-2", "label": "CARTER,DAVID JNR"} --> {"id": "2-1", "label": "CARTER,DAVID JNR"}
 *   - {"id": "$ID-50_6", "label": "PENICILLIN"} --> {"id": "50_6-16", "label": "PENICILLIN"}
 * - $USERID/$FACILITYID
 *   - {"id": "$USERID"} and userId = 200-55 --> {"id": "200-55", "label": "ALEXANDER,ROBERT"}
 */
function fillTemplateValues(fm, info, userId, facilityId, now) {

    if (now === undefined)
        now = new Date().toISOString().substr(0,19);

    function getLabelForId(fm, id) { // more expansive than dmUtils version and like it really wants a native fmql method

        var reply = fmql.query(fm, 'DESCRIBE ' + id + ' CSTOP 0');
        if (_.has(reply, "error")) {
            throw new Error('There was a problem describing id ' + id + ': ' + reply.error);
        }
        return reply.results[0].uri.label.split("/")[1];
    }

    function isPointer(propertyValue) {
        if (!_.has(propertyValue, "id"))
            return false;
        if (_.without(_.keys(propertyValue), "id", "label", "sameAs").length !== 0)
            return false;
        return true;
    }

    function mapTemplatePointer(fm, propertyValue, userId, facilityId) {

        if (!/^\$/.test(propertyValue.id))
            return;

        // $USERID and $FACILITYID
        if (propertyValue.id === "$USERID") {
            if (userId === undefined)
                throw new Error(util.format("Must specify value for <userId> as $USERID set for property %s", propertyId));
            if (_.has(propertyValue, "label"))
                throw new Error(util.format("Not allowed USERID if label specified %s", propertyId));
            propertyValue.id = userId;
            propertyValue.label = getLabelForId(fm, userId);
            return;
        }
        if (propertyValue.id === "$FACILITYID") {
            if (facilityId === undefined)
                throw new Error(util.format("Must specify value for <facilityId> as $FACILITYID set for property %s", propertyId));
            if (_.has(propertyValue, "label"))
                throw new Error(util.format("Not allowed FACILITYID if label specified %s", propertyId));
            propertyValue.id = facilityId;
            propertyValue.label = getLabelForId(fm, facilityId);
            return;
        }

        if (!/^\$ID\-/.test(propertyValue.id))
            throw new Error(util.format("Invalid $ setting %s for %s", propertyValue.id, propertyId));
        var fid = propertyValue.id.split("-")[1];

        // VUID option - if VUID exists then will be at 99.99
        if (_.has(propertyValue, "sameAs")) {
            if (!/vuid\:/.test(propertyValue.sameAs))
                throw new Error(util.format("sameAs for template must be a vuid but isn't %s", propertyId));
            propertyValue.id = fileman.lookupByVUID(fm, fid, propertyValue.sameAs.split(":")[1]).id;
            propertyValue.label = getLabelForId(fm, propertyValue.id);
            return;
        }

        // Label option
        if (!_.has(propertyValue, "label"))
            throw new Error(util.format("$ID'ed properties must specify a label but %s doesn't", propertyId));

        propertyValue.id = fileman.lookupBy01(fm, fid, propertyValue.label).id;

    }

    function mapTemplateDateTime(propertyValue, now) {
        if (!/^\$NOW$/.test(propertyValue.value))
            return;
        if (propertyValue.type === "xsd:date") {
            propertyValue.value = now.split("T")[0];
        }
        else if (propertyValue.type === "xsd:dateTime") {
            propertyValue.value = now + "Z";
        } else {
            throw new Error(util.format("type not one of date types for %j", propertyValue));
        }
    }

    Object.keys(info).forEach(function(propertyId) {

        var propertyValue = info[propertyId];

        // List of Objects or Pointers
        if (_.isArray(propertyValue)) {
            propertyValue.forEach(function(npv) {
                if (isPointer(npv)) {
                    mapTemplatePointer(fm, npv, userId, facilityId);
                    return;
                }
                fillTemplateValues(fm, npv, userId, facilityId, now)
            });
            return;
        }

        // Not mapping simple literals
        if (!_.isObject(propertyValue))
            return;

        //date object
        if (_.has(propertyValue, "value") && _.has(propertyValue, "type") && /xsd:/.test(propertyValue.type)) {
            mapTemplateDateTime(propertyValue, now);
            return;
        }

        if (isPointer(propertyValue)) {
            mapTemplatePointer(fm, propertyValue, userId, facilityId);
            return;
        }

        // Object - force without an id
        if (_.has(propertyValue, "id"))
            throw new Error(util.format("Template object has an id - not expected in %j", propertyValue));

        fillTemplateValues(fm, propertyValue, userId, facilityId, now);

    });

    return info;
}

/*
 * Portable lookup for userId and facilityId
 *
 * User Name Ex: "ALEXANDER,ROBERT"
 * Facility Name Ex: "VISTA HEALTH CARE"
 *
 * Notes: 
 * - DUZ is parseInt(userId.split("-")[1])
 * - vdmUtils.js has "userFromId" etc which 
 * goes the other way. Will replace all of these once User and Facility
 * become first class MVDM objects.
 * - could nix facilityByName and just get from
 * user using 'DESCRIBE 200_02 IN 200-...
 */
function lookupUserIdByName(db, name) {
    return fileman.lookupBy01(db, "200", name).id;
}

function lookupFacilityIdByName(db, name) {
    return fileman.lookupBy01(db, "4", name).id;
}

function lookupPatientIdByName(db, name) {
    return fileman.lookupBy01(db, "2", name).id;
}

module.exports.fillTemplateValues = fillTemplateValues;
module.exports.lookupUserIdByName = lookupUserIdByName;
module.exports.lookupFacilityIdByName = lookupFacilityIdByName;
module.exports.lookupPatientIdByName = lookupPatientIdByName;
