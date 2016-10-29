var _ = require('lodash');

var DEFAULT_CACHE_PARAMETERS = {
    path: '/opt/cachesys/cache/mgr',
    username: '_SYSTEM',
    password: 'SYS',
    namespace: 'VISTA'
};

var CONNECTION_CREATOR_MAP = {
    CACHE: openCacheConnection,
    GTM: openGTMConnection,
    INVALID: openInvalidConnection
};

var createError = function(result) {
    return {
        error: true,
        message: result.ErrorMessage || 'An error has occurred',
        code: result.ErrorCode || -1
    };
};

function openCacheConnection(options) {
    var cache = require('cache');
    var db = new cache.Cache();

    var cacheOptions = _.extend({}, DEFAULT_CACHE_PARAMETERS, options);
    var result = db.open(cacheOptions);

    return (result.ok ? db : createError(result));
}

function openGTMConnection(options) {
    var nodem = require('nodem');
    var db = new nodem.Gtm();

    var result = db.open();

    return (result.ok ? db : createError(result));
}

function openInvalidConnection(options) {
    return createError ({ErrorMessage: 'Invalid database type: ' + options.type});
}

var openConnection = function(options) {
    var connectionType = (options.type || 'CACHE').toUpperCase();
    var createConnection = CONNECTION_CREATOR_MAP[connectionType] || CONNECTION_CREATOR_MAP.INVALID;
    return createConnection(options);
};

module.exports = {
    openConnection: openConnection
};