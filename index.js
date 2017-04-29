/*jshint esversion: 6 */
const os = require('os');
const path = require('path');
const _ = require('underscore');
var RAL = require('yog-ral').RAL;
var ralP = require('yog-ral').RALPromise;

function StatusError(status, message) {
    let self = this;
    self.name = 'MyError';
    self.message = message || 'Default Message';
    self.stack = (new Error()).stack;
}
StatusError.prototype = Object.create(Error.prototype);
StatusError.prototype.constructor = StatusError;



function now() {
    return (new Date()).valueOf();
}

module.exports = {
    request: function(serviceName, opt) {
        let start = now();
        if (_.has(opt, 'headers') && !(_.isObject(opt.headers) && !_.isArray(opt.headers))) {
            delete opt.headers;
        }
        if (_.has(opt, 'query') && !(_.isObject(opt.query) && !_.isArray(opt.query))) {
            delete opt.query;
        }
        return ralP(serviceName, opt).then(function(data) {
            console.log('ral response:', data);
            if (data && _.isString(data)) {
                try {
                    data = JSON.parse(data);
                } catch (error) {
                    console.error('parse json failed:str[%s] error:%s', error.stack);
                }
            }
            var jsonObject = data;
            if (!_.has(jsonObject, 'status')) {
                console.error('need status');
                console.log('[rpc]using:%d', now() - start);
                return Promise.reject(new StatusError(-1, 'need status'));
            }
            if (jsonObject.status !== 0) {
                let errMsg = jsonObject.msg || '';
                console.error('status:%d not zero msg:%s', jsonObject.status, errMsg);
                console.log('[rpc]using:%d', now() - start);
                return Promise.reject(new StatusError(jsonObject.status, errMsg));
            }
            console.log('[rpc]using:%d', now() - start);
            return jsonObject.data;
        }).catch(function(error) {
            console.error('[ral]call failed:error:%s', error.stack);
            if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT') {
                console.error('[rpc] timeout opt:%j', options);
                return Promise.reject(new StatusError(-3, 'timeout'));
            }
            console.log('[rpc]using:%d', now() - start);
            return Promise.reject(error);
        });
    }
};
