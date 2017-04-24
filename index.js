const os = require('os');
const path = require('path');
const _ = require('underscore');
var RAL = require('yog-ral').RAL;
var ralP = require('yog-ral').RALPromise;

function now() {
    return (new Date()).valueOf();
};

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
                return Promise.reject(new Error('need status'));
            }
            if (jsonObject.status !== 0) {
                let errMsg = jsonObject.msg || '';
                console.error('status:%d not zero msg:%s', jsonObject.status, errMsg);
                console.log('[rpc]using:%d', now() - start);
                return Promise.reject(new Error(errMsg));
            }
            console.log('[rpc]using:%d', now() - start);
            return jsonObject.data;
        }).catch(function(error) {
            console.error('[ral]call failed:error:%s', error.stack);
            if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT') {
                console.error('[rpc] timeout opt:%j', options);
                return Promise.reject(new Error('timeout'));
            }
            console.log('[rpc]using:%d', now() - start);
            return Promise.reject(error);
        });
    }
};
