/**
 * @file 文件介绍
 * @author imcooder@gmail.com
 */
/* eslint-disable fecs-camelcase */
/* jshint esversion:8 */
/* jshint node:true */

const _ = require('underscore');
function now() {
    return (new Date()).valueOf();
}

module.exports = {
    ral: null,
    RALPromise: null,
    initRal: function(ral) {
        this.ral = ral;
        this.RALPromise = ral.RALPromise;
    },
    request: function(serviceName, opt) {
        let start = now();
        if (!this.RALPromise) {
            return Promise.reject(new Error('RALPromise is null'));
        }
        if (_.has(opt, 'headers') && !(_.isObject(opt.headers) && !_.isArray(opt.headers))) {
            delete opt.headers;
        }
        if (_.has(opt, 'query') && !(_.isObject(opt.query) && !_.isArray(opt.query))) {
            delete opt.query;
        }
        return this.RALPromise(serviceName, opt).then(data => {
            if (data && _.isString(data)) {
                try {
                    data = JSON.parse(data);
                } catch (error) {
                    console.error('parse json failed:str[%s] error:%s', error.stack);
                }
            }
            var jsonObject = data;
            if (!_.has(jsonObject, 'status')) {
                // console.error('need status');
                return Promise.reject(new Error('need status'));
            }
            if (jsonObject.status !== 0) {
                let errMsg = jsonObject.msg || '';
                // console.error('status:%d not zero msg:%s', jsonObject.status, errMsg);
                // console.log('[rpc]using:%d', now() - start);
                return Promise.reject(new Error(errMsg));
            }
            // console.log('[rpc]using:%d', now() - start);
            return jsonObject.data;
        }).catch(error => {
            if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT') {
                return Promise.reject(new Error('timeout'));
            }
            return Promise.reject(error);
        });
    },
    requestJson: function(serviceName, opt) {
        let start = now();
        if (!this.RALPromise) {
            return Promise.reject(new Error('RALPromise is null'));
        }
        if (_.has(opt, 'headers') && !(_.isObject(opt.headers) && !_.isArray(opt.headers))) {
            delete opt.headers;
        }
        if (_.has(opt, 'query') && !(_.isObject(opt.query) && !_.isArray(opt.query))) {
            delete opt.query;
        }
        return this.RALPromise(serviceName, opt).then(data => {
            // console.log('ral response:', data);
            if (data && _.isString(data)) {
                try {
                    data = JSON.parse(data);
                } catch (error) {
                    return Promise.reject(new Error('bad json'));
                }
            }
            return data;
        }).catch(error => {
            // console.error('[ral]call failed:error:%s', error.stack);
            if (error.code === 'ETIMEDOUT' || error.code === 'ESOCKETTIMEDOUT') {
                return Promise.reject(new Error('timeout'));
            }
            return Promise.reject(error);
        });
    }
};
