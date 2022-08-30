'use strict';

class getUtil {

    static isString(data) {
        return (typeof data === 'string');
    }

    static isValidString(data) {
        return (typeof data === 'string' && data.length > 0);
    }

    static isArray(data) {
        return (Array.isArray(data));
    }

    static isArrayWithItems(data) {
        return (Array.isArray(data) && data.length > 0);
    }

    static isObject(data) {
        return (typeof data === 'object');
    }

    static isObjectWithKeys(data) {
        return (getUtil.isObject(data) && !!data && Object.keys(data).length > 0);
    }

    static isNumber(data) {
        return (typeof data === 'number');
    }

    static isBoolean(data) {
        return (typeof data === 'boolean');
    }

    static isFunction(data) {
        return (typeof data === 'function');
    }


    static hasCallbackFn(callbackFn) {
        return (callbackFn && getUtil.isFunction(callbackFn));
    }
}

module.exports = getUtil;
